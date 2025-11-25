<script lang="ts">
  export let open = false;
  export let onClose: () => void = () => {};
  import { onMount, onDestroy, tick } from 'svelte';

  // portal action: moves the node to document.body when mounted (client-side only)
  function portal(node: HTMLElement) {
    if (typeof document === 'undefined') return { destroy() {} };
    const target = document.body;
    target.appendChild(node);
    return {
      destroy() {
        if (node.parentNode) node.parentNode.removeChild(node);
      }
    };
  }

  let container: HTMLElement | null = null;

  onMount(() => console.log('Dialog.Content mounted, open:', open));
  $: console.log('Dialog.Content reactive open:', open);
  $: if (open) console.debug('Dialog.Content: portal is rendering (debug badge will show)');

  // when the dialog opens, move focus to the first focusable element inside the dialog
  async function focusFirst() {
    await tick();
    if (!container) return;
    const focusable = container.querySelector<HTMLElement>('input, select, textarea, button, [tabindex]:not([tabindex="-1"])');
    if (focusable) focusable.focus();
  }

  $: if (open) {
    // only run focus logic in browser
    if (typeof window !== 'undefined') focusFirst();
  }

  // focus trap implementation and focus restore
  let previousActive: Element | null = null;

  function getFocusable(el: Element): HTMLElement[] {
    if (!el) return [];
    const selectors = 'a[href], area[href], input:not([disabled]):not([type=hidden]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"]), [contenteditable]';
    return Array.from(el.querySelectorAll<HTMLElement>(selectors)).filter((node) => !!(node.offsetWidth || node.offsetHeight || node.getClientRects().length));
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      const focusable = getFocusable(container as Element);
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && (active === first || active === container)) {
        e.preventDefault();
        last.focus();
      }
    } else if (e.key === 'Escape' || e.key === 'Esc') {
      onClose();
    }
  }

  $: if (open && typeof window !== 'undefined') {
    previousActive = document.activeElement;
  }

  $: if (!open && previousActive && typeof window !== 'undefined') {
    // restore focus to previously focused element when dialog closes
    (previousActive as HTMLElement).focus?.();
    previousActive = null;
  }

  onDestroy(() => {
    // nothing to cleanup here for now
  });
</script>

{#if open}
  <div
    use:portal
    bind:this={container}
    class="fixed inset-0 z-50 flex items-center justify-center"
    role="presentation"
    style="position:fixed;top:0;right:0;bottom:0;left:0;display:flex;align-items:center;justify-content:center;z-index:9999;"
  >
    <!-- DEBUG: visible badge so user can tell the dialog mounted even if hidden by CSS -->
    <div style="position:fixed;left:12px;top:12px;z-index:2147483647;background:#e11d48;color:white;padding:6px;border-radius:4px;font-weight:600">DIALOG OPEN</div>
    <!-- Backdrop: make interactive for accessibility -->
    <div
      class="fixed inset-0 bg-black/40"
      role="button"
      tabindex="0"
      on:click={onClose}
      on:keydown={(e) => { if (e.key === 'Escape' || e.key === 'Esc') onClose(); }}
      aria-label="Close dialog backdrop"
      style="position:fixed;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,0.4);"
    ></div>

    <div class="z-50 max-h-[95vh] w-full overflow-auto" role="dialog" aria-modal="true">
      <div class="mx-auto">
        <!-- Visible panel wrapper so dialog looks like a modal even without Tailwind tokens -->
        <div
          class="bg-white rounded-lg p-6 shadow-lg w-full max-w-lg mx-auto"
          on:keydown={handleKeyDown}
          tabindex="-1"
          aria-hidden={open ? 'false' : 'true'}
          style="background:white;border-radius:8px;padding:24px;box-shadow:0 10px 30px rgba(0,0,0,0.15);width:100%;max-width:720px;margin:0 auto;position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:10000;"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
{/if}


