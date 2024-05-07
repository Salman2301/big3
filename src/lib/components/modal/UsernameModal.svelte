<script lang="ts">
	import { onMount } from "svelte";
	import Modal from "./Modal.svelte";
	import { supabase } from "$lib/supabaseClient";
	import { currentModal } from "./modal.store";
	import { getSession, getUserId, refreshSession } from "$lib/auth";

  let username: string = "";

  onMount(async ()=>{
    const { data: { session }} = await supabase.auth.getSession();

    username = session?.user.email?.split("@")[0] || "";
  });

  async function nextState() {
    const { data, error } = await supabase.from("user_data").update({
      state_next: "TEAM_SELECTION",
      username
    }).eq("user_id", await getUserId());
    if(error) {
      console.error(error);
      return;
    }
    refreshSession()
    $currentModal = "team";
  }
  
  function handleKeydown(event: KeyboardEvent) {
    if( event.code === "Enter" ) nextState();
  }
</script>

<Modal>
	<h1 slot="header">Username</h1>
  <div class="content">
    <input bind:value={username} on:keydown={handleKeydown}/>
    <button
      disabled={!username}
      on:click={nextState}
    >Next</button>
  </div>
</Modal>

<style lang="postcss">
	h1 {
		color: black;
		font-size: 28px;
		text-align: center;
		width: 100%;
	}
  .content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  input {
    width: 100%;
    border: 1px solid black;
    padding: 10px 0px;
    border-radius: 40px;
    margin-top: 40px;
    color: black;
    text-align: center;
  }

  button {
    @apply bg-drizzy;
    color: white;

    width: 220px;
    height: 40px;
    border-radius:  4px;

    margin-top: 20px;
  }
  button:hover {
    @apply bg-kdot;
  }
  button:disabled {
    @apply cursor-not-allowed;
    background: #ccc;
  }
</style>