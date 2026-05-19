<script lang="ts">
    let {href, children} = $props<{
        href: string;
        children: import('svelte').Snippet}>()
    
</script>

<a href={href} class="hover:text-accent font-lg text-semibold">
    {@render children()}
</a>