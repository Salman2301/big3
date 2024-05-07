<script lang="ts">
	import Modal from "./Modal.svelte";
	import VoteButton from "./VoteButton.svelte";
  import { getSession, getUserId } from "$lib/auth";
	import { supabase } from "$lib/supabaseClient";
	import { currentModal } from "./modal.store";
	import { onMount } from "svelte";

  let team: string | undefined | null = undefined;
  let votes = {
    impact: null,
    creativity: null,
    technicality: null,
    rebuttal: null,
    delivery: null,
    strategy: null
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

  async function nextState() {
    const { data, error } = await supabase.from("user_vote").insert(votes as any);
    if(error) {
      console.error(error);
      return;
    }

    const { data: dataState, error: errorState } = await supabase.from("user_data").update({
      state_next: "COMPLETED",
    }).eq("user_id", await getUserId());
    if(errorState) {
      console.error(error);
      return;
    }
    $currentModal = null;
  }

  onMount(async ()=>{
    const { data } = await supabase.from("user_data").select();
    team = data?.[0].team;
  });
 
</script>

<Modal height={500}>
	<h1 slot="header">Vote</h1>
	<div class="content">
    <div class="image">
      <img
        src="/images/drizzy.png"
        alt="team drizzy drake"
        class="image-drizzy"
        class:active={team==="drizzy"}
      >
      <img
        src="/images/kdot.png"
        alt="team kendrick lamar"
        class="image-kdot"
        class:active={team==="kdot"}
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
      <VoteButton 
        label="Strategy"
        bind:vote={votes.strategy}
        bottomRound={true}
      />
    </div>

      <button 
        class:kdot="{maxVote==="kdot"}"
        disabled={!allSelected}
        on:click={()=>nextState()}
      >
        Submit
      </button>
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

  img.active {
    border: 2px solid;
    @apply border-drizzy;
  }
  img.active.image-kdot {
    @apply border-kdot;
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

  button:disabled {
    background-color: #ccc;
  }

  .image-drizzy {
    border-top-left-radius: 4px;
  }
  .image-kdot {
    border-top-right-radius: 4px;
  }
</style>