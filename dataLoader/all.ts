// export class DataLoader {
//     value: any;
//     state: "loading" | "loaded" | "error" | "none-triggered" = "none-triggered";
//     error: any;
//     #func: any;
//     constructor(func: any, initialValue: any) {
//         this.#func = func;
//         this.value = initialValue;
//     }
//     async load(...args: any[]) {
//         this.state = "loading";
//         try {
//             this.value = await this.#func(...args);
//             this.state = "loaded";
//         }
//         catch (e) {
//             this.state = "error";
//             this.error = e;
//         }
//     }
// }

import { writable, get } from "svelte/store"

export function DLStore(func: any, initialValue: any) {
    const store = writable({
        value: initialValue,
        state: "none-triggered",
        error: null
    });
    return {
        subscribe: store.subscribe,
        load: async (...args: any[]) => {
            try {
                store.set ({ value: null, state: "loading", error: null });
                let value = await func(...args);
                console.log(value)
                store.set({ value: value, state: "loaded", error: null });
            }
            catch (e:any) {
                console.log(3)
                store.set({ value: null, state: "error", error: e });
            }
        },
        loadQuiet: async (...args: any[]) => {
            try {
                let value = await func(...args);
                store.set({ value: value, state: "loaded", error: null });
            }
            catch (e:any) {
                store.set({ value: null, state: "error", error: e });
            }
        },
        set: (value: any) => store.set({ value: value, state: "loaded", error: null }),
        value: () => get(store).value,
        state: () => get(store).state,
        error: () => get(store).error
    }
}
