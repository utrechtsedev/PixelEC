<script>
    let products = [
        { 
            id: 1, 
            img: 'https://images.unsplash.com/photo-1564466809058-bf4114d55352?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Wireless Headphones', 
            description: 'Noise-canceling over-ear headphones with 20-hour battery life.', 
            price: 89.99 
        },
        { 
            id: 2, 
            img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1602024242516-fbc9d528bb4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Running Shoes', 
            description: 'Lightweight sneakers with cushioned soles for maximum comfort.', 
            price: 59.95 
        },
        { 
            id: 3, 
            img: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Smartphone', 
            description: 'Latest model with a 6.5-inch display and 128GB storage.', 
            price: 299.00 
        },
        { 
            id: 4, 
            img: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1605405748313-a416a1b50494?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Leather Jacket', 
            description: 'Stylish black leather jacket, perfect for cool weather.', 
            price: 149.99 
        },
        { 
            id: 5, 
            img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1550639524-39a7b70398f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Coffee Maker', 
            description: 'Programmable coffee machine with a 12-cup capacity.', 
            price: 45.50 
        },
        { 
            id: 6, 
            img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Gaming Mouse', 
            description: 'Ergonomic mouse with customizable RGB lighting.', 
            price: 34.99 
        },
        { 
            id: 7, 
            img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Sunglasses', 
            description: 'Polarized aviator sunglasses with UV protection.', 
            price: 25.00 
        },
        { 
            id: 8, 
            img: 'https://images.unsplash.com/photo-1491637639811-4e0b30ee2f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Yoga Mat', 
            description: 'Non-slip yoga mat, 6mm thick for extra cushioning.', 
            price: 19.99 
        },
        { 
            id: 9, 
            img: 'https://images.unsplash.com/photo-1491553895911-005be8c3f936?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Bluetooth Speaker', 
            description: 'Portable speaker with crisp sound and waterproof design.', 
            price: 39.95 
        },
        { 
            id: 10, 
            img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Graphic T-Shirt', 
            description: 'Soft cotton tee with a bold geometric print.', 
            price: 15.99 
        },
        { 
            id: 11, 
            img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Desk Lamp', 
            description: 'Adjustable LED lamp with touch controls.', 
            price: 29.99 
        },
        { 
            id: 12, 
            img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Backpack', 
            description: 'Durable backpack with multiple compartments.', 
            price: 49.95 
        },
        { 
            id: 13, 
            img: 'https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Wristwatch', 
            description: 'Classic stainless steel watch with leather strap.', 
            price: 79.00 
        },
        { 
            id: 14, 
            img: 'https://images.unsplash.com/photo-1610824359404-18d3e6b5dd5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Indoor Plant', 
            description: 'Low-maintenance potted plant for home decor.', 
            price: 12.50 
        },
        { 
            id: 15, 
            img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            imgHover: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80', 
            name: 'Electric Kettle', 
            description: 'Fast-boiling kettle with auto shut-off feature.', 
            price: 24.99 
        }
    ];

    // Function to truncate description to a fixed length (e.g., 25 characters)
    function truncateDescription(desc) {
        return desc.length > 25 ? desc.slice(0, 25) + '...' : desc;
    }
</script>

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-3 lg:px-10 gap-6">
    {#each products as product}
        <div class="flex flex-col items-center w-full relative group">
            <!-- Image Container -->
            <div class="relative w-full max-w-[300px] aspect-square">
                <img src={product.img} alt={product.name} class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 hover:opacity-0" />
                <img src={product.imgHover} alt={product.name} class="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 hover:opacity-100" />
                <!-- Desktop Button (Slides over image on hover) -->
                <button class="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[300px] h-12 bg-black text-white font-semibold opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    ADD TO CART
                </button>
            </div>

            <!-- Mobile Button (Directly under image) -->
            <button class="md:hidden w-full max-w-[300px] h-12 bg-black text-white font-semibold mt-0">ADD TO CART</button>

            <h2 class="text-xl font-bold text-gray-900 mt-4 text-center">{product.name}</h2>
            <p class="text-sm text-gray-500 mt-2 text-center max-w-[300px] overflow-hidden whitespace-nowrap">
                {truncateDescription(product.description)}
            </p>
            <span class="text-lg font-semibold text-gray-900 mt-2">${product.price.toFixed(2)}</span>
        </div>
    {/each}
</div>

<style>
    .relative:hover .btn {
        /* Ensure button stays visible on hover for desktop */
    }
</style>