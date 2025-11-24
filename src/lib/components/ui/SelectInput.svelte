<script lang="ts">
  export let label = "";
  export let value = "";
  export let options: string[] = [];
  export let required = false;
  export let name = "";
</script>

<label class="block mb-2 text-sm font-medium text-gray-700">
  {label}
  <select
    name={name}
    bind:value
    required={required}
    class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 
           text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
  >
    <option value="">Select...</option>
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
</label>
