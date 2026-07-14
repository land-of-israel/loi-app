<script lang="ts">
import { onMount } from "svelte";
import type { InstantSearch } from "instantsearch.js";
import { createSearch, searchState } from "$lib/search/client.svelte";

let search: InstantSearch | null = null;
let filtersOpen = $state(false);


onMount(() => {  
    search = createSearch();
    search.start();
    return () => search?.dispose();
});
</script>

<div class="max-w-7xl px-4 sm:px-6 mx-auto py-4 sm:py-6">
     <div id="searchbox" class="w-full rounded-lg p-4 sm:p-6 md:p-8 bg-brand-200 flex items-center"></div>
     <div class="grid md:grid-cols-[1fr_3fr] md:gap-6 md:py-6">
        <div class="flex gap-4">
            <div class="md:hidden flex items-center py-3">
                <button
                type="button"
                onclick={() => (filtersOpen = !filtersOpen)}
                class="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium shadow-sm active:scale-[0.98]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 01.8 1.6l-4.8 6.4v4a1 1 0 01-.4.8l-3 2A1 1 0 017 16v-6L2.2 3.6A1 1 0 013 3z" clip-rule="evenodd"/>
                    </svg>
                    Filters
                    <span
                        class:hidden={searchState.activeFilterCount === 0}
                        class="inline-flex items-center justify-center rounded-full bg-brand-600 text-white text-xs h-5 w-5"
                    >
                        {searchState.activeFilterCount}
                    </span>
                </button>            
            </div>
            <div id="clearRefinements" class="flex items-center py-3"></div>
        </div>

        <div id="refinementsDialog" >
            <div class="bg-white md:h-auto rounded-t-2xl md:rounded-lg border md:border-slate-200 flex flex-col">
        
                <div id="refinements" class="p-4 space-y-4 overflow-y-auto">
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
    
                <div class="p-4 border-t md:hidden">
                    <button type="button" onclick = {() => (filtersOpen = !filtersOpen)} class="w-full rounded-md bg-brand-600 text-white py-2 font-medium">
                        Show results
                    </button>
                </div>
            </div>
        </div>

        <!-- Results column -->
        <div class="space-y-3 md:col-start-2 md:row-start-1 min-w-0">
            <div id="currentRefinements" class="hidden md:block"></div>
            <div id="stats" class="text-sm text-slate-500"></div>
            <div id="hits"></div>
            <div id="pagination" class="pt-4"></div>
        </div>
 </div>
  </div>

  