import { SUPABASE_SERVICE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_PUBLIC_URL } from "$env/static/public";
import type { Database } from "$lib/database.types";
import { createClient } from "@supabase/supabase-js";


export const supabase = createClient<Database>(PUBLIC_SUPABASE_PUBLIC_URL, SUPABASE_SERVICE_KEY);
