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

    {#if data.bibl_quotes.length > 0}
         <DL label="Biblical quotes">
         {#each data.bibl_quotes as quote (quote.loi_id)}
		  <li class="group relative">
            {quote.bible}
            {#if quote.text}  
                <span class="italic invisible group-hover:visible absolute z-10 w-75 top-8 left-0 border-brand-600 border bg-brand-300 opacity-95 p-2 rounded-sm shadow-sm text-sm">{quote.text}</span>
            {/if}
         </li>   
        {/each}
	    </DL>
    {/if}

    {#if data.parallels.length > 0}
         <DL label="Parallel texts">
         <ul>
         {#each data.parallels as parallel (parallel.loi_id)}
         <li class="group relative">
            {parallel.label}
            {#if parallel.excerpt}  
                <span class="italic invisible group-hover:visible absolute z-10 w-75 top-8 left-0 border-brand-600 border bg-brand-300 opacity-95 p-2 rounded-sm shadow-sm text-sm">{parallel.excerpt}</span>
            {/if}
         </li>
        {/each}
        </ul>
	    </DL>
    {/if}

    {#if data.commentary}
        <DL label="Commentary">
            {data.commentary}
        </DL>
    {/if}
    </dl>
</div>