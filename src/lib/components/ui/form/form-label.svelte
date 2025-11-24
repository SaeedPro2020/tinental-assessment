<script lang="ts">
  export let forId = "";
</script>

<label
  for={forId}
  class="text-sm font-medium text-gray-700"
>
  <slot />
</label>
