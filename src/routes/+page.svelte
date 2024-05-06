<script lang="ts">
	import VoteSlider from '$lib/components/VoteSlider.svelte';
	import MiniCard from '$lib/components/card/MiniCard.svelte';
</script>

<div class="container">
	<div class="vote-content">
		<div class="vote-major-content">
			<MiniCard team="drizzy" />
			<VoteSlider />
			<MiniCard team="kdot" />
		</div>
		<div class="detail-vote">
			<VoteSlider size="sm" label="Impact" />
			<VoteSlider size="sm" label="Creative" />
			<VoteSlider size="sm" label="Technicality" />
			<VoteSlider size="sm" label="Rebuttal" />
			<VoteSlider size="sm" label="Strategy" />
		</div>
	</div>

	<div class="sidebar-content"></div>
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
</style>
