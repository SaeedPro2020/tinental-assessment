<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { invalidate } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';
  import * as Card from '$lib/components/ui/card';

  const dispatch = createEventDispatcher();

  let firstName = '';
  let lastName = '';
  let age: number | '' = '';
  let className = '';

  const classOptions = ['1A','2A','3A','4A','5A','1B','2B','3B'];

  export let onClose: () => void = () => {};

  async function submitForm() {
    const body = {
      firstName,
      lastName,
      age: age === '' ? null : Number(age),
      class: className
    };

    const res = await fetch('/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json().catch(() => null);
    if (res.ok) {
      await invalidate('app:students');
      await invalidate('/students');
      if (data) dispatch('created', data);
      // reset fields
      firstName = '';
      lastName = '';
      age = '';
      className = '';
      onClose();
    }
  }

  import { onMount } from 'svelte';
  onMount(() => {
    console.log('StudentCardForm mounted');
  });
</script>

<div class="w-full flex justify-center">
  <div class="bg-card border rounded-lg p-4 shadow-md w-full max-w-md">
    <Card.Root class="w-full bg-card text-card-foreground">
  <Card.Header>
    <Card.Action>
      <button type="button" class="text-sm underline text-muted-foreground" on:click={onClose}>Close</button>
    </Card.Action>
  </Card.Header>

  <Card.Content>
    <form on:submit|preventDefault={submitForm} class="flex flex-col gap-6">
      <div class="grid gap-2">
        <Label for="first">First Name</Label>
        <Input id="first" bind:value={firstName} required />
      </div>

      <div class="grid gap-2">
        <Label for="last">Last Name</Label>
        <Input id="last" bind:value={lastName} required />
      </div>

      <div class="grid gap-2">
        <Label for="age">Age</Label>
        <Input id="age" type="number" bind:value={age} required />
      </div>

      <div class="grid gap-2">
        <Label for="class">Class</Label>
        <select id="class" bind:value={className} class="w-full bg-background border-input shadow-sm h-10 min-w-0 rounded-lg px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/60 focus-visible:ring-2 focus-visible:shadow-md" required>
          <option value="">Select</option>
          {#each classOptions as opt}
            <option value={opt}>{opt}</option>
          {/each}
        </select>
      </div>

    </form>
  </Card.Content>

  <Card.Footer class="flex-col gap-2">
    <button
      type="button"
      class="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      on:click={submitForm}
    >
      Add
    </button>
    <button
      type="button"
      class="w-full inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm"
      on:click={onClose}
    >
      Cancel
    </button>
  </Card.Footer>
    </Card.Root>
  </div>
</div>
