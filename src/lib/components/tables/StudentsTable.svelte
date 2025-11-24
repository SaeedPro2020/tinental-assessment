<script lang="ts">
  import DataTable from "$lib/components/data-table/DataTable.svelte";
  import type { Student } from "$lib/types/student";

  export let students: Student[];
  
  const columns = [
    { header: "First Name", accessorKey: "firstName" },
    { header: "Last Name", accessorKey: "lastName" },
    { header: "Age", accessorKey: "age" },
    { header: "Class", accessorKey: "class" }
  ];
</script>

<DataTable data={students} columns={columns} />
