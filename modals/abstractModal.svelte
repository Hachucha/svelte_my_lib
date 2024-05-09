<script>
    export let opened;
    export let title = "";
	
    import ModalBackdrop from "./modalBackdrop.svelte";
    
</script>

{#if opened}
<ModalBackdrop
				closable={false}
				mobile={true}
				on:close={() => {
					// opened = false;
				}}
			>
			<div
				class="flex flex-col gap-2 w-full h-screen bg-base-200 
                md:bg-base-100 md:rounded-xl md:w-[600px] md:h-fit md:max-h-[90vh] text-base-content  
                p-4 "
				on:click={(e) => e.stopPropagation()}
			>
			
                <div class="flex gap-2 items-center justify-between px-4 md:mt-4">
                    <div class="prose">
                        <h3 class="">{title}</h3>
                    </div>
                </div>
                <div class="flex flex-col gap-2 h-full max-h-full w-full overflow-auto rounded-xl p-4">
                    <slot></slot>
                </div>
                <div class='flex justify-end gap-2 px-4 md:mb-4'>
                    <slot name="buttons">
                        
                    </slot>
                </div>
			</div>
		</ModalBackdrop>
{/if}