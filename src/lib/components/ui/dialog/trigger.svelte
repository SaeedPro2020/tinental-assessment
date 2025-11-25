<script lang="ts">
  // Use Svelte's built-in $$restProps for prop forwarding. Do not export $$props; the $ prefix is reserved.
  export let className = '';
  // $$restProps is automatically available in the component; declare its type for TS if needed
  declare const $$restProps: Record<string, any>;
  import { onMount, createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let el: HTMLElement | null = null;

  onMount(() => {
    console.log('Dialog.Trigger mounted');
  });
</script>

<span
  bind:this={el}
  class={className}
  role="button"
  tabindex="0"
  {...$$restProps}
  on:click={() => {
    console.log('Dialog.Trigger: activated');
    dispatch('dialog-trigger');
    if (el) el.dispatchEvent(new CustomEvent('dialog-trigger', { bubbles: true }));
  }}
  on:keydown={(e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      console.log('Dialog.Trigger: keyboard activate');
      dispatch('dialog-trigger');
      if (el) el.dispatchEvent(new CustomEvent('dialog-trigger', { bubbles: true }));
    }
  }}
>
  <slot />
</span>
