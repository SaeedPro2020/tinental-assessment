<script lang="ts">
  import type { Student } from "$lib/types/student";
  import DataTable from "$lib/components/data-table/DataTable.svelte";
  import EllipsisIcon from "@lucide/svelte/icons/ellipsis";

  export let students: Student[] = [];

  // Return inline HTML for action menu
    function rowActions(student: Student) {
    return `
        <button class="p-2 rounded hover:bg-gray-100 float-right">
        ${EllipsisIcon.svg}
        </button>
    `;
    }


  const columns = [
    { header: "First Name", accessorKey: "firstName" },
    { header: "Last Name", accessorKey: "lastName" },
    { header: "Age", accessorKey: "age" },
    { header: "Class", accessorKey: "class" }
  ];
</script>

<DataTable data={students} {columns} {rowActions} />
