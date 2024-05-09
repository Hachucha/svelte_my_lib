import { writable, get } from 'svelte/store';

export let modalsStore = writable([]);

function addModal(modal) {
    return new Promise((resolve, reject) => {
        modalsStore.update((modals) => {
            return [...modals, {
                id: Date.now(),
                ...modal,
                resolve,
                reject
            }];
        });
        console.log(get(modalsStore));
    })
}

export function removeModal(id) {
    try {
        modalsStore.update((modals) => {
            return modals.filter((modal) => modal.id !== id);
        });
    } catch (e) {
        console.log(e);
    }

}

export function alert(title, text) {
    return addModal({ title, text, type: "alert" });
}

export function confirm(title, text) {
    return addModal({ title, text, type: "confirm" });
}

export function promt(title, field, text) {
    field.name = "value";
    field.placeholder = field.placeholder || field.type == "number" ? "0" : "Введите значение";
    field.valid = true;
    return addModal({
        title, field, text, type: "promt", validate: function () {
            let result = true;
            if (this.field.validators) {
                for (let validator of this.field.validators) {
                    this.field.valid = true;
                    if (validator(this.field.value)) {
                        this.field.valid = false;
                        result = false;
                    }
                }
            }
            if (this.field.required && !this.field.value) {
                this.field.valid = false;
                result = false;
            }
            return result;
        }
    });
}