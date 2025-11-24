<script lang="ts">
  import AddTeacherForm from '$lib/components/forms/AddTeacherForm.svelte';
  import TeachersTable from '$lib/components/tables/TeachersTable.svelte';

  export let data;
</script>

<h1 class="text-2xl font-bold mb-6">Teachers</h1>

<AddTeacherForm />

<TeachersTable teachers={data.teachers} />
