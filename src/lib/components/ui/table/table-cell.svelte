<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLTdAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLTdAttributes> = $props();
</script>

<td
	bind:this={ref}
	data-slot="table-cell"
	class={cn(
		"whitespace-nowrap bg-clip-padding p-2 align-middle text-center [&:has([role=checkbox])]:pe-0 border-b",
		className
	)}
	style="border-color: hsl(var(--border));"
	{...restProps}
>
	{@render children?.()}
</td>
