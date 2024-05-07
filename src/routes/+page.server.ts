import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data } = await supabase.from('votes').select();
  let votes = {
    drizzy: 0,
    kdot: 0
  };
  if (Array.isArray(data)) votes = data[0];
	return { votes };
}
