<script lang="ts">
    export let dataLoader: any;
    export let customLPH: any = null;
    export let customError: boolean = false;
</script>

{#if $dataLoader.state == "loading"}
    {#if customLPH}
        <slot name="customLPH" />
    {:else}
        <div class="loader loading-spinner loading-lg"></div>
    {/if}
{:else if $dataLoader.state == "error"}
    {#if customError}
        <slot name="customError" />
    {:else}
        <div>
            <p>
                Произошла ошибка {$dataLoader.error.message ||
                    JSON.stringify($dataLoader.error)}
            </p>
        </div>
    {/if}
{:else if $dataLoader.state == "loaded"}
    <slot />
{/if}
