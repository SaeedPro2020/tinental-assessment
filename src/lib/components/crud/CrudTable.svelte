<script lang="ts">
  import DataTable from "$lib/components/data-table/DataTable.svelte";
  import type { ColumnDef } from "@tanstack/table-core";

  export let columns: { id: string; label: string }[] = [];
  export let data: any[] = [];

  // Map simple column defs to TanStack ColumnDef shape expected by DataTable
  $: mapped = (columns || []).map((c) => ({
    id: c.id,
    accessorKey: c.id,
    header: c.label,
    cell: (ctx) => ctx.getValue(),
  })) as ColumnDef<any>[];
</script>

<div>
  <DataTable {data} columns={mapped} />
</div>
