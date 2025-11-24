<script lang="ts">
	import { page } from '$app/stores';
    import NavigationMenu from "$lib/components/ui/navigation-menu/navigation-menu.svelte";
    import NavigationMenuList from "$lib/components/ui/navigation-menu/navigation-menu-list.svelte";
    import NavigationMenuItem from "$lib/components/ui/navigation-menu/navigation-menu-item.svelte";
    import NavigationMenuLink from "$lib/components/ui/navigation-menu/navigation-menu-link.svelte";

</script>

<nav class="border-b bg-white">
	<div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
		
		<div class="text-xl font-semibold">School Registry</div>

		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuLink 
						href="/" 
						class={$page.url.pathname === '/' ? 'font-bold text-blue-600' : ''}
					>
						Home
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuLink 
						href="/students"
						class={$page.url.pathname.startsWith('/students') ? 'font-bold text-blue-600' : ''}
					>
						Students
					</NavigationMenuLink>
				</NavigationMenuItem>

				<NavigationMenuItem>
					<NavigationMenuLink 
						href="/teachers"
						class={$page.url.pathname.startsWith('/teachers') ? 'font-bold text-blue-600' : ''}
					>
						Teachers
					</NavigationMenuLink>
				</NavigationMenuItem>

			</NavigationMenuList>
		</NavigationMenu>
	</div>
</nav>
