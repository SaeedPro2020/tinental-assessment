import type { ColumnDef } from "@tanstack/table-core";
import type { Teacher } from "$lib/types/teacher";

export const teacherColumns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "firstName",
    header: "First Name"
  },
  {
    accessorKey: "lastName",
    header: "Last Name"
  },
  {
    accessorKey: "subject",
    header: "Subject"
  }
];
