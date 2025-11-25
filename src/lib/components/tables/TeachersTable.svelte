<script lang="ts">
  import type { Teacher } from "$lib/types/teacher";
  import DataTable from "$lib/components/data-table/DataTable.svelte";
  export let teachers: Teacher[] = [];

    function rowActions(teacher: Teacher) {
    return `
        <button class="p-2 rounded hover:bg-gray-100 float-right">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="opacity-80">
          <circle cx="5" cy="12" r="2"></circle>
          <circle cx="12" cy="12" r="2"></circle>
          <circle cx="19" cy="12" r="2"></circle>
        </svg>
        </button>
    `;
    }


  const columns = [
    { header: "First Name", accessorKey: "firstName" },
    { header: "Last Name", accessorKey: "lastName" },
    { header: "Subject", accessorKey: "subject" }
  ];
</script>

<div {...$$restProps}>
  <DataTable data={teachers} {columns} {rowActions} />
</div>
