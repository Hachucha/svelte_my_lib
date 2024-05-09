<script>
    import ModalBackdrop from "./modalBackdrop.svelte";
    import { modalsStore, removeModal } from "./modals.js";
    import Field from "../forms/field.svelte";
</script>

{#each $modalsStore as modal}
    <!-- <div>{modal.type=="promt"}</div> -->
    <ModalBackdrop closable={false}>
        <div class="card w-full max-w-sm bg-base-100 shadow-xl text-base-content">
        {#if modal.type == "confirm"}
            
                <div class="card-body">
                    <h2 class="card-title">
                        {modal.title}
                    </h2>
                    <p>
                        {modal.text}
                    </p>
                    <div class="card-actions justify-end">
                        <button
                            class="btn btn-error"
                            on:click={() => {
                                modal.resolve(false);
                                removeModal(modal.id);
                            }}
                        >
                            Нет
                        </button>
                        <button
                            class="btn btn-primary"
                            on:click={() => {
                                modal.resolve(true);
                                removeModal(modal.id);
                            }}
                        >
                            Да
                        </button>
                    </div>
                </div>
        {:else if modal.type == "promt"}
            
                <div class="card-body w-full">
                    <h2 class="card-title">
                        {modal.title}
                    </h2>
                    {#if modal.text}
                    <p>
                        {modal.text}
                    </p>
                    {/if}
                    <Field bind:field={modal.field}/>
                    <div class="card-actions justify-end">
                        
                        <button
                            class="btn btn-error"
                            on:click={() => {
                                removeModal(modal.id);
                                modal.resolve(false);
                            }}
                        >
                            Отмена
                        </button>
                        <button
                            class="btn btn-primary"
                            on:click={() => {
                                console.log(modal.field.value);
                                if (!modal.validate()) return;
                                removeModal(modal.id);
                                modal.resolve(modal.field.value);
                            }}
                        >
                            Ок
                        </button>
                    </div>
                </div>
        {/if}
        </div>
    </ModalBackdrop>
{/each}
