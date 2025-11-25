<script lang="ts">
  import {
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type ColumnDef,
    type PaginationState,
    type SortingState,
    type ColumnFiltersState,
    type VisibilityState,
    type RowSelectionState
  } from "@tanstack/table-core";

  import {
    FlexRender,
    createSvelteTable
  } from "$lib/components/ui/data-table";

  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import * as Table from "$lib/components/ui/table";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";

  // ✅ Runes-based props
  const { data, columns, rowActions } = $props<{
    data: any[];
    columns: ColumnDef<any>[];
    rowActions?: (row: any) => string | null;
  }>();

  // Table state
  let pagination: PaginationState = { pageIndex: 0, pageSize: 10 };
  let sorting: SortingState = [];
  let columnFilters: ColumnFiltersState = [];
  let rowSelection: RowSelectionState = {};
  let columnVisibility: VisibilityState = {};

  // Create SvelteTable
    const table = createSvelteTable({
    get data() {
        return data;
    },
    get columns() {
        return columns;
    },

    state: {
        get pagination() {
        return pagination;
        },
        get sorting() {
        return sorting;
        },
        get columnFilters() {
        return columnFilters;
        },
        get rowSelection() {
        return rowSelection;
        },
        get columnVisibility() {
        return columnVisibility;
        }
    },

    onPaginationChange: (updater) =>
        pagination =
        typeof updater === "function" ? updater(pagination) : updater,

    onSortingChange: (updater) =>
        sorting =
        typeof updater === "function" ? updater(sorting) : updater,

    onColumnFiltersChange: (updater) =>
        columnFilters =
        typeof updater === "function" ? updater(columnFilters) : updater,

    onColumnVisibilityChange: (updater) =>
        columnVisibility =
        typeof updater === "function" ? updater(columnVisibility) : updater,

    onRowSelectionChange: (updater) =>
        rowSelection =
        typeof updater === "function" ? updater(rowSelection) : updater,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel()
    });


  // 🔥 Whenever parent updates `data`, refresh table
  $effect(() => {
    console.log('DataTable $effect data change, new data length:', data?.length);
    table.setOptions((prev) => ({
      ...prev,
      data
    }));
    // debug: log row count after a tick
    setTimeout(() => {
      try {
        console.log('DataTable rows after data update:', table.getRowModel().rows.length);
      } catch (e) {
        console.log('DataTable getRowModel error', e);
      }
    }, 0);
  });

  // 🔥 Ensure table updates for columns too
  $effect(() => {
    console.log('DataTable $effect columns change');
    table.setOptions((prev) => ({
      ...prev,
      columns
    }));
    setTimeout(() => {
      try {
        console.log('DataTable rows after columns update:', table.getRowModel().rows.length);
      } catch (e) {
        console.log('DataTable getRowModel error', e);
      }
    }, 0);
  });
</script>


<div class="w-full">
  <!-- Search bar -->
  <div class="flex items-center py-4 mb-4">
    <div class="mx-auto w-full max-w-[40rem] flex items-center justify-between">
      <!-- Left: search input (aligned with table left edge) -->
      <div class="w-full max-w-[24rem]">
        <Input
          placeholder="Search..."
          value={
            (table.getColumn(columns[0].accessorKey)?.getFilterValue() as string) ??
            ""
          }
          on:input={(e) =>
            table.getColumn(columns[0].accessorKey)?.setFilterValue(
              e.currentTarget.value
            )
          }
          class="w-full mb-2"
        />
      </div>

      <!-- Right: Columns dropdown -->
      <div class="pl-4">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <button
                {...props}
                type="button"
                class="inline-flex items-center rounded-lg h-10 px-3 py-2 bg-background border border-input text-black shadow-sm"
              >
                <span class="leading-none">Columns</span>
                <ChevronDownIcon class="ml-2 h-4 w-4" />
              </button>
            {/snippet}
          </DropdownMenu.Trigger>

          <DropdownMenu.Content align="end">
            {#each table.getAllColumns().filter((c) => c.getCanHide()) as column (column.id)}
              <DropdownMenu.CheckboxItem
                class="capitalize"
                checked={column.getIsVisible()}
                on:checkedChange={(v) => column.toggleVisibility(!!v)}
              >
                {column.id}
              </DropdownMenu.CheckboxItem>
            {/each}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  </div>

  <!-- TABLE -->
  <div class="mt-8">
  <div class="mx-auto w-full max-w-[40rem]">
      <Table.Root>
      <Table.Header>
        {#each table.getHeaderGroups() as headerGroup}
          <Table.Row>
            {#each headerGroup.headers as header}
              <Table.Head>
                {#if !header.isPlaceholder}
                  <FlexRender
                    content={header.column.columnDef.header}
                    context={header.getContext()}
                  />
                {/if}
              </Table.Head>
            {/each}
          </Table.Row>
        {/each}
      </Table.Header>

  <Table.Body>
        {#each table.getRowModel().rows as row}
          <Table.Row>
            {#each row.getVisibleCells() as cell}
              <Table.Cell>
                <FlexRender
                  content={cell.column.columnDef.cell}
                  context={cell.getContext()}
                />
              </Table.Cell>
            {/each}

            <!-- Actions Column -->
            {#if rowActions}
              <Table.Cell class="text-right">
                {@html rowActions(row.original)}
              </Table.Cell>
            {/if}
          </Table.Row>
        {:else}
          <Table.Row>
            <Table.Cell colspan={columns.length + (rowActions ? 1 : 0)} class="h-24 text-center">
              No results.
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
      </Table.Root>
    </div>
  </div>

  <!-- Pagination -->
  <div class="flex justify-end space-x-2 pt-4">
    <Button
      variant="outline"
      size="sm"
      on:click={() => table.previousPage()}
      disabled={!table.getCanPreviousPage()}
    >
      Previous
    </Button>

    <Button
      variant="outline"
      size="sm"
      on:click={() => table.nextPage()}
      disabled={!table.getCanNextPage()}
    >
      Next
    </Button>
  </div>
</div>
