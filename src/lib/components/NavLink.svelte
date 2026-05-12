<script lang="ts">
    let { href, children } = $props<{
        href: string;
        children: import ('svelte').Snippet;}>()
</script>

<a href={href} class="underline underline-offset-2 decoration-dotted">
    {@render children()}
</a>