<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLThAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLThAttributes> = $props();
</script>

<th
	bind:this={ref}
	data-slot="table-head"
	class={cn(
		"text-foreground h-10 whitespace-nowrap bg-clip-padding px-2 text-center align-middle font-medium [&:has([role=checkbox])]:pe-0 border-b",
		className
	)}
	style="border-color: hsl(var(--border));"
	{...restProps}
>
	{@render children?.()}
</th>
