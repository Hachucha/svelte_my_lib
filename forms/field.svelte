<script>
    export let field;
    export let onInput = null;

    function validate() {
        field.invalid = false;
        if (field.required && !field.value) {
            field.invalid = true;
        }
        if (field.invalidators) {
            for (let validator of field.invalidators) {
                if (!validator(field.value)) {
                    field.invalid = true;
                }
            }
        }
    }
    /*
    Свойства {
        name: "",
        title: "",
        type: "",
        value: "",
        placeholder: "",
        wide: false,
        description: "",
        required: false,
        validators: [], - массив валидаторов, которые возвращают false в случае правильности и текст в случае неправильности
        element: null,
        valid: true
    }
    */
</script>

<div class="flex flex-col gap-5">
    <div class="">
        {#if field.title}
            <div class="label">
                <span class="label-text {!field.invalid ? '' : 'text-error'}"
                    >{field.title}</span
                >
            </div>
        {/if}
        {#if field.type === "text"}
            <input
                on:input={(e) => {
                    field.value = e.target.value;
                    validate();
                }}
                placeholder={field.placeholder}
                class="input input-bordered w-full {field.wide
                    ? ''
                    : 'max-w-xs'} {!field.invalid ? '' : 'input-error'}"
                value={field.value}
                bind:this={field.element}
            />
        {:else if field.type === "number"}
            <input
                on:input={(e) => {
                    field.value = e.target.value;
                    validate();
                }}
                type="number"
                placeholder={field.placeholder}
                class="input input-bordered w-full {field.wide
                    ? ''
                    : 'max-w-xs'} {!field.invalid ? '' : 'input-error'}"
                value={field.value}
                bind:this={field.element}
            />
        {:else if field.type === "select"}
            <select
                on:input={(e) => {
                    field.value = e.target.value;
                    validate();
                }}
                class="select select-bordered w-full {field.wide
                    ? ''
                    : 'max-w-xs'} {!field.invalid ? '' : 'select-error'}"
                value={field.value}
                bind:this={field.element}
            >
                {#each field.options as option}
                    <option value={option.value}>{option.title}</option>
                {/each}
            </select>
        {:else if field.type === "multiselect"}
            <select
                multiple
                on:input={(e) => {
                    field.value = e.target.value;
                }}
                class="select select-bordered w-full {field.wide
                    ? ''
                    : 'max-w-xs'} {!field.invalid ? '' : 'select-error'}"
                value={field.value}
                bind:this={field.element}
            >
                {#each field.options as option}
                    <option value={option.value}>{option.title}</option>
                {/each}
            </select>
        {:else if field.type === "inert"}
            <div
                class="noscroll input input-bordered w-full {field.wide
                    ? ''
                    : 'max-w-xs'} flex items-center border-dashed overflow-auto"
            >
                {field.value}
            </div>
        {/if}
        {#if field.description}
            <div class="text-xs mt-1 ml-1">{field.description}</div>
        {/if}
    </div>
</div>
