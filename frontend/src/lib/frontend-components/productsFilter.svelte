<div class="flex px-5 gap-3 mt-8 items-center flex-wrap md:flex-nowrap md:justify-between">
    <!-- Left Section: Filters -->
    <div class="flex flex-wrap gap-3 items-center">
        <p class="flex gap-2 font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" fill-rule="evenodd" d="M5 3h14L8.816 13.184a2.7 2.7 0 0 0-.778-1.086c-.228-.198-.547-.377-1.183-.736l-2.913-1.64c-.949-.533-1.423-.8-1.682-1.23C2 8.061 2 7.541 2 6.503v-.69c0-1.326 0-1.99.44-2.402C2.878 3 3.585 3 5 3" clip-rule="evenodd" />
                <path fill="currentColor" d="M22 6.504v-.69c0-1.326 0-1.99-.44-2.402C21.122 3 20.415 3 19 3L8.815 13.184q.075.193.121.403c.064.285.064.619.064 1.286v2.67c0 .909 0 1.364.252 1.718c.252.355.7.53 1.594.88c1.879.734 2.818 1.101 3.486.683S15 19.452 15 17.542v-2.67c0-.666 0-1 .063-1.285a2.68 2.68 0 0 1 .9-1.49c.227-.197.545-.376 1.182-.735l2.913-1.64c.948-.533 1.423-.8 1.682-1.23c.26-.43.26-.95.26-1.988" opacity="0.5" />
            </svg>
            Refined by
        </p>

        <!-- Mobile: Filter Button + Drawer -->
        <div class="md:hidden">
            <label for="filter-drawer" class="btn btn-primary">Filter</label>
        </div>

        <!-- Desktop: All Selects -->
        <div class="hidden md:flex gap-3 items-center flex-wrap">
            <select class="select select-primary select-md max-w-xs">
                <option disabled selected>Category</option>
                <option>Electronics</option>
                <option>Clothing</option>
                <option>Home & Garden</option>
                <option>Sports</option>
            </select>
            <select class="select select-primary select-md max-w-xs">
                <option disabled selected>Price</option>
                <option>$0 - $50</option>
                <option>$50 - $100</option>
                <option>$100 - $200</option>
                <option>$200+</option>
            </select>
            <select class="select select-primary select-md max-w-xs">
                <option disabled selected>Brand</option>
                <option>Nike</option>
                <option>Apple</option>
                <option>Samsung</option>
                <option>Adidas</option>
            </select>
            <select class="select select-primary select-md max-w-xs">
                <option disabled selected>Availability</option>
                <option>In Stock</option>
                <option>Out of Stock</option>
                <option>Pre-Order</option>
                <option>Backorder</option>
            </select>
            <select class="select select-primary select-md max-w-xs">
                <option disabled selected>Color</option>
                <option>Red</option>
                <option>Blue</option>
                <option>Green</option>
                <option>Black</option>
            </select>
            <select class="select select-primary select-md max-w-xs">
                <option disabled selected>Size</option>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
                <option>X-Large</option>
            </select>
        </div>
    </div>

    <!-- Right Section: Sort By and Items Per Page -->
    <div class="flex flex-wrap gap-5 md:flex-nowrap md:ml-auto">
        <div>
            <p class="text-center">Sort By</p>
            <select class="select select-primary select-md max-w-xs">
                <option disabled selected>Price</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
                <option>Best Sellers</option>
            </select>
        </div>
        <div>
            <p class="text-center">Items Per Page</p>
            <select class="select select-primary select-md max-w-[80px]">
                <option disabled selected>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
                <option>All</option>
            </select>
        </div>
    </div>
</div>

<!-- Drawer for Mobile Filters -->
<div class="drawer md:hidden">
    <input id="filter-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side">
        <label for="filter-drawer" class="drawer-overlay"></label>
        <div class="bg-base-100 w-80 p-6 h-full">
            <h3 class="font-bold text-lg mb-4">Filters</h3>
            <div class="flex flex-col gap-6">
                <!-- Category -->
                <div>
                    <h4 class="font-semibold text-md mb-2">Category</h4>
                    <div class="flex flex-col gap-2">
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Electronics
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Clothing
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Home & Garden
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Sports
                        </label>
                    </div>
                </div>

                <!-- Price -->
                <div>
                    <h4 class="font-semibold text-md mb-2">Price</h4>
                    <div class="flex flex-col gap-2">
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> $0 - $50
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> $50 - $100
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> $100 - $200
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> $200+
                        </label>
                    </div>
                </div>

                <!-- Brand -->
                <div>
                    <h4 class="font-semibold text-md mb-2">Brand</h4>
                    <div class="flex flex-col gap-2">
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Nike
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Apple
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Samsung
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Adidas
                        </label>
                    </div>
                </div>

                <!-- Availability -->
                <div>
                    <h4 class="font-semibold text-md mb-2">Availability</h4>
                    <div class="flex flex-col gap-2">
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> In Stock
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Out of Stock
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Pre-Order
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Backorder
                        </label>
                    </div>
                </div>

                <!-- Color -->
                <div>
                    <h4 class="font-semibold text-md mb-2">Color</h4>
                    <div class="flex flex-col gap-2">
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Red
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Blue
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Green
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Black
                        </label>
                    </div>
                </div>

                <!-- Size -->
                <div>
                    <h4 class="font-semibold text-md mb-2">Size</h4>
                    <div class="flex flex-col gap-2">
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Small
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Medium
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> Large
                        </label>
                        <label class="cursor-pointer flex items-center gap-2">
                            <input type="checkbox" class="checkbox checkbox-primary" /> X-Large
                        </label>
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <label for="filter-drawer" class="btn btn-primary w-full">Apply Filters</label>
            </div>
        </div>
    </div>
</div>

<div class="divider"></div>
<div></div>