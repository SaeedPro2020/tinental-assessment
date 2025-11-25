<script lang="ts">
  import AddStudentForm from '$lib/components/forms/AddStudentForm.svelte';
  import StudentsTable from '$lib/components/tables/StudentsTable.svelte';

  export let data;

  // Keep a local reactive students array so we can append newly created students
  // immediately when the form emits a 'created' event.
  let students = data.students ?? [];

  function handleCreated(event) {
    const created = event.detail;
    if (created) students = [...students, created];
    console.log('handleCreated received:', created);
    console.log('students now:', students);
  }
</script>

<h1 class="text-2xl font-bold mb-6">Students</h1>

<div class="mb-16">
  <AddStudentForm on:created={handleCreated} />
</div>

{#key students.length}
  <StudentsTable students={students} class="mt-16" />
{/key}
