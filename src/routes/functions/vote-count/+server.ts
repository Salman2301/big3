import { env } from '$env/dynamic/private';
import { supabase } from '$lib/server/supabaseClient';
import { fail, json, type RequestEvent } from '@sveltejs/kit';

export async function POST(event) {
	const auth = event.request.headers.get('Authorization');
	if (!auth || !auth.startsWith('Bearer'))
		return json({ message: 'Missing token' }, { status: 403 });
	const token = auth.split(' ')[1];
	if (token !== env.FUNCTION_VOTE_COUNT_KEY)
		return json({ message: 'Invalid token' }, { status: 403 });


	const { data: findVotesId, error } = await supabase.from('votes').select();
	if (error) {
		return json({ message: 'Failed to connect db' }, { status: 500 });
	}
	const lastVote = findVotesId[0] || {};

	let { count: total } = await supabase
		.from('user_vote')
		.select('*', { count: 'estimated', head: true });

	let { count: totalImpactDrizzy } = await supabase
		.from('user_vote')
		.select('*', { count: 'estimated', head: true })
		.eq('impact', 'drizzy');

	let { count: totalCreativityDrizzy } = await supabase
		.from('user_vote')
		.select('*', { count: 'estimated', head: true })
		.eq('creativity', 'drizzy');
	let { count: totalTechnicalityDrizzy } = await supabase
		.from('user_vote')
		.select('*', { count: 'estimated', head: true })
		.eq('technicality', 'drizzy');

	let { count: totalDeliveryDrizzy } = await supabase
		.from('user_vote')
		.select('*', { count: 'estimated', head: true })
		.eq('delivery', 'drizzy');

	let { count: totalRebuttalDrizzy } = await supabase
		.from('user_vote')
		.select('*', { count: 'estimated', head: true })
		.eq('rebuttal', 'drizzy');

	let { count: totalStrategyDrizzy } = await supabase
		.from('user_vote')
		.select('*', { count: 'estimated', head: true })
		.eq('strategy', 'drizzy');

	total = total || 0;
	totalImpactDrizzy = totalImpactDrizzy || 0;
	totalCreativityDrizzy = totalCreativityDrizzy || 0;
	totalTechnicalityDrizzy = totalTechnicalityDrizzy || 0;
	totalDeliveryDrizzy = totalDeliveryDrizzy || 0;
	totalRebuttalDrizzy = totalRebuttalDrizzy || 0;
	totalStrategyDrizzy = totalStrategyDrizzy || 0;

	const totalImpactKdot = total - totalImpactDrizzy;
	const totalCreativityKdot = total - totalCreativityDrizzy;
	const totalTechnicalityKdot = total - totalTechnicalityDrizzy;
	const totalDeliveryKdot = total - totalDeliveryDrizzy;
	const totalRebuttalKdot = total - totalRebuttalDrizzy;
	const totalStrategyKdot = total - totalStrategyDrizzy;

	const totalDrizzy =
		totalImpactDrizzy +
		totalCreativityDrizzy +
		totalTechnicalityDrizzy +
		totalDeliveryDrizzy +
		totalRebuttalDrizzy +
		totalStrategyDrizzy;

	const totalKdot =
		totalImpactKdot +
		totalCreativityKdot +
		totalTechnicalityKdot +
		totalDeliveryKdot +
		totalRebuttalKdot +
		totalStrategyKdot;


	const inserted = {
		total,
		totalDrizzy,
		totalKdot,

		totalImpactDrizzy,
		totalCreativityDrizzy,
		totalTechnicalityDrizzy,
		totalDeliveryDrizzy,
		totalRebuttalDrizzy,
		totalStrategyDrizzy,

		totalImpactKdot,
		totalCreativityKdot,
		totalTechnicalityKdot,
		totalDeliveryKdot,
		totalRebuttalKdot,
		totalStrategyKdot
	}


	if (lastVote && lastVote.id) {
		await supabase.from("votes").update(inserted).eq("id", lastVote.id);
	}
	else {
		await supabase.from("votes").insert(inserted);
	}

	return json({
		STATUS: 'OK'
	});
}
