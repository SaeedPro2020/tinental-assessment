<script lang="ts">
  /**
   * CRUD page wrapper: renders a header + add dialog + table.
   * This component is intentionally small — it composes the generic CrudForm and CrudTable.
   */
  import CrudForm from './CrudForm.svelte';
  import CrudTable from './CrudTable.svelte';

  // Reusable types for clarity
  type ColumnSimple = { id: string; label: string };
  type FieldType = 'text' | 'number' | 'select';
  interface FormField {
    id: string;
    label: string;
    type: FieldType;
    options?: string[];
  }

  export let title = 'CRUD Page';
  export let addButtonLabel = 'Add';
  export let addButtonAlign: 'right' | 'center' = 'right';
  export let columns: ColumnSimple[] = [];
  export let formFields: FormField[] = [];
  export let data: any[] = [];
  export let onCreate: (form: any) => Promise<void>;

  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // pass-through created event
  function handleCreated(e) {
    dispatch('created', e.detail);
  }
</script>

<div class="space-y-6">
  <div class="flex items-center justify-between" class:mb-6={addButtonAlign === 'right'}>
    <h1 class="text-2xl font-semibold">{title}</h1>
    {#if addButtonAlign === 'right'}
      <CrudForm {formFields} addButtonLabel={addButtonLabel} {onCreate} on:created={handleCreated} />
    {/if}
  </div>

  {#if addButtonAlign === 'center'}
    <div class="flex justify-center mb-6">
      <CrudForm {formFields} addButtonLabel={addButtonLabel} {onCreate} on:created={handleCreated} />
    </div>
  {/if}

  <div style="height:5rem;"></div>

  <CrudTable {columns} {data} />
</div>
