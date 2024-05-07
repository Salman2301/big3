import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types';
import { env } from '$env/dynamic/public';

export const supabase = createClient<Database>(env.PUBLIC_SUPABASE_PUBLIC_URL, env.PUBLIC_SUPABASE_ANON_KEY);
