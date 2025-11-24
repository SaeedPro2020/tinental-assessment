<script lang="ts">
  import type { Student } from '$lib/types/student';
  import {
    Table, TableHeader, TableRow, TableHead,
    TableBody, TableCell
  } from '$lib/components/ui/table';

  export let students: Student[] = [];
</script>

<Table class="shadow-sm border rounded-md">
  <TableHeader>
    <TableRow>
      <TableHead>First Name</TableHead>
      <TableHead>Last Name</TableHead>
      <TableHead>Age</TableHead>
      <TableHead>Class</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {#each students as s}
      <TableRow>
        <TableCell>{s.firstName}</TableCell>
        <TableCell>{s.lastName}</TableCell>
        <TableCell>{s.age}</TableCell>
        <TableCell>{s.class}</TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>
