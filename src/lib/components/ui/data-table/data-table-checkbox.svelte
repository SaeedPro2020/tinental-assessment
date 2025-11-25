<script lang="ts">
  export let checked: boolean = false;
  export let indeterminate: boolean = false;
  export let ariaLabel: string = "checkbox";
  export let onCheckedChange: (v: boolean) => void = () => {};

  let ref: HTMLInputElement | null = null;
  $: if (ref) ref.indeterminate = indeterminate;

  function handleChange(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    onCheckedChange && onCheckedChange(!!target.checked);
  }
</script>

<input
  bind:this={ref}
  type="checkbox"
  class="h-4 w-4 rounded border border-input bg-background text-primary focus-visible:ring-ring"
  {ariaLabel}
  checked={checked}
  on:change={handleChange}
/>
