<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/layout/Navbar.svelte";
</script>

<!-- Global Navigation Bar -->
<Navbar />

<!-- Main content area for all pages -->
<main class="max-w-6xl mx-auto px-6 py-10">
  <slot />
</main>
