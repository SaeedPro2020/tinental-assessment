<script lang="ts">
  import AddTeacherForm from '$lib/components/forms/AddTeacherForm.svelte';
  import TeachersTable from '$lib/components/tables/TeachersTable.svelte';

  export let data;
  let teachers = data.teachers ?? [];

  function handleCreated(event) {
    const created = event.detail;
    if (created) teachers = [...teachers, created];
    console.log('teachers handleCreated received:', created);
    console.log('teachers now:', teachers);
  }
</script>

<h1 class="text-2xl font-bold mb-6">Teachers</h1>

<AddTeacherForm on:created={handleCreated} />

{#key teachers.length}
  <TeachersTable teachers={teachers} />
{/key}
