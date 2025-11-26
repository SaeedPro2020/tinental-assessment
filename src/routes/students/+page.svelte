<script lang="ts">
  import CrudPage from '$lib/components/crud/CrudPage.svelte';
  export let data;
  // local reactive list so we can append newly created students immediately
  let students = data.students ?? [];

  const columns = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'age', label: 'Age' },
    { id: 'class', label: 'Class' }
  ];

  const formFields = [
    { id: 'firstName', label: 'First Name', type: 'text' },
    { id: 'lastName', label: 'Last Name', type: 'text' },
    { id: 'age', label: 'Age', type: 'number' },
    { id: 'class', label: 'Class', type: 'select', options: ['1A', '2A', '3A', '4A', '5A', '1B', '2B', '3B'] }
  ];

  async function onCreate(formData: any) {
    const res = await fetch('/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    // optimistic update handled by parent component listening to created event
    return res.ok;
  }
</script>

<CrudPage
  title="Students table"
  addButtonLabel="Add Student"
  {columns}
  {formFields}
  data={students}
  {onCreate}
  on:created={(e) => { const created = e.detail; if (created) students = [...students, created]; }}
  addButtonAlign="center"
/>
