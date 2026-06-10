<script lang="ts">
	let { data } = $props();
    import DL  from '$lib/components/DL.svelte';
    import NavLink from "$lib/components/NavLink.svelte"
    import { resolve } from "$app/paths";
    import PrevNextNav from "$lib/components/ui/prev-next-nav.svelte"
</script>

<div class="grid gap-4 p-10">
   <PrevNextNav
    basePath="passages"
    title={data.title}
    prev={data.prev.id}
    next={data.next.id}
/>
    <dl class="grid grid-cols-[auto_1fr] gap-y-2 d:w-3xl lg:w-6xl mx-auto">
        <DL label="Passage Title">
            {data.title || 'N/A'}
        </DL>
        {#if data.work.length > 0 && data.work[0].author.length > 0}
        <DL label="Author">
            <NavLink href={resolve(`/authors/${data.work[0]?.author[0]?.loi_id}`, {})}>{data.work[0]?.author[0]?.name}</NavLink>
        </DL>
        {/if}
        {#if data.work.length > 0 }
        <DL label="Work Title">
            <NavLink href={resolve(`/works/${data.work[0]?.loi_id}`, {})}>{data.work[0]?.title}</NavLink>
        </DL>
        {/if}
    
        <DL label="Text">
            {data.text}
        </DL>
    
        <DL label="Translation">
            {data.translation}
        </DL>
       {#if data.german_translation}
       <DL label="German Translation">
		{data.german_translation}
	    </DL>
    {/if}

    {#if data.keywords.length > 0}
    <DL label="Keywords">
        {#each data.keywords as keyword , i (keyword.loi_id)}
            {#if i > 0} , {/if}
            <NavLink href={resolve(`/keywords/${keyword.loi_id}`, {})}>{keyword.value}</NavLink>
        {/each}
        </DL>
    {/if}

    <!-- {#if data.bibl_quotes.length > 0}
         <DL label="Biblical quotes">
         {#each data.bibl_quotes as quote (quote.loi_id)}
		    <NavLink href={resolve(`/bible-quotes/${quote.loi_id}`)}></NavLink>{quote.bible}</NavLink>
        {/each}
	    </DL>
    {/if} -->

    {#if data.commentary}
        <DL label="Commentary">
            {data.commentary}
        </DL>
    {/if}
    </dl>
</div>