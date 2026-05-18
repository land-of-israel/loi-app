<script lang="ts">
	let { data } = $props();
    import DL  from '$lib/components/DL.svelte';
    import NavLink from "$lib/components/NavLink.svelte"
</script>

<div class="grid gap-4 p-10">
    <h1 class="text-2xl font-semibold text-center p-5">{data.passage.title}</h1>
    <dl class="grid grid-cols-[200px_1fr] gap-y-2">
        <DL label="Passage">
            {data.passage.title}
        </DL>
        <DL label="Author">
            <NavLink href={`/authors/${data.passage.work[0].author[0].loi_id}`}>{data.passage.work[0].author[0].name}</NavLink>
        </DL>
        <DL label="Work">
            <NavLink href={`/works/${data.passage.work[0].loi_id}`}>{data.passage.work[0].title}</NavLink>
        </DL>
    
        <DL label="Text">
            {data.passage.text}
        </DL>
    
        <DL label="Translation">
            {data.passage.translation}
        </DL>
       {#if data.passage.german_translation}
       <DL label="German Translation">
		{data.passage.german_translation}
	    </DL>
    {/if}

    {#if data.passage.keywords.length > 0}
    <DL label="Keywords">
        {#each data.passage.keywords as keyword}
            <NavLink href={`/keywords/${keyword.loi_id}`}>{keyword.value}</NavLink>
        {/each}
        </DL>
    {/if}

    {#if data.passage.bibl_quotes.length > 0}
         <DL label="Biblical quotes">
         {#each data.passage.bibl_quotes as quote}
		    <NavLink href={`/bible-quotes/${quote.loi_id}`}>{quote.bible}</NavLink>
        {/each}
	    </DL>
    {/if}

    {#if data.passage.commentary}
        <DL label="Commentary">
            {data.passage.commentary}
        </DL>
    {/if}
    </dl>
</div>