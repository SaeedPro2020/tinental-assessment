<script lang="ts">
  import AddStudentForm from '$lib/components/forms/AddStudentForm.svelte';
  import StudentsTable from '$lib/components/tables/StudentsTable.svelte';

  export let data;
</script>

<h1 class="text-2xl font-bold mb-6">Students</h1>

<AddStudentForm />

<StudentsTable students={data.students} />
