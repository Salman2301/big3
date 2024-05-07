<script lang="ts">
	import { checkUserComplete } from "$lib/auth";

  export let team: "drizzy" | "kdot" = "drizzy";
  export let voted: boolean = false;
</script>

<div
  class="mini-card-container"
  class:voted={voted}
>
  <img src="/images/{team}.png" alt="profile {team}">
  <button style="background-color: var(--color-{team})" on:click={checkUserComplete}>
    <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.7962 8.15674H1.17508C0.13016 8.15674 -0.392301 6.89209 0.345004 6.15479L6.15555 0.344238C6.61454 -0.114746 7.35672 -0.114746 7.81082 0.344238L13.6214 6.15479C14.3636 6.89209 13.8411 8.15674 12.7962 8.15674Z" fill="white"/>
    </svg>
    <span>VOTE</span>
  </button>
</div>


<style lang="postcss">
  .mini-card-container {
    display: flex;
    flex-direction: column;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    overflow: hidden;
    width: 130px;
  }
  .container.voted {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  img {
    width: 100px;
    min-width: 100px;
    height: 100px;
  }
  button {
    width: 100px;
    min-width: 100px;
    height: 30px;
    color: white;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;

    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0px 10px;
  }
  span {
    font-size: 14px;
  }
</style>