<script lang="ts">
	export let drizzyVotes: number | null = 0;
	export let kdotVotes: number | null = 0;
	export let percent: number = 50;
	export let label: string = 'Label';

	export let size: 'bg' | 'sm' = 'bg';
	$: if( drizzyVotes || kdotVotes || true ) getPercent();
	function getPercent() {
		if( (drizzyVotes === 0 && kdotVotes === 0)||
	!(typeof drizzyVotes === "number" && typeof kdotVotes === "number") ) return 50;
		percent = Math.round((drizzyVotes / (drizzyVotes+kdotVotes)) * 10000) / 100;
	}
</script>

<div class="progress-label">
	<div class="label" class:size-sm={size === 'sm'}>
		{label}
	</div>

	<div class="progress-container" class:size-sm={size === 'sm'}>
		<div class="progress progress-drizzy" style="width: {percent}%">
			<span class="vote-count">{drizzyVotes} ({percent}%)<span class="vote">votes</span></span>
		</div>
		<div class="progress progress-kdot" style="width: {100 - percent}%">
			<span class="vote-count">{kdotVotes} ({100-percent}%)<span class="vote">votes</span></span>
		</div>
	</div>
</div>

<style lang="postcss">
	.label {
		width: 100%;
		display: flex;
		justify-content: center;
		color: black;
	}
	.label.size-sm {
		font-size: 12px;
	}
	.progress-label {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.progress-container {
		display: flex;
		justify-content: space-between;
		width: 100px;
		max-width: 650px;
		min-width: 400px;
		width: 100%;
		height: 55px;
		color: white;
		border-radius: 60px;
		overflow: hidden;
	}

	.progress {
		width: 100%;
		height: 100%;
		background-color: var(--color-drizzy);
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;

		transition: width 1s ease-in-out;
	}

	.progress-container.size-sm {
		height: 25px;
	}

	.vote-count {
		z-index: 100;
		width: 220px;
		position: absolute;
		text-align: center;

		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;

		place-content: flex-start;
		padding: 10px;
	}

	.progress-kdot .vote-count {
		place-content: flex-end;
	}

	/* .progress-drizzy {
    border-top-left-radius: 60px;
    border-bottom-left-radius: 60px;
  } */

	.progress-kdot {
		background-color: var(--color-kdot);
		justify-content: flex-end;
		width: 100%;

		text-align: left;

		/* border-top-right-radius: 60px;
    border-bottom-right-radius: 60px; */
	}
	.vote {
		color: #eee;
		font-weight: semibold;
	}
</style>
