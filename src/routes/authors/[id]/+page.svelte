<script lang="ts">
	let { data } = $props();
    import DL  from '$lib/components/DL.svelte';
    import PrevNextNav from "$lib/components/ui/prev-next-nav.svelte"
    import NavLink from '$lib/components/NavLink.svelte';
    import {resolve} from "$app/paths"
</script>

<div class="grid gap-4 p-10">
    <PrevNextNav
        basePath="authors"
        title={data.name}
        prev={data.prev.id}
        next={data.next.id}
    />
    <dl class="grid grid-cols-[auto_1fr] gap-y-2 md:w-3xl lg:w-6xl mx-auto">
        <DL label="Title">
            {data.name || 'N/A'}
        </DL>
        {#if data.wikidata}
        <DL label="Wikidata">
            <NavLink href={data.wikidata}>Link</NavLink>
         </DL>
        {/if}
       {#if data.gnd}
        <DL label="GND">
            <NavLink href={data.gnd}>Link</NavLink>
         </DL>
        {/if}
        <DL label="Works">
            {#each data.works as work, i (work.loi_id)}
             {#if i > 0} , {/if}
                <NavLink href={resolve(`/works/${work.loi_id}`, {})}>{work.title}</NavLink>
            {/each}
        </DL>
      
    </dl>
</div>