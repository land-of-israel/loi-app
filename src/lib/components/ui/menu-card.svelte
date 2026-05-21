<script lang="ts">
	const colors = {
		sky: 'bg-sky-500 shadow-sky-500/40',
		green: 'bg-green-500 shadow-green-500/40',
		amber: 'bg-amber-500 shadow-amber-500/40',
		fuchsia: 'bg-fuchsia-600 shadow-fuchsia-600/40',
		cyan: 'bg-cyan-600 shadow-cyan-600/40',
		red: 'bg-red-600 shadow-red-600/40',
		pink: 'bg-pink-800 shadow-pink-800/40',

	};
    let { title, description, color = 'sky', icon: Icon, link } = $props();
</script>
 

    <div class="relative isolate rounded-lg bg-white p-6 text-center shadow-xl border border-neutral-300">
      <div class={`mx-auto flex h-16 w-16 -translate-y-12 items-center justify-center rounded-full 
      filter saturate-60 shadow-lg ${colors[color]}`}>
        <Icon class="h-6 w-6 text-white" />
      </div>      
      <h1 class="text-darken mb-3 pt-3 text-xl font-medium lg:h-14 lg:px-14">
        <a href={link} class="px-3 py-2 bg-brand-300  rounded-md">
            <span class="absolute inset-0 z-10"></span>
            {title}
        </a>
        </h1>
      <p class="px-4 text-gray-500">{description}</p>
      
    </div>