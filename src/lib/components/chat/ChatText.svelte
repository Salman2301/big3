<script lang="ts">
	import type { Tables } from "$lib/database.types";

  export let data:Tables<"user_chat"> | null = null;
</script>

{#if data }
  <div class="chat-message-content">
    <span
      class="chat-message-content-team"
      class:team-kdot={data.team==="kdot"}
    >
      {data.username}
    </span>
    {data.chat}
  </div>
{/if}


<style lang="postcss">

.chat-message-content-team {
		@apply font-bold text-drizzy;
	}

	.team-kdot {
		@apply text-kdot;
	}
	.chat-message-content-team,
	.chat-message-content {
		font-size: 14px;
	}

</style>