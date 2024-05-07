<script lang="ts">
	import VoteSlider from '$lib/components/VoteSlider.svelte';
	import MiniCard from '$lib/components/card/MiniCard.svelte';
	import VoteModal from '$lib/components/modal/VoteModal.svelte';
	import { onMount } from 'svelte';

	export let data;

	onMount(()=>{
		// console.log(data);
		// console.log(data.votes);
	})
</script>

<VoteModal />

<div class="container">
	<div class="vote-content">
		<div class="vote-major-content">
			<MiniCard team="drizzy" />
			<VoteSlider
				label="{data.votes.drizzy + data.votes.kdot} votes"
				drizzyVotes={data.votes.drizzy}
				kdotVotes={data.votes.kdot}
			/>
			<MiniCard team="kdot" />
		</div>
		<div class="detail-vote">
			<VoteSlider
				size="sm"
				label="Impact"
			/>
			<VoteSlider
				size="sm"
				label="Creative"
			/>
			<VoteSlider
				size="sm"
				label="Technicality"
			/>
			<VoteSlider
				size="sm"
				label="Rebuttal"
			/>
			<VoteSlider
				size="sm"
				label="Strategy"
			/>
		</div>
	</div>

	<div class="sidebar-content">
		<h1>Chat</h1>
		<div class="chat-content">
			<div class="chat-message">
				
				<div class="chat-message-content">
					<span class="chat-message-content-team">
						username
					</span>
					This is the content of the chat
				</div>

				<div class="chat-message-content">
					<span class="chat-message-content-team team-kdot">
						username
					</span>
					This is the content of the chat
				</div>
				

			</div>

			<div class="chat-input">
				<textarea>

				</textarea>
				<button>
					<span></span>
					Send
				</button>
			</div>
		</div>
	</div>

</div>

<style lang="postcss">
	.container {
		display: flex;
		flex-direction: row;
		width: 100%;
		left: 0;
		height: 100vh;
		overflow: hidden;
		position: absolute;
		max-width: none;
		justify-content: space-between;
	}

	.sidebar-content {
		height: 100vh;
		width: 340px;
		@apply bg-accent;
	}

	.vote-major-content {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 140px;
		align-items: center;
		padding: 10px;
	}

	.vote-content {
		width: 100%;
	}

	.detail-vote {
		@apply flex justify-center flex-col items-center w-full;
		@apply gap-8;
	}

	.sidebar-content h1 {
		@apply text-2xl text-center;
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
	}

	.chat-message-content-team {
		@apply  font-bold text-drizzy;
	}

	.team-kdot {
		@apply text-kdot;
	}
	.chat-message-content-team,
	.chat-message-content {
		font-size: 14px;
	}

	.chat-input {
		@apply flex items-center flex-col;
		width: 230px;
	}

	.chat-input textarea {
		width: 100%;
		background-color: rgba( 255, 255, 255, 0.3 );
		border-radius: 6px;
	}
	.chat-input button {
		align-self: flex-end;
	}
</style>
