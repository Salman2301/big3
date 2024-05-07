<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import GoogleButton from '../button/GoogleButton.svelte';
	import Modal from './Modal.svelte';

	function handleGoogle() {
		supabase.auth.signInWithOAuth({
			provider: 'google'
		});
	}
</script>

<Modal>
	<h1 slot="header">Login page</h1>
	<div class="content">
		<div class="button-action">
			<GoogleButton on:click={handleGoogle} />
			<p>OR</p>
			<button class="btn-guest">Guest mode</button>
		</div>
	</div>
</Modal>

<style lang="postcss">
	h1 {
		color: black;
		font-size: 28px;
		text-align: center;
		width: 100%;
	}
	button {
		color: black;
	}
	p {
		color: black;
		width: 100%;
		text-align: center;
		font-weight: 100;
		margin: 10px 0px;
	}
	.content {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-top: 40px;
	}

	.button-action {
		width: 240px;
	}

	.btn-guest {
		text-align: center;
		border: 1px solid #ccc;
		width: 100%;
		height: 40px;
		font-size: 12px;
		background-color: black;
		color: white;
		border-radius: 4px;
	}
	.btn-guest:hover {
		@apply bg-drizzy;
	}
</style>
