import { get, writable, type Writable } from "svelte/store";
import { getUserMe } from ".";
import type { User } from "@supabase/supabase-js";

export const currentUser: Writable<Promise<User|null>> = writable(getUserMe());
