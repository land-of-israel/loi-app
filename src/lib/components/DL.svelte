<script lang="ts">
 let {label, children} = $props<{
        label: string;
        children: import ('svelte').Snippet;}>()
 
</script>

<!-- description list item to be used for slots -->
<dt class="font-semibold md:border-r border-gray-300 pr-2">
	{label}
</dt>
<dd class="pl-5">
	{@render children()}
</dd>
