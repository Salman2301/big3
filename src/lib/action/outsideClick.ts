import type { ActionReturn } from "svelte/action";

interface Attributes {
	"on:outsideclick"?: (e: CustomEvent<void>) => void;
}

export function clickOutside(node: HTMLDivElement | HTMLDialogElement): ActionReturn<{}, Attributes> {
	
	window.addEventListener('click', handleClick);
	
	function handleClick(e: MouseEvent) {
    const target = e.target as Node | null;
  
    if (!node.contains(target)) {
			node.dispatchEvent(new CustomEvent('outsideclick'));
		}
	}

	return {
		destroy() {
			// the node has been removed from the DOM
			window.removeEventListener('click', handleClick)
		}
	};
} 