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

<div class="flex justify-center mb-12">
  <Dialog.Root bind:open={dialogOpen}>
    <Dialog.Trigger on:click={() => { console.log('Dialog.Trigger clicked'); dialogOpen = true; }}>
      <Button size="lg" class="bg-white text-black rounded-lg text-base" style="background:#fff;color:#000;min-height:44px;padding-left:18px;padding-right:18px;border-radius:8px">Add Student</Button>
    </Dialog.Trigger>
    <Dialog.Content open={dialogOpen} onClose={() => (dialogOpen = false)} class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Please add your student</Dialog.Title>
        <Dialog.Description>
          Make changes to table here. Click save when you're done.
        </Dialog.Description>
      </Dialog.Header>

  <div class="grid gap-y-6 gap-x-4 py-8 border-none" style="border: none;">
        <div class="grid grid-cols-4 items-center gap-4 mb-4" style="margin-bottom:16px !important;">
          <Label for="first" class="text-end" style="margin-left:1.2rem;">First Name</Label>
          <Input id="first" class="col-span-3 max-w-[22rem] ml-6" bind:value={firstName} style="border-radius:0.5rem;margin-left:1rem;padding:0.5rem 0.75rem;box-shadow:0 1px 2px rgba(16,24,40,0.04);" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4 mb-4" style="margin-bottom:16px !important;">
          <Label for="last" class="text-end" style="margin-left:1.2rem;">Last Name</Label>
          <Input id="last" class="col-span-3 max-w-[22rem] ml-6" bind:value={lastName} style="border-radius:0.5rem;margin-left:1rem;padding:0.5rem 0.75rem;box-shadow:0 1px 2px rgba(16,24,40,0.04);" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4 mb-4" style="margin-bottom:16px !important;">
          <Label for="age" class="text-end" style="margin-left:1.2rem;">Age</Label>
          <Input id="age" type="number" class="col-span-3 max-w-[12rem] ml-6" bind:value={age} style="border-radius:0.5rem;margin-left:1rem;padding:0.5rem 0.75rem;box-shadow:0 1px 2px rgba(16,24,40,0.04);" />
        </div>
        <div class="grid grid-cols-4 items-center gap-4 mb-4" style="margin-bottom:16px !important;">
          <Label for="class" class="text-end" style="margin-left:1.2rem;">Class</Label>
          <select id="class" bind:value={className} class="col-span-3 bg-background border-input shadow-sm h-10 min-w-0 max-w-[12rem] ml-6 rounded-lg px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/60 focus-visible:ring-2 focus-visible:shadow-md" style="border-radius:0.5rem;margin-left:1rem;padding:0.5rem 0.75rem;box-shadow:0 1px 2px rgba(16,24,40,0.04);">
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
          <Button size="lg" class="bg-black text-white rounded-lg text-base" style="background:#000;color:#fff;min-height:44px;padding-left:18px;padding-right:18px;border-radius:8px" on:click={saveStudent}>Save changes</Button>
        </div>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>

<!-- Spacer to guarantee visual separation between the add-student area and the table -->
<div style="height:2rem;"></div>

{#key students.length}
  <div class="flex justify-center mt-12">
    <div class="w-full max-w-6xl">
      <StudentsTable students={students} />
    </div>
  </div>
{/key}
