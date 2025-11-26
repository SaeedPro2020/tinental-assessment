<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Button } from "$lib/components/ui/button";
  import { createEventDispatcher } from 'svelte';

  export let formFields: { id: string; label: string; type: string; options?: string[] }[] = [];
  export let addButtonLabel = 'Add';
  export let onCreate: (form: any) => Promise<void>;

  const dispatch = createEventDispatcher();

  let open = false;
  // build a reactive form object
  let form: Record<string, any> = {};

  $: if (formFields) {
    formFields.forEach((f) => {
      if (!(f.id in form)) form[f.id] = '';
    });
  }

  async function submit() {
    if (typeof onCreate === 'function') {
      try {
        await onCreate(form);
        // dispatch created event for parent pages that listen
        dispatch('created', form);
      } catch (e) {
        console.error('onCreate error', e);
      }
    }
    // reset and close
    form = {};
    formFields.forEach((f) => (form[f.id] = ''));
    open = false;
  }
</script>

<Dialog.Root bind:open={open}>
  <Dialog.Trigger>
    <Button size="lg" class="bg-primary text-primary-foreground rounded-lg text-base" style="background:#fff;color:#000;min-height:44px;padding-left:18px;padding-right:18px;border-radius:8px">{addButtonLabel}</Button>
  </Dialog.Trigger>

  <Dialog.Content open={open} onClose={() => (open = false)} class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>{addButtonLabel}</Dialog.Title>
      <Dialog.Description>
        Fill the form and submit.
      </Dialog.Description>
    </Dialog.Header>

    <div class="grid gap-y-4 py-4">
      {#each formFields as field}
        <div class="grid grid-cols-4 items-center gap-4 mb-4" style="margin-bottom:16px !important;">
          <Label for={field.id} class="text-end" style="margin-left:1.2rem;">{field.label}</Label>
          {#if field.type === 'select'}
            <select
              id={field.id}
              bind:value={form[field.id]}
              class="col-span-3 bg-background border-input shadow-sm h-10 min-w-0 max-w-[12rem] ml-6 rounded-md px-3 py-2 text-base outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-ring/60 focus-visible:ring-2 focus-visible:shadow-md"
              style="border-radius:0.5rem;margin-left:1rem;padding:0.5rem 0.75rem;box-shadow:0 1px 2px rgba(16,24,40,0.04);"
            >
              <option value="">Select</option>
              {#each field.options ?? [] as opt}
                <option value={opt}>{opt}</option>
              {/each}
            </select>
          {:else}
            <Input id={field.id} type={field.type} bind:value={form[field.id]} class="col-span-3 max-w-[22rem] ml-6" style="border-radius:0.5rem;margin-left:1rem;padding:0.5rem 0.75rem;box-shadow:0 1px 2px rgba(16,24,40,0.04);"/>
          {/if}
        </div>
      {/each}
    </div>

    <Dialog.Footer>
      <div class="flex justify-end gap-3">
        <Button variant="outline" on:click={() => (open = false)} class="bg-primary text-primary-foreground rounded-lg text-base" style="background:#fff;color:#000;min-height:44px;padding-left:18px;padding-right:18px;border-radius:8px">Cancel</Button>
        <div style="width:1rem;"></div>
        <Button variant="default" on:click={submit} class="bg-primary text-primary-foreground rounded-lg text-base" style="background:#fff;color:#000;min-height:44px;padding-left:18px;padding-right:18px;border-radius:8px">{addButtonLabel}</Button>
      </div>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
