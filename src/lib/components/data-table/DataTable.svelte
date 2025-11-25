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
  import { tick } from 'svelte';

  // ✅ Runes-based props
  const { data, columns, rowActions } = $props<{
    data: any[];
    columns: ColumnDef<any>[];
    rowActions?: (row: any) => string | null;
  }>();

  // Table state
  // show 5 rows per page by default
  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 5 });
  let sorting = $state<SortingState>([]);
  let columnFilters = $state<ColumnFiltersState>([]);
  let rowSelection = $state<RowSelectionState>({});
  let columnVisibility = $state<VisibilityState>({});

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

    // Map any internal table state changes back into our local reactive vars
    onStateChange: (updater) => {
      // helper to apply possibly-functional updater
      const apply = (current: any, upd: any) => (typeof upd === 'function' ? upd(current) : upd ?? current);

      if (typeof updater === 'function') {
        const next = updater({ pagination, sorting, columnFilters, rowSelection, columnVisibility });
        pagination = next.pagination ?? pagination;
        sorting = next.sorting ?? sorting;
        columnFilters = next.columnFilters ?? columnFilters;
        rowSelection = next.rowSelection ?? rowSelection;
        columnVisibility = next.columnVisibility ?? columnVisibility;
      } else if (updater && typeof updater === 'object') {
        pagination = updater.pagination ?? pagination;
        sorting = updater.sorting ?? sorting;
        columnFilters = updater.columnFilters ?? columnFilters;
        rowSelection = updater.rowSelection ?? rowSelection;
        columnVisibility = updater.columnVisibility ?? columnVisibility;
      }
    },

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
  <!-- Fixed-size centered container -->
  <div class="rounded-lg border border-gray-300 mx-auto p-4 overflow-hidden" style="width:820px; height:570px; border-color:#D1D5DB !important; border-radius:6px;">
  <!-- Spacer to separate top border from search bar -->
  <div style="height:3rem;"></div>
  <!-- Search bar -->
  <div class="flex items-center py-2 mb-6">
  <div class="mx-auto w-full max-w-[40rem] flex items-center justify-between">
      <!-- Left: search input (aligned with table left edge) -->
      <div class="w-full max-w-[24rem]">
        <Input
          data-slot="search-input"
          placeholder="Filter Students..."
          value={
            (table.getColumn(columns[0].accessorKey)?.getFilterValue() as string) ??
            ""
          }
          on:input={(e) =>
            table.getColumn(columns[0].accessorKey)?.setFilterValue(
              e.currentTarget.value
            )
          }
          class="w-full h-8"
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
  <!-- TEMP: spacer to force visible vertical gap while debugging -->
  <div style="height:2rem"></div>
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

  <!-- Pagination (moved inside table container and aligned right) -->
  <div class="flex items-center justify-end gap-x-6 pt-4">
  <!-- Page indicator -->
  <div class="text-sm text-muted-foreground">
          {#key pagination}
            {@const pageCount = table.getPageCount ? table.getPageCount() : Math.max(1, Math.ceil(((data || []).length || 0) / (pagination.pageSize || 1)))}
            Page {Math.max(1, (pagination.pageIndex ?? 0) + 1)} of {pageCount}
          {/key}
        </div>
        <div style="width:2rem;"></div>
        <button
          class="inline-flex items-center rounded-lg bg-white text-black shadow-sm text-sm disabled:opacity-50 disabled:pointer-events-none"
          style="background:#fff;color:#000;min-height:32px;padding-left:12px;padding-right:12px;border-radius:8px"
          onclick={async () => {
              try {
                const current = table.getState().pagination?.pageIndex ?? 0;
                console.log('Previous clicked', { current, canPrev: table.getCanPreviousPage() });
                // let the table core perform its internal update
                table.previousPage();
                // wait a tick so table state has settled and Svelte can update
                await tick();
                // sync local pagination from table's state
                const tbState = table.getState().pagination ?? {};
                pagination = { ...pagination, pageIndex: tbState.pageIndex ?? pagination.pageIndex };
                console.log('After previousPage synced pagination', pagination, 'rowsOnPage', table.getRowModel().rows.length);
              } catch (e) {
                console.log('Previous click error', e);
              }
            }}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>

        <button
          class="inline-flex items-center rounded-lg bg-white text-black shadow-sm text-sm disabled:opacity-50 disabled:pointer-events-none"
          style="background:#fff;color:#000;min-height:32px;padding-left:12px;padding-right:12px;border-radius:8px"
          onclick={async () => {
              try {
                const current = table.getState().pagination?.pageIndex ?? 0;
                const pageSize = table.getState().pagination?.pageSize ?? pagination.pageSize ?? 5;
                const totalRows = (data || []).length || 0;
                const pageCountMethod = typeof table.getPageCount === 'function' ? table.getPageCount() : undefined;
                const pageCountFallback = Math.max(1, Math.ceil(totalRows / (pageSize || 1)));
                const pageCount = pageCountMethod ?? pageCountFallback;
                const attempted = current + 1;
                const newIndex = Math.min(pageCount - 1, attempted);
                console.log('Next clicked', { current, attempted, newIndex, canNext: table.getCanNextPage(), pageCountMethod, pageCountFallback, pageCount, pageSize, totalRows });

                // let the table core advance
                table.nextPage();
                // wait a tick to allow state to settle
                await tick();
                // sync local pagination from table's state
                const tbState = table.getState().pagination ?? {};
                pagination = { ...pagination, pageIndex: tbState.pageIndex ?? pagination.pageIndex };
                console.log('After nextPage synced pagination', pagination, 'rowsOnPage', table.getRowModel().rows.length);
              } catch (e) {
                console.log('Next click error', e);
              }
            }}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>

    </div>
  </div>
  </div>
</div>
