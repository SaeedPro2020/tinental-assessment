<script lang="ts">
  import type { Student } from "$lib/types/student";
  import DataTable from "$lib/components/data-table/DataTable.svelte";
  import { studentColumns } from "$lib/components/tables/students-columns";
  export let students: Student[] = [];

  // Return inline HTML for action menu
    function rowActions(student: Student) {
    return `
        <button class="p-2 rounded hover:bg-gray-100 float-right">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="opacity-80">
          <circle cx="5" cy="12" r="2"></circle>
          <circle cx="12" cy="12" r="2"></circle>
          <circle cx="19" cy="12" r="2"></circle>
        </svg>
        </button>
    `;
    }
</script>

<div {...$$restProps}>
  <DataTable data={students} columns={studentColumns} {rowActions} />
</div>
