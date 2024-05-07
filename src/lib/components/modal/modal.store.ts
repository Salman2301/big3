import { writable, type Writable } from "svelte/store";

type ModalShow = "login" | "vote" | "team" | "username";
export const currentModal: Writable<ModalShow | null> = writable(null);
