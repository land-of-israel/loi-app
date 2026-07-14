<script lang="ts">
import MenuCard from '$lib/components/ui/menu-card.svelte';
import MenuItem from "$lib/components/ui/menu-item.svelte";
import { Search, BookOpenText, Wrench } from '@lucide/svelte';
import { resolve } from "$app/paths";
	import {Button} from '$lib/components/ui/button';
</script>

<div class="w-full h-full bg-brand-200">
    <div class="grid justify-items-center gap-2 mx-auto">
        <h1 class="text-5xl md:text-8xl font-bold text-accent md:py-25 p-10 text-center font-heading text-shadow-xs text-shadow-amber-900">Land of Israel in Geonic Times</h1>
        <p class="font-heading font-normal text-2xl text-center text-text max-w-3/5">
            Exploring Jewish relationships with the ancestral homeland through literature 
            from the rise of Islam to the First Crusade (7th–11th centuries).</p>
            <Button href={resolve(`/about`, {})} variant="link">Read More</Button>
    </div>
    <div class="grid gap-10 md:grid-cols-3 md-gap-5 py-20 px-10">
            <MenuCard heading="Browse the database" description="See all entries in tablular format; filter by work, author or keyword"
            color="green"
            icon={BookOpenText}>
            <div class="grid grid-cols-2 mx-auto gap-2 md:gap-4 p-5">
                <MenuItem title="Passages" link={resolve('/passages', {})}/>
                <MenuItem title="Works" link={resolve('/works', {})}/>
                <MenuItem title="Authors" link={resolve('/authors', {})}/>
                <MenuItem title="Keywords" link={resolve('/keywords', {})}/>
                </div>
            </MenuCard>

            <MenuCard description="Use the faceted search to quickly refine results."
                color="sky"
                icon={Search}>
                    <MenuItem title="Search" link={resolve('/search', {})}/>
            </MenuCard>
           
           <MenuCard description="Place to find charts, graph & Co ... in the future"
            color="amber"
            icon={Wrench}>
                <MenuItem title="Tools" link={resolve('/tools', {})}/>
            </MenuCard>
    </div>
</div>