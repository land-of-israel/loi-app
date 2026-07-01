<script lang="ts">
	let { data } = $props();
    import DL  from '$lib/components/DL.svelte';
    import NavLink from "$lib/components/NavLink.svelte"
    import { resolve } from "$app/paths";
    import PrevNextNav from "$lib/components/ui/prev-next-nav.svelte"
    import {Button} from "$lib/components/ui/button"
</script>

<div class="grid gap-4 p-10">
    <PrevNextNav
        basePath="works"
        title={data.title}
        prev={data.prev.id}
        next={data.next.id}
    />
    <dl class="grid grid-cols-[auto_1fr] gap-y-2 md:w-3xl lg:w-6xl mx-auto">
        <DL label="Title">
            {data.title || 'N/A'}
        </DL>
        {#if data.author.length > 0}
        <DL label="Author">
            <NavLink href={resolve(`/authors/${data.author[0]?.loi_id}`, {})}>{data.author[0]?.name}</NavLink>
        </DL>
        {/if}
        {#if data.genre.length > 0}
            <DL label="Genre">
                {data.genre.map(g => g.sub_genre).join(' | ')}
            </DL>
        {/if}
        {#if data.date.length > 0}
            <DL label="Date">
                {data.date.map(d => d.label).join(' | ')}
            </DL>
        {/if}
        {#if data.place.length > 0}
            <DL label="Place">
                {data.place.map(pl => pl.name).join(' | ')}
            </DL>
        {/if}
        {#if data.language}
            <DL label="Language">
                {data.language}
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
                                    {passage.text}
                                </DL>
                                {#if passage.translation}
                                    <DL label="Translation">
                                    {passage.translation}
                                </DL>
                                {/if}
                                {#if passage.keywords.length > 0}
                                    <DL label="Keywords">
                                    {#each passage.keywords as keyword, i (keyword.loi_id)}
                                        {#if i > 0} , {/if}
                                        <NavLink href={resolve(`/keywords/${keyword.loi_id}`, {})}>{keyword.value}</NavLink>                                    
                                    {/each}
                                </DL>
                                {/if}
                            </dl>
                            <div class="justify-self-end">
                                <Button href={resolve(`/passages/${passage.loi_id}`, {})} variant="default">
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