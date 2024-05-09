import {writable, get} from 'svelte/store';

export let formsStore = writable([]);

function addModal(modal) {
    return new Promise((resolve, reject) => {
        console.log(modal);
        formsStore.update((modals) => {
            return [...modals, {
                id: Date.now(),
                ...modal,
                resolve,
                reject
            }];
        });
        console.log(get(formsStore));
    })
}

export function removeModal(id) {
    formsStore.update((modals) => {
        return modals.filter((modal) => modal.id !== id);
    });
}

export function open({ title, submitText, cancelText }, fields, onSubmit) {
    console.log("open form");
    if (!onSubmit) {
        throw new Error("onSubmit is required");
    }
    if (!Array.isArray(fields)) {
        throw new Error("fields must be an array");
    }
    for (let field of fields) {
        if (!field.name) {
            throw new Error("field must have a name");
        }
        if (field.type == "select" && !field.options) {
            throw new Error("field must have options");
        }
        if (!field.title) {
            field.title = field.name;
        }
        if (!field.type){
            field.type = "text";
        }
        if (!field.value) {
            field.value = "";
        }
        field.previousValue = field.value;
        field.valid = true;
    }
    return addModal({ title, submitText, cancelText, fields, type: "form", onSubmit });
}

export function validate(modalId) {
    let modal = get(formsStore).find((modal) => modal.id == modalId);
    let result = true;

    for (let field of modal.fields) {
        if (field.required && !field.value) {
            field.valid = false;
            result = false;
        }
        if (!field.validators) {
            continue;
        }
        for (let validator of field.validators) {
            // console.log(validator(field.value));
            field.valid = true;
            console.log(field.validators);
            if (validator(field.value)) {
                field.valid = false;
                result = false;
            }
            
        }
        
    }
    formsStore.update((modals) => {
        return modals;
    })
    // for (let field of modal.fields) {
    //     if (!field.valid) {
    //         // field.element.focus();
    //         break;
    //     }
    // }
    console.log(result);
    return result;
}