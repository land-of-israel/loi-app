<script lang="ts">
    let {href, children} = $props<{
        href: string;
        children: import('svelte').Snippet}>()
    
</script>

<a href={href} class="hover:text-amber-950 font-lg text-semibold">
    {@render children()}
</a>