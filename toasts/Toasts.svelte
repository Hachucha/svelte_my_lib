<script>
    import {items, deleteItem} from "./toasts.js"
</script>

<div class="toast-cont toast z-50 toast-top toast-center md:toast-bottom md:toast-end ">
    {#each $items as item (item.id)}
        <div
            class="toast-item alert flex-nowrap flex"
            class:alert-info={item.type === "info"}
            class:alert-success={item.type === "success"}
            class:alert-warning={item.type === "warning"}
            class:alert-error={item.type === "error"}
            style="opacity: {item.opacity}!important; overflow: hidden;"
        >
            <span>{item.text}</span>
            <div>
                <button class="btn btn-circle btn-sm btn-ghost" on:click={deleteItem(item)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        ><path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        /></svg
                    >
                </button>
            </div>
        </div>
    {/each}
</div>

<style>
    .toast-item {
        transition: all 1s;
        /* transition: width: 1s;
        transition: height: 1s; */
    }
</style>
