<script lang="ts">
  // Use Svelte's built-in $$restProps for prop forwarding. Do not export $$props; the $ prefix is reserved.
  export let className = '';
  // $$restProps is automatically available in the component; declare its type for TS if needed
  declare const $$restProps: Record<string, any>;
  import { onMount, createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let el: HTMLButtonElement | null = null;

  onMount(() => {
    console.log('Dialog.Trigger mounted');
  });
</script>

<button
  bind:this={el}
  class={className}
  {...$$restProps}
  on:click={() => {
    console.log('Dialog.Trigger: button clicked');
    // dispatch a Svelte component event
    dispatch('dialog-trigger');
    // also dispatch a DOM CustomEvent on the button element so parent DOM listeners receive it
    if (el) el.dispatchEvent(new CustomEvent('dialog-trigger', { bubbles: true }));
  }}
>
  <slot />
</button>
