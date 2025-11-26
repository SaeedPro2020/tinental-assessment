<script lang="ts">
  /**
   * Thin adapter that maps a simple column descriptor to the TanStack
   * ColumnDef shape expected by the DataTable component.
   */
  import DataTable from "$lib/components/data-table/DataTable.svelte";
  import type { ColumnDef } from "@tanstack/table-core";

  type ColumnSimple = { id: string; label: string };

  export let columns: ColumnSimple[] = [];
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
