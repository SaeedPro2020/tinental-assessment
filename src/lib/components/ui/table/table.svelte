<script lang="ts">
	import type { HTMLTableAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLTableAttributes> = $props();
</script>

<!--
	Fixed-size table container:
	- Uses CSS variables for width/height with sensible fallbacks so consumers can override if needed.
	- The container is overflow-hidden and the inner wrapper is scrollable so the container dims don't change with content.
-->
<div
	data-slot="table-container"
	class="relative rounded-lg border"
	style="width:var(--table-container-width,680px); height:var(--table-container-height,310px); border-color: hsl(var(--border)); border-radius:6px;"
>
	<!-- Inner scroll wrapper keeps scrollbars inside the fixed container -->
	<div class="w-full h-full overflow-auto">
			<table
				bind:this={ref}
				data-slot="table"
				class={cn("w-full caption-bottom text-sm border-collapse", className)}
				{...restProps}
			>
			{@render children?.()}
		</table>
	</div>
</div>
