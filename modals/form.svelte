<script>
    import { formsStore, removeModal, validate } from "./form.js";
    import AbstractModal from "../abstractModal.svelte";
    import Field from "../forms/field.svelte";   
</script>

{#each $formsStore as modal}
    <AbstractModal bind:title={modal.title} opened={true}>
        {#each modal.fields as field}
            <Field bind:field/>
        {/each}
        <div slot="buttons">
            <button
                on:click={async () => {
                    modal.resolve();
                    removeModal(modal.id);
                }}
                class="btn btn-error">{modal.cancelText || "Отмена"}</button
            >
            <button
                on:click={async () => {
                    if (!validate(modal.id)) return;
                    let result = {};
                    for (let field of modal.fields) {
                        result[field.name] = field.value;
                    }
                    let success = await modal.onSubmit(result);
                    if (success) {
                        modal.resolve(result);
                        removeModal(modal.id);
                    }
                }}
                class="btn btn-primary">{modal.submitText || "Сохранить"}</button
            >
        </div>
    </AbstractModal>
{/each}
