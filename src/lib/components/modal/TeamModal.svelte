<script lang="ts">
	import Modal from "./Modal.svelte";

 
</script>


<Modal>
	<h1 slot="header">Select a team</h1>
	<div class="content">
    <button>
      <img src="/images/drizzy.png" alt="team drizzy drake">
      <div class="footer">
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.7962 8.15674H1.17508C0.13016 8.15674 -0.392301 6.89209 0.345004 6.15479L6.15555 0.344238C6.61454 -0.114746 7.35672 -0.114746 7.81082 0.344238L13.6214 6.15479C14.3636 6.89209 13.8411 8.15674 12.7962 8.15674Z" fill="white"/>
          </svg>
          <span>VOTE</span>
      </div>
    </button>
    
    <button>
      <img src="/images/kdot.png" alt="team kendrick lamar">
      <div class="footer kdot">
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.7962 8.15674H1.17508C0.13016 8.15674 -0.392301 6.89209 0.345004 6.15479L6.15555 0.344238C6.61454 -0.114746 7.35672 -0.114746 7.81082 0.344238L13.6214 6.15479C14.3636 6.89209 13.8411 8.15674 12.7962 8.15674Z" fill="white"/>
          </svg>
          <span>VOTE</span>
      </div>
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
    width: 200px;
    aspect-ratio: 1 / 1;
  }

  .content {
    display: flex;
    width: 100%;
    justify-content: center;
    gap: 10px;
    margin-top: 40px;
  }

  .footer {
    @apply bg-drizzy;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 40px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .footer.kdot {
    @apply bg-kdot;
  }
</style>