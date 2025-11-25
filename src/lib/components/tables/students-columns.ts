import type { ColumnDef } from "@tanstack/table-core";
import type { Student } from "$lib/types/student";

export const studentColumns: ColumnDef<Student>[] = [
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
