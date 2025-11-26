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

  // local helper map to bind CheckboxItem checked states (allows two-way binding)
  let colVisibility = $state<Record<string, boolean>>({});

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

  // Diagnostic logs: list available columns once and whenever columns prop changes
  $effect(() => {
    try {
      const cols = (table?.getAllColumns?.() || []).map((c: any) => ({ id: c.id, accessorKey: c.columnDef?.accessorKey }));
      console.log('DataTable columns available:', cols);
    } catch (e) {
      console.log('Error listing table columns', e);
    }
  });

  // Diagnostic: log columnFilters and other state changes
  $effect(() => {
    try {
      console.log('DataTable state snapshot:', {
        pagination,
        sorting,
        columnFilters,
        rowSelection,
        columnVisibility,
      });
    } catch (e) {
      console.log('Error logging state snapshot', e);
    }
  });

  // Diagnostic: whenever columnFilters changes, show filtered row count and an example row
  $effect(() => {
    try {
      console.log('columnFilters changed ->', columnFilters);
      const rows = table.getRowModel().rows || [];
      console.log('Rows after filter (count):', rows.length);
      if (rows.length > 0) console.log('First row preview:', rows[0]?.original);
    } catch (e) {
      console.log('Error during columnFilters diagnostic', e);
    }
  });

  // 🔥 Ensure table updates for columns too
  $effect(() => {
    console.log('DataTable $effect columns change');
    table.setOptions((prev) => ({
      ...prev,
      columns
    }));
    // sync local visibility map from table columns
    try {
      const map: Record<string, boolean> = {};
      (table.getAllColumns() || []).forEach((c: any) => (map[c.id] = !!c.getIsVisible()));
      colVisibility = map;
    } catch (e) {
      // ignore
    }
    setTimeout(() => {
      try {
        console.log('DataTable rows after columns update:', table.getRowModel().rows.length);
      } catch (e) {
        console.log('DataTable getRowModel error', e);
      }
    }, 0);
  });

  // Debugging + safe handler for filter input
  async function handleFilterInput(value: string) {
    try {
      let col = table.getColumn("firstName");
      if (!col) {
        // try to locate a column with accessorKey 'firstName' from the provided columns
        const fallback = (columns || []).find((c: any) => c.accessorKey === 'firstName' || c.id === 'firstName');
        if (fallback) {
          const id = (fallback.id ?? fallback.accessorKey) as string;
          col = table.getColumn(id as string);
        }
      }
      // As a last resort, pick the first visible accessor column (skip selection columns)
      if (!col) {
        const visible = table.getAllColumns().filter((c) => c.getIsVisible());
        const firstAccessor = visible.find((c) => !!c.columnDef.accessorKey || !!c.columnDef.accessorFn);
        if (firstAccessor) col = firstAccessor;
      }
      console.log('handleFilterInput called, column found:', !!col, 'value:', value);
      if (!col) return;
      // log previous filter value
      try {
        console.log('Previous column filterValue:', col.getFilterValue?.());
      } catch (e) {
        console.log('Could not read previous column filterValue', e);
      }

      // Set the filter
      col.setFilterValue(value);

      // allow the table to update, then log detailed state
      await tick();
      try {
        console.log('After setFilterValue -> table.getState().columnFilters:', table.getState().columnFilters);
      } catch (e) {
        console.log('Error reading table.getState().columnFilters', e);
      }

      try {
        console.log('Column filter value now:', col.getFilterValue?.());
      } catch (e) {
        console.log('Could not read column.getFilterValue after set', e);
      }

      try {
        const rows = table.getRowModel().rows || [];
        console.log('Filtered rows count after setFilterValue:', rows.length);
        console.log('Filtered rows firstName values:', rows.map((r: any) => r.original?.firstName));
      } catch (e) {
        console.log('Error reading row model after filter set', e);
      }
    } catch (e) {
      console.log('handleFilterInput error', e);
    }
  }

  // local search binding for the Input component (use $state for runes reactivity)
  let search = $state<string>((table.getColumn("firstName")?.getFilterValue() as string) ?? "");

  // react to search changes (user typing) and apply filter using $effect (runes mode)
  $effect(() => {
    if (typeof search === 'string') {
      const col = table.getColumn("firstName");
      const current = col ? (col.getFilterValue?.() as string) ?? "" : "";
      if (search !== current) {
        // fire filter handler
        handleFilterInput(search);
      }
    }
  });

  // Keep the colVisibility map in sync with the table's column visibility state
  $effect(() => {
    try {
      const cols = table.getAllColumns() || [];
      const map: Record<string, boolean> = {};
      cols.forEach((c: any) => (map[c.id] = !!c.getIsVisible()));
      colVisibility = map;
    } catch (e) {
      // ignore
    }
  });

  // When the local colVisibility map changes, push visibility updates into the table
  $effect(() => {
    try {
      const cols = table.getAllColumns() || [];
      cols.forEach((c: any) => {
        const desired = !!colVisibility[c.id];
        if (typeof c.getIsVisible === 'function' && c.getIsVisible() !== desired) {
          c.toggleVisibility(desired);
        }
      });
    } catch (e) {
      // ignore
    }
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
          bind:value={search}
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
                class="inline-flex items-center rounded-lg h-10 px-3 py-2 bg-card border border-input text-card-foreground shadow-sm"
              >
                <span class="leading-none">Columns</span>
                <ChevronDownIcon class="ml-2 h-4 w-4" />
              </button>
            {/snippet}
          </DropdownMenu.Trigger>

          <DropdownMenu.Content align="end" class="bg-card text-card-foreground">
            {#each table.getAllColumns().filter((c) => c.getCanHide()) as column (column.id)}
              <DropdownMenu.CheckboxItem
                class="capitalize"
                bind:checked={colVisibility[column.id]}
              >
                <div style="width:1.3rem;"></div>
                <span class="ml-2">{column.columnDef?.header ?? column.id}</span>
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

            <!-- Actions Column removed: action HTML will no longer be appended to every row.
                 If you want per-row actions, add a dedicated column in your columns definition
                 that renders the action button/snippet. -->
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

 <div style="height:2rem;"></div>

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
          class="inline-flex items-center rounded-lg bg-card text-card-foreground shadow-sm text-sm disabled:opacity-50 disabled:pointer-events-none"
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
          class="inline-flex items-center rounded-lg bg-card text-card-foreground shadow-sm text-sm disabled:opacity-50 disabled:pointer-events-none"
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
