<script lang="ts">
	import Modal from "./Modal.svelte";
	import VoteButton from "./VoteButton.svelte";

  let votes = {
    impact: null,
    creativity: null,
    technicality: null,
    rebuttal: null,
    delivery: null
  }
  
  $: checkVotes(votes);

  let allSelected = true;
  let maxVote: "drizzy" | "kdot" = "drizzy";

  function checkVotes(votes: Record<string, string|null>) {
    allSelected = !Object.values(votes).some(e=>e===null);
    if( allSelected ) {
      maxVote = Object.values(votes).filter(e=>e==="drizzy").length > 2 ? "drizzy" : "kdot"
    }
  }
</script>

<Modal height={500}>
	<h1 slot="header">Vote</h1>
	<div class="content">
    <div class="image">
      <img
        src="/images/drizzy.png"
        alt="team drizzy drake"
        class="image-drizzy"
      >
      <img
        src="/images/kdot.png"
        alt="team kendrick lamar"
        class="image-kdot"
      >
    </div>
    <div class="vote-btn">
      <VoteButton 
        label="Impact"
        bind:vote={votes.impact}
      />
      <VoteButton 
        label="Creativity"
        bind:vote={votes.creativity}
      />
      <VoteButton 
        label="Technicality"
        bind:vote={votes.technicality}
      />
      <VoteButton 
        label="Rebuttal"
        bind:vote={votes.rebuttal}
      />
      <VoteButton 
        label="Delivery"
        bind:vote={votes.delivery}
        bottomRound={true}
      />
    </div>

    {#if allSelected}
      <button 
        class:kdot="{maxVote==="kdot"}"
      >
        Submit
      </button>
    {/if}
	</div>
</Modal>


<style lang="postcss">
  h1 {
    color: black;
		font-size: 28px;
		text-align: center;
		width: 100%;
  }
  img {
    width: 100px;
    aspect-ratio: 1 / 1;
  }

  .content {
    display: flex;
    width: 100%;
    flex-direction: column;
    margin-top: 40px;
    align-items: center;
  }
  .image {
    display: flex;
    justify-content: center;
  }

  .vote-btn {
    margin-left: -200px;
  }

  button {
    @apply bg-drizzy;
    width: 200px;
    height: 40px;
    border-radius: 4px;
    margin-top: 20px;
  }
  button.kdot {
    @apply bg-kdot;
  }

  .image-drizzy {
    border-top-left-radius: 4px;
  }
  .image-kdot {
    border-top-right-radius: 4px;
  }
</style>