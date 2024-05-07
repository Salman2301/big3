import type { Tables } from '$lib/database.types';
import { supabase } from '$lib/server/supabaseClient';

export async function load() {
	const { data } = await supabase.from('votes').select();
  let votes: Partial<Tables<"votes">> = {
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
    totalTechnicalityKdot: 0
  };
  if (Array.isArray(data) && data.length > 1) votes = data[0];
	return { votes };
}
