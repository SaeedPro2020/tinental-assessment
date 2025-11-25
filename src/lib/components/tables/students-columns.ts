import type { ColumnDef } from "@tanstack/table-core";
import type { Student } from "$lib/types/student";
import { renderComponent } from "$lib/components/ui/data-table/render-helpers";
import DataTableCheckbox from "$lib/components/ui/data-table/data-table-checkbox.svelte";

export const studentColumns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) =>
      renderComponent(DataTableCheckbox, {
        checked: table.getIsAllPageRowsSelected(),
        indeterminate:
          table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
        ariaLabel: "Select all",
        onCheckedChange: (v: boolean) => table.toggleAllPageRowsSelected(!!v)
      }),
    cell: ({ row }) =>
      renderComponent(DataTableCheckbox, {
        checked: row.getIsSelected(),
        indeterminate: row.getIsSomeSelected() && !row.getIsSelected(),
        ariaLabel: `Select row ${row.index + 1}`,
        onCheckedChange: (v: boolean) => row.toggleSelected(!!v)
      }),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "firstName",
    header: "First Name"
  },
  {
    accessorKey: "lastName",
    header: "Last Name"
  },
  {
    accessorKey: "age",
    header: "Age"
  },
  {
    accessorKey: "class",
    header: "Class"
  }
];
