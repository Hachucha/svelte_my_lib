import { writable } from "svelte/store";

export let items = writable([]);

let nextId = 0;

export function custom({ duration = 3, text, type = "info" }) {
    const item = {
        text,
        type,
        id: nextId++,
        duration,
        opacity: 1,
        maxHeight: '100px',
        maxWidth: '200px',
    };

    items.update((items) => [...items, item]);

    if (duration) {
        // setTimeout(() => {
        //     item.opacity = 0;
        //     items.update((items) => items);
        //     console.log("Скрыто");
        // }, duration * 1000); // Задержка перед началом растворения

        setTimeout(
            async() => {
                item.opacity = 0;
                items.update((items) => {
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].id === item.id) {
                            items[i] = item;
                            break;
                        }
                    }
                    return items;
                });
                console.log("Скрыто");
                await new Promise((resolve) => setTimeout(resolve, 1000));
                deleteItem(item);
                console.log("Удалено");
            },
            (duration) * 1000,
        );
    }

    return item;
}

export function info(text) {
    return custom({ text, type: "info" });
}

export function success(text) {
    return custom({ text, type: "success" });
}

export function warning(text) {
    return custom({ text, type: "warning" });
}

export function error(text) {
    return custom({ text, type: "error" });
}

export async function deleteItem(item) {
    // item.maxHeight = '0px';
    // item.maxWidth = "10px";
    // item.padding = '0px';

    // await new Promise((resolve) => setTimeout(resolve, 1000));
    items.update((items) => items.filter((_item) => _item.id !== item.id));
}