<script lang="ts">
  import StudentsTable from '$lib/components/tables/StudentsTable.svelte';
  import * as Dialog from '$lib/components/ui/dialog';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';

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

<div class="flex flex-col items-center mb-20">
  <Dialog.Root bind:open={dialogOpen}>
    <Dialog.Trigger on:click={() => { console.log('Dialog.Trigger clicked'); dialogOpen = true; }}>
    <Button size="lg" class="bg-white text-black rounded-lg mx-auto">Add Student</Button>
      </Dialog.Trigger>
    <Dialog.Content open={dialogOpen} onClose={() => (dialogOpen = false)} class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Please add your student</Dialog.Title>
        <Dialog.Description>
          Make changes to table here. Click save when you're done.
        </Dialog.Description>
      </Dialog.Header>

  <div class="grid gap-y-6 gap-x-4 py-8 border-none">
        <div class="grid grid-cols-4 items-center gap-4 mb-4">
          <Label for="first" class="text-end">First Name</Label>
          <Input id="first" class="col-span-3 max-w-[28rem] ml-6" bind:value={firstName} />
        </div>
        <div class="grid grid-cols-4 items-center gap-4 mb-4">
          <Label for="last" class="text-end">Last Name</Label>
          <Input id="last" class="col-span-3 max-w-[28rem] ml-6" bind:value={lastName} />
        </div>
        <div class="grid grid-cols-4 items-center gap-4 mb-4">
          <Label for="age" class="text-end">Age</Label>
          <Input id="age" type="number" class="col-span-3 max-w-[12rem] ml-6" bind:value={age} />
        </div>
        <div class="grid grid-cols-4 items-center gap-4 mb-4">
          <Label for="class" class="text-end">Class</Label>
          <select id="class" bind:value={className} class="col-span-3 bg-background border-input shadow-sm h-10 min-w-0 max-w-[12rem] ml-6 rounded-lg px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/60 focus-visible:ring-2 focus-visible:shadow-md">
            <option value="">Select</option>
            {#each ['1A','2A','3A','4A','5A','1B','2B','3B'] as opt}
              <option value={opt}>{opt}</option>
            {/each}
          </select>
        </div>
      </div>

      <Dialog.Footer>
        <!-- Footer: inline row, right aligned -->
        <div class="flex justify-end items-center mt-12">
          <Button size="lg" variant="primary-dark" class="bg-black text-white rounded-lg" on:click={saveStudent}>Save changes</Button>
        </div>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>

<!-- Explicit spacer to guarantee visual separation between Add Student area and table/search -->
<div aria-hidden="true" style="height:40px;"></div>

{#key students.length}
  <div class="flex justify-center" style="margin-top:40px;">
    <div class="w-full max-w-6xl">
      <StudentsTable students={students} />
    </div>
  </div>
{/key}
