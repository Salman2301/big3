<script lang="ts">
	import ChatText from './ChatText.svelte';
	import Loader from "$lib/components/icon/Loader.svelte";

	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient';
	import { getTeam, getUserData, logout } from '$lib/auth';
	import { clickOutside } from '$lib/action/outsideClick';
	import { currentUser } from '$lib/auth/auth.store';
	
	import type { Tables } from '$lib/database.types';

	export let showPopup: boolean = false;

	export let isLoading: boolean = false;
	let message: string = "";
	let chats: Tables<"user_chat">[] = [];
	let team: string = "drizzy";

	let chatMessageInstance: HTMLDivElement;

	onMount(async ()=>{
		const { data, error } = await supabase.from("user_chat").select();
		chats = data as Tables<"user_chat">[];
		team = await getTeam();
		scrollToBottom();
	});

	function handleKeydown(event: KeyboardEvent) {
		if( event.code === "Enter" && event.shiftKey ) {
			event.preventDefault();
			sendMessage();
		}
	}

	async function sendMessage() {
		isLoading = true;
		if( message === "" ) return;
		const userData = await getUserData();
		await supabase.from("user_chat").insert({
			chat: message,
			team: userData?.team as string,
			username: userData?.username,
		}).limit(50);

		message = "";
		isLoading = false;
	}

	const userChat = supabase.channel('custom-insert-channel')
		.on(
			'postgres_changes',
			{ event: 'INSERT', schema: 'public', table: 'user_chat' },
			(payload) => {
				chats.push(payload.new as Tables<"user_chat">);
				chats = chats;
				scrollToBottom();
			}
		)
		.subscribe();

		function scrollToBottom() {
			
			if(chatMessageInstance) {
				chatMessageInstance.scrollTo(0, chatMessageInstance.scrollHeight);
			}
		}

</script>

<div class="sidebar-content">
	<div class="header" use:clickOutside on:outsideclick={() => (showPopup = false)}>
		<h1>Chat</h1>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->

		{#await $currentUser}
			<Loader />
		{:then user}
			{#if user}
				<svg
					width="25"
					height="25"
					viewBox="0 0 25 25"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					on:click={() => (showPopup = true)}
					class="cursor-pointer"
				>
					<path
						d="M12.1094 0C5.41992 0 0 5.41992 0 12.1094C0 18.7988 5.41992 24.2188 12.1094 24.2188C18.7988 24.2188 24.2188 18.7988 24.2188 12.1094C24.2188 5.41992 18.7988 0 12.1094 0ZM12.1094 4.6875C14.4824 4.6875 16.4062 6.61133 16.4062 8.98438C16.4062 11.3574 14.4824 13.2812 12.1094 13.2812C9.73633 13.2812 7.8125 11.3574 7.8125 8.98438C7.8125 6.61133 9.73633 4.6875 12.1094 4.6875ZM12.1094 21.4844C9.24316 21.4844 6.6748 20.1855 4.95605 18.1543C5.87402 16.4258 7.6709 15.2344 9.76562 15.2344C9.88281 15.2344 10 15.2539 10.1123 15.2881C10.7471 15.4932 11.4111 15.625 12.1094 15.625C12.8076 15.625 13.4766 15.4932 14.1064 15.2881C14.2188 15.2539 14.3359 15.2344 14.4531 15.2344C16.5479 15.2344 18.3447 16.4258 19.2627 18.1543C17.5439 20.1855 14.9756 21.4844 12.1094 21.4844Z"
						fill="#474747"
					/>
				</svg>
				{:else}
					<div style="width: 25px;height: 25px"></div>
			{/if}
		{/await}

		{#if showPopup}
			<div class="popup-container">
				<button on:click={()=>logout()}>Logout</button>
			</div>
		{/if}
	</div>
	<div class="chat-content">
		<div class="chat-message" bind:this={chatMessageInstance}>
			{#each chats as chat}
				<ChatText data={chat} />
			{:else}
				<div class="flex items-center h-full w-full justify-center text-white/40">
					No chat messages!
				</div>
			{/each}
		</div>

		<div class="chat-input">
			<!-- <textarea on:keydown={handleKeydown} bind:value={message}></textarea> -->
			<!-- svelte-ignore a11y_interactive_supports_focus -->
			<span
				class="textarea"
				role="textbox"
				contenteditable 
				bind:textContent={message}
				on:keydown={handleKeydown}
				></span>
			<button
				class="btn-submit"
				style="background:var(--color-{team})"

				on:click={sendMessage}
			
			>
				<span>
					{#if isLoading}
						<Loader />
					{:else}
						<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12.2159 0.274445C12.5322 0.16373 12.8363 0.4678 12.7256 0.784128L8.7833 12.0477C8.66362 12.3896 8.18737 12.4091 8.04023 12.078L5.91248 7.29059C5.87226 7.20009 5.79991 7.12774 5.70941 7.08752L0.921974 4.95977C0.590923 4.81263 0.610354 4.33638 0.95229 4.2167L12.2159 0.274445Z" fill="white"/>
						</svg>
					{/if}
				</span>
				Send
			</button>
		</div>
	</div>
</div>

<style lang="postcss">
	.sidebar-content {
		height: 100vh;
		width: 540px;
		@apply bg-accent;
	}
	.popup-container {
		position: absolute;
		border-radius: 10px;
		border: 1px solid rgb(204, 204, 204, 0.3);
		height: 40px;
		width: 200px;
		top: 40px;
		right: 10px;
		background-color: #4a4949;
		display: flex;
		justify-content: center;
	}
	.header {
		@apply flex justify-between items-center;
		padding: 0px 10px;
		position: relative;
	}
	.sidebar-content h1 {
		@apply text-2xl text-center;
		width: 100%;
		padding: 10px;
	}

	.chat-content {
		@apply flex flex-col;
		@apply justify-between items-center;
		height: calc(100vh - 60px);
	}

	.chat-message {
		width: 100%;
		padding: 0px 10px;
    overflow: auto;
	}

	.chat-input {
		@apply flex items-center flex-col;
		width: 100%;
		padding: 0px 10px;
	}

	.chat-input .textarea {
		width: 100%;
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 6px;
		outline: none;
		padding: 10px;


		display: block;
		width: 100%;
		overflow: hidden;
		resize: both;
		min-height: 40px;
		max-height: 120px;
		line-height: 20px;

	}
	.chat-input button {
		align-self: flex-end;
	}

	.btn-submit {
		@apply flex justify-center gap-3 items-center;
		padding: 4px 10px;
		border-radius: 4px;
		margin-top: 4px;
	}
</style>
