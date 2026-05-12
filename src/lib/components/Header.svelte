<script lang="ts">
  import NavButton from '$lib/components/NavButton.svelte'
</script>
<header>
  <nav class="flex items-center gap-6 bg-amber-600 p-4 text-lg font-bold text-white">
    <div class="mr-auto text-2xl">
      <NavButton href="/">
        The Land of Israel in Geonic Times
      </NavButton>
    </div>

    <ul class="flex item-center gap-4">
      <li><NavButton href="/">Home</NavButton></li>
      <li><NavButton href="/about">About</NavButton></li>
    </ul>
  </nav>
</header>