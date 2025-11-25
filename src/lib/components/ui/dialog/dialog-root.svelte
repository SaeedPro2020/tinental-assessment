<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  export let open = false;
  const dispatch = createEventDispatcher();

  function openDialog() {
    open = true;
    dispatch('open');
    console.log('Dialog.Root: openDialog called');
  }

  function closeDialog() {
    open = false;
    dispatch('close');
    console.log('Dialog.Root: closeDialog called');
  }

  // Only access `document` after the component is mounted (browser-only).
  let mounted = false;

  onMount(() => {
    mounted = true;
    // initialize body overflow based on current open state
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      // cleanup on destroy
      document.body.style.overflow = '';
      mounted = false;
    };
  });

  // react to open changes only when mounted (prevents SSR errors)
  $: if (mounted) {
    if (open) document.body.style.overflow = 'hidden'; else document.body.style.overflow = '';
    console.log('Dialog.Root: reactive open state:', open);
  }
</script>

<!-- Wrap slot in a div that listens for DOM events from slotted children -->
<div on:dialog-trigger={() => { console.log('Dialog.Root: dialog-trigger received'); openDialog(); }}>
  <slot {open} {openDialog} {closeDialog} />
</div>
