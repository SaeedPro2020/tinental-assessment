<script lang="ts">
  import { invalidate } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Card, CardContent } from '$lib/components/ui/card';

  let firstName = "";
  let lastName = "";
  let age: number | "" = "";
  let className = "";

  const classOptions = ["1A", "2A", "3A", "4A", "5A", "1B", "2B", "3B"];

  async function submitForm() {
    console.log("SUBMIT FORM CALLED");
    const body = {
      firstName,
      lastName,
      age: age === "" ? null : Number(age),
      class: className
    };

    console.log("Sending:", body);

    const res = await fetch('/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    console.log("Response:", res.status);
    const data = await res.json().catch(() => null);
    console.log("Response JSON:", data);

    if (res.ok) {
      await invalidate('students:load');

      firstName = "";
      lastName = "";
      age = "";
      className = "";
    }
  }
</script>

<Card class="p-6 mb-10 shadow-sm">

  <!-- WRAP EVERYTHING IN A FORM -->
  <form on:submit|preventDefault={submitForm} class="space-y-6">

    <div class="space-y-2">
      <Label>First Name</Label>
      <Input bind:value={firstName} required />
    </div>

    <div class="space-y-2">
      <Label>Last Name</Label>
      <Input bind:value={lastName} required />
    </div>

    <div class="space-y-2">
      <Label>Age</Label>
      <Input type="number" bind:value={age} required />
    </div>

    <div class="space-y-2">
      <Label>Class</Label>
      <select
        bind:value={className}
        class="border rounded-md p-2 w-full"
        required
      >
        <option value="">Select</option>
        {#each classOptions as opt}
          <option value={opt}>{opt}</option>
        {/each}
      </select>
    </div>

    <Button type="submit" class="w-full">
      Add Student
    </Button>

  </form>

</Card>
