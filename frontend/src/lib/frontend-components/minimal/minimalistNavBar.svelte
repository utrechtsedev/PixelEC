
<header class="shadow-sm bg-white sticky top-0 z-50">
    <div class="navbar max-w-7xl mx-auto px-4">
      <!-- Mobile menu -->
      <div class="navbar-start">
        <div class="dropdown">
          <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
          <!-- svelte-ignore a11y_label_has_associated_control -->
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/" class="font-medium">Home</a></li>
            <li>
              <a href="#" class="font-medium">Categories</a>
              <ul class="p-2">
                <li><a>Electronics</a></li>
                <li><a>Fashion</a></li>
                <li><a>Home & Living</a></li>
                <li><a>Beauty</a></li>
              </ul>
            </li>
            <li><a href="#" class="font-medium">New Arrivals</a></li>
            <li><a href="#" class="font-medium">Sale</a></li>
          </ul>
        </div>
        <a href="/" class="text-xl font-bold logo">Pixelstore</a>
      </div>
          <!-- Desktop menu -->
    <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a href="/" class="font-medium">Home</a></li>
          <li tabindex="0">
            <details>
              <summary class="font-medium">Categories</summary>
              <ul class="p-2 bg-base-100 w-48">
                <li><a>Electronics</a></li>
                <li><a>Fashion</a></li>
                <li><a>Home & Living</a></li>
                <li><a>Beauty</a></li>
              </ul>
            </details>
          </li>
          <li><a href="#" class="font-medium">New Arrivals</a></li>
          <li><a href="#" class="font-medium">Sale</a></li>
        </ul>
      </div>
      
      <!-- Search and icons -->
      <div class="navbar-end">
        <div class="form-control hidden md:flex">
          <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto h-9 focus:outline-none" />
        </div>
        <div class="dropdown dropdown-end ml-2">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="badge badge-sm indicator-item bg-black text-white">3</span>
            </div>
          </label>
        </div>
        <div class="dropdown dropdown-end ml-2">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </label>
        </div>
      </div>
    </div>
  </header>
  
  <style>
    .logo {
      letter-spacing: -0.5px;
    }
  </style>