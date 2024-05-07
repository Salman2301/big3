<script lang="ts">
	export let label: string = 'Label';
	export let vote: 'drizzy' | 'kdot' | null = null;
  export let bottomRound: boolean = false;
</script>

<div class="container">
	<div class="label">{label}</div>
	<button
    class="drizzy"
    class:active={vote==="drizzy"}
    on:click={()=>(vote="drizzy")}
    class:bottom-round={bottomRound}
  >
		<svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12.7962 8.15674H1.17508C0.13016 8.15674 -0.392301 6.89209 0.345004 6.15479L6.15555 0.344238C6.61454 -0.114746 7.35672 -0.114746 7.81082 0.344238L13.6214 6.15479C14.3636 6.89209 13.8411 8.15674 12.7962 8.15674Z"
				fill="white"
			/>
		</svg>
		<span>VOTE</span>
	</button>
	<button
    class="kdot"
    class:active={vote==="kdot"}
    on:click={()=>(vote="kdot")}
    class:bottom-round={bottomRound}
  >
		<svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12.7962 8.15674H1.17508C0.13016 8.15674 -0.392301 6.89209 0.345004 6.15479L6.15555 0.344238C6.61454 -0.114746 7.35672 -0.114746 7.81082 0.344238L13.6214 6.15479C14.3636 6.89209 13.8411 8.15674 12.7962 8.15674Z"
				fill="white"
			/>
		</svg>
		<span>VOTE</span>
	</button>
</div>

<style lang="postcss">
  .container {
    display: flex;
    align-items: center;

  }
  .label {
    color: black;
    width: 200px;
    text-align: right;
    padding: 4px;
  }
  button {
    background-color: #ccc;
    display: flex;
    gap: 4px;
    align-items: center;
    height: 40px;
    width: 100px;
    justify-content: center;
  }

  .drizzy.active {
    @apply bg-drizzy;
  }
  .kdot.active {
    @apply bg-kdot;
  }

  .bottom-round.drizzy {
    border-bottom-left-radius: 4px;
  }
  .bottom-round.kdot {
    border-bottom-right-radius: 4px;
  }
</style>
