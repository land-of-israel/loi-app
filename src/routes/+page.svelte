<script lang="ts">
import MenuCard from '$lib/components/ui/menu-card.svelte';
import { BookOpen, Users, Search, MessageSquareText, TextWrap, Wrench } from '@lucide/svelte';
import { resolve } from "$app/paths";
</script>

<div class="w-full h-full bg-brand-200">
    <div class="grid justify-items-center gap-2 mx-auto">
        <h1 class="text-5xl md:text-8xl font-bold text-accent md:py-25 p-10 text-center font-heading text-shadow-xs text-shadow-amber-900">Land of Israel in Geonic Times</h1>
        <p class="font-heading font-normal text-2xl text-center text-text max-w-3/5">
            Exploring Jewish relationships with the ancestral homeland through literature 
            from the rise of Islam to the First Crusade (7th–11th centuries).</p>
    </div>
    <div class="grid gap-10 md:grid-cols-3 md-gap-5 py-20 px-10">
        <div class="grid ">
            <MenuCard title="Browse by Passage" description="See all passages in the database, filter by work, author or keyword"
            color="green"
            icon={MessageSquareText} link={resolve('/passages')}/>
        </div>
        <div class="grid">
            <MenuCard title="Browse by Works" description="See all works in the database, filter by author or keyword"
            color="fuchsia"
            icon={BookOpen} link={resolve('/works')}/>
        </div>
        <div class="grid">
            <MenuCard title="Browse by Authors" description="See all authors in the database, filter by work, passage or keyword"
            color="amber"
            icon={Users} link={resolve('/authors')}/>
    </div> 
    <div class="grid">
            <MenuCard title="Browse by Keywords" description="See all keywords in the database, filter by work, author or passage"
            color="red"
            icon={TextWrap} link={resolve('/keywords')}/>
    </div> 
     <div class="grid">
            <MenuCard title="Search" description="Quo usque tandem catilina abutere patientia nostra"
            color="cyan"
            icon={Search} link={resolve('/search')}/>
    </div> 
     <div class="grid">
            <MenuCard title="Explore" description="Quam diu furor ipse tuus etiam nos eludet"
            color="pink"
            icon={Wrench} link={resolve('/tools')}/>
    </div> 
    </div>
</div>