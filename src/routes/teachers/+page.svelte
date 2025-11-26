<script lang="ts">
  import CrudPage from '$lib/components/crud/CrudPage.svelte';
  export let data;

  // local reactive list so we can append newly created teachers immediately
  let teachers = data.teachers ?? [];

  const columns = [
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'subject', label: 'Subject' }
  ];

  const formFields = [
    { id: 'firstName', label: 'First Name', type: 'text' },
    { id: 'lastName', label: 'Last Name', type: 'text' },
    { id: 'subject', label: 'Subject', type: 'text' }
  ];

  async function onCreate(formData: any) {
    const res = await fetch('/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return res.ok;
  }
</script>

<CrudPage
  title="Teachers table"
  addButtonLabel="Add Teacher"
  {columns}
  {formFields}
  data={teachers}
  {onCreate}
  on:created={(e) => { const created = e.detail; if (created) teachers = [...teachers, created]; }}
  addButtonAlign="center"
/>
