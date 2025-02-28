<!-- Main Filters Container -->
<div class="bg-base-100 rounded-xl shadow-md">
    <!-- Filters Header Bar -->
    <div class="p-4 md:p-5 border-b flex items-center justify-between flex-wrap gap-3">
        <!-- Left: Title with Icon -->
        <div class="flex items-center gap-2">
            <div class="bg-primary/10 text-primary p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
            </div>
            <h2 class="font-bold text-lg">Product Filters</h2>
            
            <!-- Active Filter Pills (Desktop + Mobile) -->
            <div class="hidden xs:flex flex-wrap gap-2 ml-2">
                <div class="badge badge-primary gap-1 px-3 py-3">
                    Electronics
                    <button class="ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>
                <div class="badge badge-primary gap-1 px-3 py-3">
                    $50-$100
                    <button class="ml-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6 6 18"></path>
                            <path d="m6 6 12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Right: Actions -->
        <div class="flex gap-3 items-center">
            <button class="btn btn-sm btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12a9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9 9 9 0 0 0 9-9Z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                </svg>
                Apply
            </button>
            <button class="btn btn-sm btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                </svg>
                Clear
            </button>
            
            <!-- Mobile: Toggle Button -->
            <div class="md:hidden">
                <label for="filter-drawer" class="btn btn-sm btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    Filters
                </label>
            </div>
        </div>
    </div>

    <!-- Desktop: Filter Categories -->
    <div class="hidden md:flex flex-wrap p-4">
        <!-- Category Filter -->
        <div class="basis-full lg:basis-1/3 xl:basis-1/6 p-2">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text font-medium">Category</span>
                </label>
                <div class="dropdown dropdown-hover w-full">
                    <div tabindex="0" role="button" class="btn btn-outline btn-block justify-between">
                        <span>Electronics</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </div>
                    <div tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-[300px] overflow-y-auto">
                        <label class="cursor-pointer label">
                            <span class="label-text">Electronics</span> 
                            <input type="checkbox" checked class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <label class="cursor-pointer label">
                            <span class="label-text">Clothing</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <label class="cursor-pointer label">
                            <span class="label-text">Home & Garden</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <label class="cursor-pointer label">
                            <span class="label-text">Sports</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Price Filter -->
        <div class="basis-full lg:basis-1/3 xl:basis-1/6 p-2">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text font-medium">Price Range</span>
                </label>
                <div class="dropdown dropdown-hover w-full">
                    <div tabindex="0" role="button" class="btn btn-outline btn-block justify-between">
                        <span>$50 - $100</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </div>
                    <div tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                        <label class="cursor-pointer label">
                            <span class="label-text">$0 - $50</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <label class="cursor-pointer label">
                            <span class="label-text">$50 - $100</span> 
                            <input type="checkbox" checked class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <label class="cursor-pointer label">
                            <span class="label-text">$100 - $200</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <label class="cursor-pointer label">
                            <span class="label-text">$200+</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        
                        <!-- Custom Price Range -->
                        <div class="p-3 border-t mt-2">
                            <span class="label-text">Custom Range</span>
                            <div class="flex gap-2 mt-2">
                                <input type="number" placeholder="Min" class="input input-bordered input-sm w-full" />
                                <span class="self-center">-</span>
                                <input type="number" placeholder="Max" class="input input-bordered input-sm w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Brand Filter -->
        <div class="basis-full lg:basis-1/3 xl:basis-1/6 p-2">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text font-medium">Brand</span>
                </label>
                <div class="dropdown dropdown-hover w-full">
                    <div tabindex="0" role="button" class="btn btn-outline btn-block justify-between">
                        <span>Any Brand</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </div>
                    <div tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full max-h-[300px] overflow-y-auto">
                        <!-- Search Bar -->
                        <div class="p-2 sticky top-0 bg-base-100 z-10">
                            <input type="text" placeholder="Search brands..." class="input input-bordered input-sm w-full" />
                        </div>
                        
                        <label class="cursor-pointer label">
                            <span class="label-text">Apple</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <label class="cursor-pointer label">
                            <span class="label-text">Samsung</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <label class="cursor-pointer label">
                            <span class="label-text">Nike</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <label class="cursor-pointer label">
                            <span class="label-text">Adidas</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <!-- Add more brands as needed -->
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Availability Filter -->
        <div class="basis-full lg:basis-1/3 xl:basis-1/6 p-2">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text font-medium">Availability</span>
                </label>
                <div class="dropdown dropdown-hover w-full">
                    <div tabindex="0" role="button" class="btn btn-outline btn-block justify-between">
                        <span>In Stock</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </div>
                    <div tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full">
                        <label class="cursor-pointer label">
                            <span class="label-text">In Stock</span> 
                            <input type="checkbox" checked class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <label class="cursor-pointer label">
                            <span class="label-text">Out of Stock</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <label class="cursor-pointer label">
                            <span class="label-text">Pre-Order</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                        <label class="cursor-pointer label">
                            <span class="label-text">Backorder</span> 
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Color Filter with Swatches -->
        <div class="basis-full lg:basis-1/3 xl:basis-1/6 p-2">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text font-medium">Color</span>
                </label>
                <div class="dropdown dropdown-hover w-full">
                    <div tabindex="0" role="button" class="btn btn-outline btn-block justify-between">
                        <div class="flex gap-1">
                            <div class="w-4 h-4 rounded-full bg-red-500"></div>
                            <span>Red</span>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </div>
                    <div tabindex="0" class="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-full">
                        <div class="grid grid-cols-4 gap-2 p-2">
                            <div class="tooltip" data-tip="Red">
                                <label class="cursor-pointer flex flex-col items-center">
                                    <input type="checkbox" checked class="hidden peer" />
                                    <div class="w-8 h-8 rounded-full bg-red-500 border-2 border-transparent peer-checked:border-primary"></div>
                                </label>
                            </div>
                            <div class="tooltip" data-tip="Blue">
                                <label class="cursor-pointer flex flex-col items-center">
                                    <input type="checkbox" class="hidden peer" />
                                    <div class="w-8 h-8 rounded-full bg-blue-500 border-2 border-transparent peer-checked:border-primary"></div>
                                </label>
                            </div>
                            <div class="tooltip" data-tip="Green">
                                <label class="cursor-pointer flex flex-col items-center">
                                    <input type="checkbox" class="hidden peer" />
                                    <div class="w-8 h-8 rounded-full bg-green-500 border-2 border-transparent peer-checked:border-primary"></div>
                                </label>
                            </div>
                            <div class="tooltip" data-tip="Black">
                                <label class="cursor-pointer flex flex-col items-center">
                                    <input type="checkbox" class="hidden peer" />
                                    <div class="w-8 h-8 rounded-full bg-black border-2 border-transparent peer-checked:border-primary"></div>
                                </label>
                            </div>
                            <div class="tooltip" data-tip="White">
                                <label class="cursor-pointer flex flex-col items-center">
                                    <input type="checkbox" class="hidden peer" />
                                    <div class="w-8 h-8 rounded-full bg-white border border-gray-300 border-2 peer-checked:border-primary"></div>
                                </label>
                            </div>
                            <div class="tooltip" data-tip="Yellow">
                                <label class="cursor-pointer flex flex-col items-center">
                                    <input type="checkbox" class="hidden peer" />
                                    <div class="w-8 h-8 rounded-full bg-yellow-400 border-2 border-transparent peer-checked:border-primary"></div>
                                </label>
                            </div>
                            <div class="tooltip" data-tip="Purple">
                                <label class="cursor-pointer flex flex-col items-center">
                                    <input type="checkbox" class="hidden peer" />
                                    <div class="w-8 h-8 rounded-full bg-purple-500 border-2 border-transparent peer-checked:border-primary"></div>
                                </label>
                            </div>
                            <div class="tooltip" data-tip="Pink">
                                <label class="cursor-pointer flex flex-col items-center">
                                    <input type="checkbox" class="hidden peer" />
                                    <div class="w-8 h-8 rounded-full bg-pink-500 border-2 border-transparent peer-checked:border-primary"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Size Filter -->
        <div class="basis-full lg:basis-1/3 xl:basis-1/6 p-2">
            <div class="form-control w-full">
                <label class="label">
                    <span class="label-text font-medium">Size</span>
                </label>
                <div class="dropdown dropdown-hover w-full">
                    <div tabindex="0" role="button" class="btn btn-outline btn-block justify-between">
                        <span>Size</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="m6 9 6 6 6-6"></path>
                        </svg>
                    </div>
                    <div tabindex="0" class="dropdown-content z-[1] p-3 shadow bg-base-100 rounded-box w-full">
                        <div class="grid grid-cols-4 gap-2">
                            <label class="cursor-pointer">
                                <input type="checkbox" class="hidden peer" />
                                <div class="btn btn-sm btn-outline w-full peer-checked:btn-primary">S</div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="checkbox" class="hidden peer" />
                                <div class="btn btn-sm btn-outline w-full peer-checked:btn-primary">M</div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="checkbox" class="hidden peer" />
                                <div class="btn btn-sm btn-outline w-full peer-checked:btn-primary">L</div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="checkbox" class="hidden peer" />
                                <div class="btn btn-sm btn-outline w-full peer-checked:btn-primary">XL</div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="checkbox" class="hidden peer" />
                                <div class="btn btn-sm btn-outline w-full peer-checked:btn-primary">2XL</div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="checkbox" class="hidden peer" />
                                <div class="btn btn-sm btn-outline w-full peer-checked:btn-primary">3XL</div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Sorting & Items Per Page -->
