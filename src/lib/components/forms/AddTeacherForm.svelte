<script lang="ts">
  import { invalidate } from '$app/navigation';
  import { createEventDispatcher } from 'svelte';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';

  let firstName = "";
  let lastName = "";
  let subject = "";

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology",
    "History", "Geography", "Computer Science", "English"
  ];

  const dispatch = createEventDispatcher();

  async function submitForm() {
    const body = { firstName, lastName, subject };

    console.log('Submitting teacher:', body);

    const res = await fetch('/teachers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      // Invalidate so server-side loaders refresh
      await invalidate('app:teachers');
      await invalidate('/teachers');
      console.log('Invalidated app:teachers and /teachers');
      const data = await res.json().catch(() => null);
      if (data) {
        dispatch('created', data);
        console.log('Dispatched created event with:', data);
      }
      firstName = "";
      lastName = "";
      subject = "";
    }
  }
</script>

<Card class="p-6 mb-10 shadow-sm">
  <CardHeader>
    <CardTitle>Add Teacher</CardTitle>
  </CardHeader>

  <CardContent>
    <form on:submit|preventDefault={submitForm} class="space-y-6">

      <!-- FIRST NAME -->
      <div class="space-y-2">
        <Label>First Name</Label>
        <!-- Use the Input component's value binding directly -->
        <Input bind:value={firstName} class="input" />


      </div>


      <!-- LAST NAME -->
      <div class="space-y-2">
        <Label>Last Name</Label>
        <Input bind:value={lastName} class="input" />
      </div>

      <!-- SUBJECT -->
      <div class="space-y-2">
        <Label>Subject</Label>
        <select
          bind:value={subject}
          class="border rounded-md p-2 w-full"
          required
        >
          <option value="">Select</option>
          {#each subjects as s}
            <option value={s}>{s}</option>
          {/each}
        </select>
      </div>

      <Button type="submit" class="w-full">
        Add Teacher
      </Button>
    </form>
  </CardContent>
</Card>
