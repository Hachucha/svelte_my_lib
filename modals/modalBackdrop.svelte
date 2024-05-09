<script>
    export let mobile = true;
    export let closable = true;
    export let opened = true;
    import { createEventDispatcher } from 'svelte';
    import {trapFocus} from "./focus-trap"

    const dispatchEvent = createEventDispatcher();
</script>

<div
    class="modal-backdrop fixed top-0 left-0 right-0 flex flex-col justify-center items-center overflow-y-auto z-10 {mobile ? 'bottom-0' : 'modal-backdrop-with-nav md:bottom-0'} "
    style="background: rgba(0, 0, 0, 0.5);" 
    class:hidden={!opened}

    use:trapFocus

    on:click={() => closable ? dispatchEvent('close') : null}
>
       {#if closable}
       <button class="fixed top-6 right-6 cursor-pointer hidden md:block text-base-content">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
            />
        </svg>
    </button>
    {/if}
        <slot></slot>
</div>