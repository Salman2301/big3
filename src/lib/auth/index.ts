import { currentModal } from "$lib/components/modal/modal.store";
import type { Tables } from "$lib/database.types";
import { supabase } from "$lib/supabaseClient";

type USER_STATE = "NOT_REGISTER" | "USERNAME" | "TEAM_SELECTION" | "VOTE" | "COMPLETED";
export async function currentUserState(): Promise<USER_STATE> {
  const userObj = await getUserMe();
  if (!userObj) return "NOT_REGISTER";

  const { data: userState, error } = await supabase.from("user_data").select();
  if (Array.isArray(userState) && userState.length > 0 ) {
    return userState[0].state_next as USER_STATE;
  }
  else {
    const inserted = await supabase.from("user_data").insert({
      state_next: "USERNAME",
    });
    return "USERNAME";
  }
}

export async function getUserId(): Promise<string> {
  return (await getSession()).data.session?.user.id || "";
}

export async function getUserData(): Promise<Tables<"user_data"> | null> {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("store$userData");
  if (stored && stored.startsWith("{")) return JSON.parse(stored);
  
  const { data: userDataItems } = await supabase.from("user_data").select().eq("user_id", await getUserId());
  const userData = userDataItems?.[0] as Tables<"user_data">;

  localStorage.setItem("store$userData", JSON.stringify(userData));

  return userData
}

export async function getTeam(): Promise<"drizzy" | "kdot"> {
  const userData = await getUserData();
  return userData?.team as "drizzy" | "kdot";
}

export function refreshSession() {
  supabase.auth.refreshSession();
  localStorage.setItem("store$userData", "");
}

export function loginWithGoogle() {
  supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: new URL(window.location.href).origin,
    }
  });
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession()

  return { data }
} 

export async function getUserMe() {
  const { data: { user }, error } = await supabase.auth.getUser();
  return user;
}

function sleep(ms: number) {
  return new Promise(res => setTimeout(res, ms));
}

export async function logout() {
  const { error } = await supabase.auth.signOut()


}

export async function checkUserComplete() {
  const state = await currentUserState();
  if (state === "COMPLETED") return;
  if (state === "NOT_REGISTER") currentModal.set("login");
}