<div class="flex flex-wrap items-center justify-between gap-4 mt-6 mb-4">
    <!-- Results Count -->
    <div class="text-sm md:text-base">
        Showing <span class="font-semibold">124</span> products of <span class="font-semibold">1,240</span> results
    </div>
    
    <!-- Right Side Controls -->
    <div class="flex flex-wrap items-center gap-3 ml-auto">
        <!-- Sort By -->
        <div class="flex gap-2 items-center">
            <label class="text-sm font-medium">Sort By:</label>
            <select class="select select-sm select-bordered">
                <option>Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Best Sellers</option>
            </select>
        </div>
        
        <!-- Items Per Page -->
        <div class="flex gap-2 items-center">
            <label class="text-sm font-medium">View:</label>
            <select class="select select-sm select-bordered w-24">
                <option>24</option>
                <option>48</option>
                <option>96</option>
                <option>All</option>
            </select>
        </div>
        
        <!-- View Mode Toggle -->
        <div class="join">
            <button class="join-item btn btn-sm btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                    <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                    <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                    <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                </svg>
            </button>
            <button class="join-item btn btn-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="3" x2="21" y1="6" y2="6"></line>
                    <line x1="3" x2="21" y1="12" y2="12"></line>
                    <line x1="3" x2="21" y1="18" y2="18"></line>
                </svg>
            </button>
        </div>
    </div>
