import { writable } from "svelte/store";

// the items variable is declared as a store so that it can be accessed by unrelated components throughout the app
export const items = writable([]);