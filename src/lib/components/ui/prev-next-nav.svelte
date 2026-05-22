<script lang="ts">
    import {Button} from "$lib/components/ui/button"
    import ChevronLeft from '@lucide/svelte/icons/chevron-left';
    import ChevronRight from '@lucide/svelte/icons/chevron-right';

let { basePath, title, prev, next } = $props()
</script>

<div class="flex justify-between">
        <Button href={`/${basePath}/${prev}`} variant="secondary">
            <ChevronLeft/>
            <span class="hidden md:block">Previous</span>
        </Button>
        <h1 class="text-2xl font-semibold text-center p-5">{title || 'N/A'}</h1>
        <Button href={`/${basePath}/${next}`} variant="secondary">
            <span class="hidden md:block">Next</span>
            <ChevronRight/>
        </Button>
    </div>