</div>

<!-- Mobile: Filter Drawer -->
<div class="drawer drawer-end z-30 md:hidden">
    <input id="filter-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
        <label for="filter-drawer" class="drawer-overlay"></label>
        <div class="bg-base-100 flex flex-col w-[320px] h-full">
            <!-- Drawer Header -->
            <div class="p-4 border-b flex justify-between items-center">
                <h3 class="font-bold text-lg">Filters</h3>
                <label for="filter-drawer" class="btn btn-sm btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </label>
            </div>
            
            <!-- Filter Options -->
            <div class="overflow-y-auto flex-grow">
                <div class="p-4 border-b">
                    <h4 class="font-medium mb-3">Category</h4>
                    <div class="space-y-2">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked class="checkbox checkbox-primary checkbox-sm" />
                            <span>Electronics</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>Clothing</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>Home & Garden</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>Sports</span>
                        </label>
                    </div>
                </div>
                
                <div class="p-4 border-b">
                    <h4 class="font-medium mb-3">Price</h4>
                    <div class="space-y-2">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>$0 - $50</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked class="checkbox checkbox-primary checkbox-sm" />
                            <span>$50 - $100</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>$100 - $200</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>$200+</span>
                        </label>
                        
                        <div class="pt-3">
                            <span class="text-sm font-medium">Custom Range</span>
                            <div class="flex gap-2 mt-2">
                                <input type="number" placeholder="Min" class="input input-bordered input-sm w-full" />
                                <span class="self-center">-</span>
                                <input type="number" placeholder="Max" class="input input-bordered input-sm w-full" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="p-4 border-b">
                    <h4 class="font-medium mb-3">Brand</h4>
                    <!-- Search Bar -->
                    <input type="text" placeholder="Search brands..." class="input input-bordered input-sm w-full mb-3" />
                    <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>Apple</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>Samsung</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>Nike</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>Adidas</span>
                        </label>
                        <!-- Add more brands as needed -->
                    </div>
                </div>
                
                <div class="p-4 border-b">
                    <h4 class="font-medium mb-3">Availability</h4>
                    <div class="space-y-2">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked class="checkbox checkbox-primary checkbox-sm" />
                            <span>In Stock</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>Out of Stock</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>Pre-Order</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <span>Backorder</span>
                        </label>
                    </div>
                </div>
                
                <div class="p-4 border-b">
                    <h4 class="font-medium mb-3">Color</h4>
                    <div class="grid grid-cols-4 gap-2">
                        <div class="tooltip" data-tip="Red">
                            <label class="cursor-pointer flex flex-col items-center">
                                <input type="checkbox" checked class="hidden peer" />
                                <div class="w-8 h-8 rounded-full bg-red-500 border-2 border-transparent peer-checked:border-primary"></div>
                            </label>
                        </div>
                        <div class="tooltip" data-tip="Blue">
                            <label class="cursor-pointer flex flex-col items-center">
                                <input type="checkbox" class="hidden peer" />
                                <div class="w-8 h-8 rounded-full bg-blue-500 border-2 border-transparent peer-checked:border-primary"></div>
                            </label>
                        </div>
                        <div class="tooltip" data-tip="Green">
                            <label class="cursor-pointer flex flex-col items-center">
                                <input type="checkbox" class="hidden peer" />
                                <div class="w-8 h-8 rounded-full bg-green-500 border-2 border-transparent peer-checked:border-primary"></div>
                            </label>
                        </div>
                        <div class="tooltip" data-tip="Black">
                            <label class="cursor-pointer flex flex-col items-center">
                                <input type="checkbox" class="hidden peer" />
                                <div class="w-8 h-8 rounded-full bg-black border-2 border-transparent peer-checked:border-primary"></div>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="p-4 border-b">
                    <h4 class="font-medium mb-3">Size</h4>
                    <div class="grid grid-cols-4 gap-2">
                        <label class="cursor-pointer">
                            <input type="checkbox" class="hidden peer" />
                            <div class="btn btn-sm btn-outline w-full peer-checked:btn-primary">S</div>
                        </label>
                        <label class="cursor-pointer">
                            <input type="checkbox" class="hidden peer" />
                            <div class="btn btn-sm btn-outline w-full peer-checked:btn-primary">M</div>
                        </label>
                        <label class="cursor-pointer">
                            <input type="checkbox" class="hidden peer" />
                            <div class="btn btn-sm btn-outline w-full peer-checked:btn-primary">L</div>
                        </label>
                        <label class="cursor-pointer">
                            <input type="checkbox" class="hidden peer" />
                            <div class="btn btn-sm btn-outline w-full peer-checked:btn-primary">XL</div>
                        </label>
                    </div>
                </div>
                
                <!-- Rating Filter (New) -->
                <div class="p-4 border-b">
                    <h4 class="font-medium mb-3">Rating</h4>
                    <div class="space-y-2">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <div class="flex items-center">
                                <div class="rating rating-sm">
                                    <input type="radio" name="rating-5" class="mask mask-star-2 bg-orange-400" checked disabled />
                                    <input type="radio" name="rating-5" class="mask mask-star-2 bg-orange-400" checked disabled />
                                    <input type="radio" name="rating-5" class="mask mask-star-2 bg-orange-400" checked disabled />
                                    <input type="radio" name="rating-5" class="mask mask-star-2 bg-orange-400" checked disabled />
                                    <input type="radio" name="rating-5" class="mask mask-star-2 bg-orange-400" checked disabled />
                                </div>
                                <span class="ml-1">& Up</span>
                            </div>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <div class="flex items-center">
                                <div class="rating rating-sm">
                                    <input type="radio" name="rating-4" class="mask mask-star-2 bg-orange-400" checked disabled />
                                    <input type="radio" name="rating-4" class="mask mask-star-2 bg-orange-400" checked disabled />
                                    <input type="radio" name="rating-4" class="mask mask-star-2 bg-orange-400" checked disabled />
                                    <input type="radio" name="rating-4" class="mask mask-star-2 bg-orange-400" checked disabled />
                                    <input type="radio" name="rating-4" class="mask mask-star-2 bg-orange-400" disabled />
                                </div>
                                <span class="ml-1">& Up</span>
                            </div>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <div class="flex items-center">
                                <div class="rating rating-sm">
                                    <input type="radio" name="rating-3" class="mask mask-star-2 bg-orange-400" checked disabled />
                                    <input type="radio" name="rating-3" class="mask mask-star-2 bg-orange-400" checked disabled />
                                    <input type="radio" name="rating-3" class="mask mask-star-2 bg-orange-400" checked disabled />
                                    <input type="radio" name="rating-3" class="mask mask-star-2 bg-orange-400" disabled />
                                    <input type="radio" name="rating-3" class="mask mask-star-2 bg-orange-400" disabled />
                                </div>
                                <span class="ml-1">& Up</span>
                            </div>
                        </label>
                    </div>
                </div>
                
                <!-- On Sale Filter (New) -->
                <div class="p-4 border-b">
                    <h4 class="font-medium mb-3">Promotions</h4>
                    <div class="space-y-2">
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <div class="flex items-center gap-1">
                                <div class="badge badge-error text-white">Sale</div>
                                <span>On Sale</span>
                            </div>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <div class="flex items-center gap-1">
                                <div class="badge badge-success text-white">New</div>
                                <span>New Arrivals</span>
                            </div>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
                            <div class="flex items-center gap-1">
                                <div class="badge badge-warning text-white">Free</div>
                                <span>Free Shipping</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            
            <!-- Drawer Footer -->
            <div class="p-4 border-t mt-auto">
                <div class="flex gap-2">
                    <button class="btn btn-primary flex-1">Apply Filters</button>
                    <button class="btn btn-outline">Reset</button>
                </div>
            </div>
        </div>
    </div>
</div>