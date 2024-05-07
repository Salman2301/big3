<script lang="ts">
	export let showModal: boolean = true;
  export let height: number = 400;
	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
  style="height:{height}px"
>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div on:click|stopPropagation>
    <div class="title">
      <slot name="header" />
      <button on:click={() => dialog.close()}>
        <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.75 8.25L8.25 24.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8.25 8.25L24.75 24.75" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
                              
      </button>
    </div>

    
		<slot />
	</div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 48px;
		border: none;
		padding: 0;
    width: 720px;
    min-width: 380px;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
  .title {
    display: flex;
    justify-content: space-between;
  }
	button {
		display: block;
	}
</style>
