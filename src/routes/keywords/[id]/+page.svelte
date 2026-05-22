<script lang="ts">
	let { data } = $props();
    import DL  from '$lib/components/DL.svelte';
    import { resolve } from "$app/paths";
    import PrevNextNav from "$lib/components/ui/prev-next-nav.svelte"
    import {Button} from "$lib/components/ui/button"
</script>

<div class="grid gap-4 p-10">
    <PrevNextNav
        basePath="keywords"
        title={data.label}
        prev={data.prev.id}
        next={data.next.id}
    />
    <dl class="grid grid-cols-[auto_1fr] gap-y-2 md:w-3xl lg:w-6xl mx-auto">
        <DL label="Title">
            {data.label || 'N/A'}
        </DL>
        {#if data.notes}
        <DL label="Notes">
            {data.notes}
         </DL>
        {/if}
       
        {#if data.passages.length > 0}
            <DL label="Passages">
                {#each data.passages as passage (passage.loi_id)}
                    <details open class="border rounded mb-2">
                        <summary class="text-brand-600 cursor-pointer bg-brand-100 p-2">{passage.loi_id}</summary>
                        <div class="grid gap-2 px-4 py-2">
                            <dl class="grid grid-cols-[auto_1fr] gap-y-2">
                                <DL label="Text">
                                    {passage.title}
                                </DL>
                               
                            </dl>
                            <div class="justify-self-end">
                                <Button href={resolve(`/passages/${passage.loi_id}`)} variant="default">
                                    See passage
                                </Button>
                            </div>
                        </div>
                    </details>
                {/each}
            </DL>
        {/if}
    </dl>
</div>