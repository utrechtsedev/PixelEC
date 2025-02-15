<script>
	import '../../app.css';
	let { children } = $props();
	import SideNav from '$lib/components/sideNav.svelte';
</script>

<div class="app">
	<div class="drawer lg:drawer-open">
		<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col">
			<!-- top navbar -->
			<div class="navbar bg-base-100 border-b border-base-300 shadow-xl w-full lg:hidden">
				<div class="navbar-start">
					<label for="my-drawer-2" class=" drawer-button">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
							<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 8h-9m9 4H4m0 0l3-3m-3 3l3 3m13 1h-9" />
						</svg>
					</label>
				</div>
			</div>
			<!-- end top navbar -->
			<div class="p-8">
		  		{@render children()}
			</div>
		</div>
		<div class="drawer-side">
		  <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
		  <ul class="menu bg-base-200 text-xl min-h-full w-80 p-4">
			<!-- Sidebar content here -->
			<a class="flex items-center w-full px-3 mt-3" href="#">
				<svg class="w-16 h-16 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
					<path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
				</svg>
				<span class="ml-2 text-xl font-extrabold">The App</span>
			</a>
			<div class="divider"></div>
			<li>
				<a href="/dashboard">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
						<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1" />
					</svg>
					Dashboard
				</a>
			</li>
			<li>
				<a href="/dashboard/orders">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
						<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h1m17 0h-1m0 0l-1 10H5L4 10m16 0h-4M4 10h4m4 4v2m3-2v2m-6-2v2m-1-6h8m-8 0V8c0-1.333.8-4 4-4s4 2.667 4 4v2" />
					</svg>
					Orders
				</a>
			</li>
			<li>
				<a href="/dashboard/products">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
						<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 11.172V5a2 2 0 0 1 2-2h6.172a2 2 0 0 1 1.414.586l8 8a2 2 0 0 1 0 2.828l-6.172 6.172a2 2 0 0 1-2.828 0l-8-8A2 2 0 0 1 3 11.172M7 7h.001" />
					</svg>
					Products
				</a>
			</li>
			<li>
				<a href="/dashboard/categories">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
						<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
							<path d="M11 5h10m-10 7h10m-10 7h10" />
							<rect width="4" height="4" x="3" y="3" fill="currentColor" rx="1" />
							<rect width="4" height="4" x="3" y="10" fill="currentColor" rx="1" />
							<rect width="4" height="4" x="3" y="17" fill="currentColor" rx="1" />
						</g>
					</svg>
					Categories
				</a>
			</li>
			<li>
				<a href="/dashboard/customers">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
						<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
							<circle cx="9" cy="9" r="4" />
							<path d="M16 19c0-3.314-3.134-6-7-6s-7 2.686-7 6m13-6a4 4 0 1 0-3-6.646" />
							<path d="M22 19c0-3.314-3.134-6-7-6c-.807 0-2.103-.293-3-1.235" />
						</g>
					</svg>
					Customers
				</a>
			</li>
			<li>
				<a href="/dashboard/finances">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
						<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
							<path d="M3 10V8a2 2 0 0 1 2-2h2m-4 4c1.333 0 4-.8 4-4m-4 4v4m18-4V8a2 2 0 0 0-2-2h-2m4 4c-1.333 0-4-.8-4-4m4 4v4M7 6h10m4 8v2a2 2 0 0 1-2 2h-2m4-4c-1.333 0-4 .8-4 4m0 0H7m-4-4v2a2 2 0 0 0 2 2h2m-4-4c1.333 0 4 .8 4 4" />
							<circle cx="12" cy="12" r="2" />
						</g>
					</svg>
					Finances
				</a>
			</li>
			<div class="divider my-0 px-9"></div>
			<li>
				<a href="/dashboard/insights">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
						<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16v-5m4 5V8m4 8v-2m2-10H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2" />
					</svg>
					Insights
				</a>
			</li>
			<li>
				<a href="/dashboard/discounts">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
						<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
							<path d="M6 18L18 6" />
							<circle cx="16.5" cy="16.5" r="2.5" />
							<circle cx="7.5" cy="7.5" r="2.5" />
						</g>
					</svg>
					Discounts
				</a>
			</li>
			<li>
				<a href="/dashboard/settings">
					<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
						<g fill="none" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M14 21h-4l-.551-2.48a7 7 0 0 1-1.819-1.05l-2.424.763l-2-3.464l1.872-1.718a7 7 0 0 1 0-2.1L3.206 9.232l2-3.464l2.424.763A7 7 0 0 1 9.45 5.48L10 3h4l.551 2.48a7 7 0 0 1 1.819 1.05l2.424-.763l2 3.464l-1.872 1.718a7 7 0 0 1 0 2.1l1.872 1.718l-2 3.464l-2.424-.763a7 7 0 0 1-1.819 1.052z" />
							<circle cx="12" cy="12" r="3" />
						</g>
					</svg>
					Settings
				</a>
			</li>
			<!-- TODO: fix button active color for theme change -->
			<a class="flex items-center justify-center w-full mt-auto sticky bottom-0 p-4 bg-base-100 hover:bg-[#202736] rounded-lg" href="/dashboard/account">
				<svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span class="ml-2 text-sm font-medium">Account</span>
			</a>
		  </ul>
		</div>
	  </div>
</div>

<style>
	.app {
		min-height: 100vh;
	}
	/* main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	} */

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}
</style>

