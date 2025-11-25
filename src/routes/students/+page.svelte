<script lang="ts">
  import StudentsTable from '$lib/components/tables/StudentsTable.svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';

  export let data;

  // Keep a local reactive students array so we can append newly created students
  // immediately when the form emits a 'created' event.
  let students = data.students ?? [];

  let dialogOpen = false;
  // local form state for the inline dialog
  let firstName = '';
  let lastName = '';
  let age: number | '' = '';
  let className = '';

  async function saveStudent() {
    const body = { firstName, lastName, age: age === '' ? null : Number(age), class: className };
    console.log('Saving student', body);
    const res = await fetch('/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && data) {
      students = [...students, data];
      // reset form
      firstName = '';
      lastName = '';
      age = '';
      className = '';
      dialogOpen = false;
      console.log('Student saved', data);
    } else {
      console.error('Failed to save student', data);
    }
  }

  function handleCreated(event) {
    const created = event.detail;
    if (created) students = [...students, created];
    console.log('handleCreated received:', created);
    console.log('students now:', students);
  }

  // Debug: log when dialogOpen changes to see if Trigger is toggling it
  $: console.log('dialogOpen state:', dialogOpen);
</script>
<h1 class="text-2xl font-bold mb-6">Students</h1>

<div class="flex justify-center mb-6">
  <Dialog.Root bind:open={dialogOpen}>
    <Dialog.Trigger
      className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      on:click={() => { console.log('Dialog.Trigger clicked'); dialogOpen = true; }}
    >
      Add Student
    </Dialog.Trigger>
    <Dialog.Content open={dialogOpen} onClose={() => (dialogOpen = false)} class="sm:max-w-[425px]">

      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="first" class="text-end">First Name</Label>
          <Input id="first" class="col-span-3" bind:value={firstName} />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="last" class="text-end">Last Name</Label>
          <Input id="last" class="col-span-3" bind:value={lastName} />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="age" class="text-end">Age</Label>
          <Input id="age" type="number" class="col-span-3" bind:value={age} />
        </div>
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="class" class="text-end">Class</Label>
          <select id="class" class="col-span-3 border rounded-md p-2" bind:value={className}>
            <option value="">Select</option>
            {#each ['1A','2A','3A','4A','5A','1B','2B','3B'] as opt}
              <option value={opt}>{opt}</option>
            {/each}
          </select>
        </div>
      </div>

      <Dialog.Footer>
        <button class="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground" on:click={saveStudent}>Save</button>
        <button class="inline-flex items-center rounded-md border px-4 py-2 text-sm ml-2" on:click={() => (dialogOpen = false)}>Cancel</button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>

{#key students.length}
  <div class="flex justify-center mt-12">
    <div class="w-full max-w-6xl">
      <StudentsTable students={students} />
    </div>
  </div>
{/key}
