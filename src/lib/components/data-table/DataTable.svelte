<script lang="ts">
  import {
    type ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel
  } from "@tanstack/table-core";

  import {
    createSvelteTable,
    FlexRender
  } from "$lib/components/ui/data-table";

  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import * as Table from "$lib/components/ui/table";

  export let data: any[] = [];
  export let columns: ColumnDef<any>[] = [];

  let sorting = [];
  let pageIndex = 0;
  let pageSize = 10;
  let filterValue = "";

  const table = createSvelteTable({
    get data() {
      return data;
    },
    columns,
    state: {
      get sorting() {
        return sorting;
      },
      get pagination() {
        return { pageIndex, pageSize };
      }
    },
    onSortingChange: (fn) => {
      sorting = fn(sorting);
    },
    onPaginationChange: (fn) => {
      const next = fn({ pageIndex, pageSize });
      pageIndex = next.pageIndex;
      pageSize = next.pageSize;
    },

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });
</script>

<div class="flex items-center gap-4 py-4">
  <Input
    placeholder="Search..."
    bind:value={filterValue}
    class="max-w-xs"
  />

  <Button variant="outline" onclick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
    Prev
  </Button>

  <Button variant="outline" onclick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
    Next
  </Button>
</div>

<div class="rounded-md border">
  <Table.Root>
    <Table.Header>
      {#each table.getHeaderGroups() as headerGroup}
        <Table.Row>
          {#each headerGroup.headers as header}
            <Table.Head
            role="button"
            tabindex="0"
            on:click={header.column.getToggleSortingHandler()}
            >
            <FlexRender
                content={header.column.columnDef.header}
                context={header.getContext()}
            />
            </Table.Head>

          {/each}
        </Table.Row>
      {/each}
    </Table.Header>

    <Table.Body>
      {#each table.getRowModel().rows.filter(r =>
        JSON.stringify(r.original).toLowerCase().includes(filterValue.toLowerCase())
      ) as row}
        <Table.Row>
          {#each row.getVisibleCells() as cell}
            <Table.Cell>
              <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
            </Table.Cell>
          {/each}
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
