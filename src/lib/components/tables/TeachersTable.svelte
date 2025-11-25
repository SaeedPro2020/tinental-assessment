<script lang="ts">
  import type { Teacher } from "$lib/types/teacher";
  import DataTable from "$lib/components/data-table/DataTable.svelte";
  import EllipsisIcon from "@lucide/svelte/icons/ellipsis";

  export let teachers: Teacher[] = [];

    function rowActions(teacher: Teacher) {
    return `
        <button class="p-2 rounded hover:bg-gray-100 float-right">
        ${EllipsisIcon.svg}
        </button>
    `;
    }


  const columns = [
    { header: "First Name", accessorKey: "firstName" },
    { header: "Last Name", accessorKey: "lastName" },
    { header: "Subject", accessorKey: "subject" }
  ];
</script>

<DataTable data={teachers} {columns} {rowActions} />
