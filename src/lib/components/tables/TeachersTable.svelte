<script lang="ts">
  import type { Teacher } from '$lib/types/teacher';
  import {
    Table, TableHeader, TableRow, TableHead,
    TableBody, TableCell
  } from '$lib/components/ui/table';

  export let teachers: Teacher[] = [];
</script>

<Table class="shadow-sm border rounded-md">
  <TableHeader>
    <TableRow>
      <TableHead>First Name</TableHead>
      <TableHead>Last Name</TableHead>
      <TableHead>Subject</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {#each teachers as t}
      <TableRow>
        <TableCell>{t.firstName}</TableCell>
        <TableCell>{t.lastName}</TableCell>
        <TableCell>{t.subject}</TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>
