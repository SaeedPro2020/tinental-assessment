<script lang="ts">
  import DataTable from "$lib/components/data-table/DataTable.svelte";
  import type { Teacher } from "$lib/types/teacher";

  export let teachers: Teacher[] = [];

  const columns = [
    { header: "First Name", accessorKey: "firstName" },
    { header: "Last Name", accessorKey: "lastName" },
    { header: "Subject", accessorKey: "subject" }
  ];
</script>

<DataTable data={teachers} columns={columns} />
