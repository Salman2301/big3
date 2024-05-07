<script lang="ts">
	import { currentUserState, getUserMe } from '$lib/auth/index.js';
	import VoteSlider from '$lib/components/VoteSlider.svelte';
	import MiniCard from '$lib/components/card/MiniCard.svelte';
	import Chat from '$lib/components/chat/Chat.svelte';
	import VoteModal from '$lib/components/modal/VoteModal.svelte';
	import LoginModal from '$lib/components/modal/LoginModal.svelte';
	import TeamModal from '$lib/components/modal/TeamModal.svelte';
	import { currentModal } from '$lib/components/modal/modal.store.js';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabaseClient.js';
	import UsernameModal from '$lib/components/modal/UsernameModal.svelte';
	import type { Tables } from '$lib/database.types.js';

	export let data;
	let votes: Tables<"votes"> = getDummyVotes();
	onMount(async ()=>{
		setVoteFromDb();
		const state = await currentUserState();

		if( !(state === "NOT_REGISTER" || state === "COMPLETED" ) ) {
			if( state === "USERNAME" ) $currentModal = "username"
			else if( state === "TEAM_SELECTION" ) $currentModal = "team"
			else if( state === "VOTE" ) $currentModal = "vote"
		}
	});

	async function setVoteFromDb() {
		const { data } = await supabase.from('votes').select();
		if (Array.isArray(data) && data.length >= 1) votes = data[0];
	}


	supabase.channel('custom-update-channel')
		.on(
			'postgres_changes',
			{ event: 'UPDATE', schema: 'public', table: 'votes' },
			(payload) => {
				setVoteFromDb()
			}
		)
		.subscribe();

	function getDummyVotes() {
		return {
			total: 0,
			totalKdot: 0,
			totalDrizzy: 0,

			totalImpactDrizzy: 0,
			totalCreativityDrizzy: 0,
			totalDeliveryDrizzy: 0,
			totalTechnicalityDrizzy: 0,
			totalRebuttalDrizzy: 0,
			totalStrategyDrizzy: 0,

			totalCreativityKdot: 0,
			totalDeliveryKdot: 0,
			totalImpactKdot: 0,
			totalRebuttalKdot: 0,
			totalStrategyKdot: 0,
			totalTechnicalityKdot: 0,

			id: 1,
			created_at: ""
		};
	}
</script>

{#if $currentModal === "vote"}
	<VoteModal />
{:else if $currentModal === "login"}
	<LoginModal />
	{:else if $currentModal === "username"}
		<UsernameModal />
{:else if $currentModal === "team"}
	<TeamModal />
{/if}

<div class="container">
	<div class="vote-content">
		<div class="vote-major-content">
			<MiniCard team="drizzy" />
			<VoteSlider
				label="{votes.total} votes"
				drizzyVotes={votes.totalDrizzy}
				kdotVotes={votes.totalKdot}
			/>
			<MiniCard team="kdot" />
		</div>
		<div class="detail-vote">
			<VoteSlider
				size="sm"
				label="Impact"
				drizzyVotes={votes.totalImpactDrizzy}
				kdotVotes={votes.totalImpactKdot}
			/>
			<VoteSlider
				size="sm"
				label="Creative"
				drizzyVotes={votes.totalCreativityDrizzy}
				kdotVotes={votes.totalCreativityKdot}
			/>
			<VoteSlider
				size="sm"
				label="Technicality"
				drizzyVotes={votes.totalTechnicalityDrizzy}
				kdotVotes={votes.totalTechnicalityKdot}
			/>
			<VoteSlider
				size="sm"
				label="Rebuttal"
				drizzyVotes={votes.totalRebuttalDrizzy}
				kdotVotes={votes.totalRebuttalKdot}
			/>
			<VoteSlider
				size="sm"
				label="Delivery"
				drizzyVotes={votes.totalDeliveryDrizzy}
				kdotVotes={votes.totalDeliveryKdot}
			/>
			<VoteSlider
				size="sm"
				label="Strategy"
				drizzyVotes={votes.totalStrategyDrizzy}
				kdotVotes={votes.totalStrategyKdot}
			/>
		</div>
	</div>
	<Chat />
</div>

<style lang="postcss">
	.container {
		display: flex;
		flex-direction: row;
		width: 100%;
		left: 0;
		height: 100vh;
		overflow: hidden;
		position: absolute;
		max-width: none;
		justify-content: space-between;
	}

	.vote-major-content {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 140px;
		align-items: center;
		padding: 10px;
	}

	.vote-content {
		width: 100%;
		overflow: auto
	}

	.detail-vote {
		@apply flex justify-center flex-col items-center w-full;
		@apply gap-8;
	}

</style>
