<script>
        import TopAlert from "$lib/frontend-components/topAlert.svelte";
</script>
<div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col">
        <TopAlert />
        <!-- First Nav (Static, No Scroll Effects) -->
        <div class="navbar bg-base-300 px-2 lg:px-10">
            <div class="navbar-start">
                <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost lg:hidden">
                    <svg class="w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5">
                            <path d="M20 7H4" />
                            <path d="M20 12H4" opacity="0.5" />
                            <path d="M20 17H4" />
                        </g>
                    </svg>
                </label>
                <p class="hidden lg:flex">Free Shipping Over $99</p>
            </div>
            <div class="navbar-center">
                <img src="/logo.svg" class="w-12 h-12" alt="" />
            </div>
            <div class="navbar-end gap-3">
                <label class="input input-bordered flex items-center gap-2 h-9 hidden lg:flex">
                    <input type="text" class="grow" placeholder="Search" />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        class="h-4 w-4 opacity-70"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </label>
                <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <circle cx="12" cy="6" r="4" fill="currentColor" />
                    <path
                        fill="currentColor"
                        d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                        opacity="0.5"
                    />
                </svg>
                <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                        <path
                            d="M3.864 16.455c-.858-3.432-1.287-5.147-.386-6.301S6.148 9 9.685 9h4.63c3.538 0 5.306 0 6.207 1.154s.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91Z"
                        />
                        <path
                            d="m19.5 9.5l-.71-2.605c-.274-1.005-.411-1.507-.692-1.886A2.5 2.5 0 0 0 17 4.172C16.56 4 16.04 4 15 4M4.5 9.5l.71-2.605c.274-1.005.411-1.507.692-1.886A2.5 2.5 0 0 1 7 4.172C7.44 4 7.96 4 9 4"
                            opacity="0.5"
                        />
                        <path
                            d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2h-4a1 1 0 0 1-1-1Z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.5 18L12 9m7.5 9l-7-8.5m-8 .5L12 21l7.5-11"
                            opacity="0.5"
                        />
                    </g>
                </svg>
            </div>
        </div>

        <!-- Second Nav -->
        <div class="navbar bg-base-300 justify-between hidden lg:flex">
            <div class="navbar-start"></div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal px-1 font-semibold text-lg">
                    <li><a href="/">Item 1</a></li>
                    <li>
                        <details>
                            <summary>Item 2</summary>
                            <ul class="p-2 bg-base-300">
                                <li><a href="/">Submenu 1</a></li>
                                <li><a href="/">Submenu 2</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a href="/">Item 3</a></li>
                    <li><a href="/">Item 4</a></li>
                    <li><a href="/">Item 5</a></li>
                    <li><a href="/">Item 6</a></li>
                </ul>
            </div>
            <div class="navbar-end"></div>
        </div>


        <slot />
    </div>
    <div class="drawer-side">
        <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 min-h-full w-80 p-4">
            <!-- Sidebar content here -->
            <li><a>Sidebar Item 1</a></li>
            <li><a>Sidebar Item 2</a></li>
        </ul>
    </div>
</div>
