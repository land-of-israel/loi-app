<script lang="ts">
import { onMount } from "svelte";
import type { InstantSearch } from "instantsearch.js";
let search: InstantSearch | null = null;
import { createSearch } from "$lib/search/client";


onMount(() => {  
    search = createSearch();
    search.start();
    return () => search?.dispose();
});
</script>
<div class="max-w-7xl mx-auto">
    <div id="searchbox" class="w-full rounded-lg p-8 bg-brand-200"></div>
    <div id="clearRefinements"></div>
    <div class="grid md:grid-cols-[1fr_3fr] md:gap-6 md:py-5">
        <div id="refinements">
            <div id="refinement-list-work"></div>
            <div id="refinement-list-author"></div>
            <div id="refinement-list-genre"></div>
            <div id="refinement-list-keywords"></div>
            <div id="refinement-list-bibl"></div>
            <div id="refinement-list-parallels"></div>
            <div id="refinement-list-place"></div>
            <div id="refinement-list-language"></div>
            <div id="refinement-list-date"></div>
        </div>
        <div class="space-y-2">
            <div id="currentRefinements"></div>
            <div id="stats"></div>
            <div id="hits" ></div>
            <div id="pagination"></div>
        </div>
    
    
    </div>
</div>
