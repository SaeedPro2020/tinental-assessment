<script lang="ts">
  export let label = "";
  export let value = "";
  export let type: "text" | "number" = "text";
  export let placeholder = "";
  export let required = false;
  
  // forward events to parent (important)
  export let name = "";
</script>

<label class="block mb-2 text-sm font-medium text-gray-700">
  {label}
  <input
    name={name}
    type={type}
    bind:value
    placeholder={placeholder}
    required={required}
    class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 
           text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500"
  />
</label>
