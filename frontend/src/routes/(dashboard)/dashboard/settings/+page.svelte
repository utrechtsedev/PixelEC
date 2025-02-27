<script>
  import { onMount } from 'svelte';
  
  // Mock data - replace with actual API calls
  let settings = {
    storeInfo: {
      name: 'My Awesome Store',
      description: 'Premium products for everyday use',
      email: 'contact@mystore.com',
      phone: '+1 (555) 123-4567',
      address: '123 Commerce St, Shopville, CA 94123',
      logo: null, // URL to logo image
      favicon: null, // URL to favicon
      currency: 'USD',
      timezone: 'America/Los_Angeles',
      orderPrefix: 'ORD-'
    },
    domain: {
      custom: 'mystore.com',
      enabled: true
    },
    seo: {
      metaTitle: 'My Awesome Store | Premium Products',
      metaDescription: 'Shop our collection of premium products for everyday use at affordable prices',
      ogImage: null, // URL to Open Graph image
      googleVerification: '',
      structuredData: true
    },
    legal: {
      termsUrl: '/terms',
      privacyUrl: '/privacy',
      returnPolicyUrl: '/returns',
      showCookieConsent: true
    },
    uiTheme: 'modern', // Options: 'modern', 'classic', 'minimal'
    colors: {
      primary: '#4f46e5',
      secondary: '#ec4899',
      accent: '#f97316',
      background: '#ffffff'
    },
    social: {
      facebook: 'https://facebook.com/mystore',
      instagram: 'https://instagram.com/mystore',
      twitter: 'https://twitter.com/mystore',
      youtube: '',
      pinterest: ''
    },
    components: {
      featuredProducts: { enabled: true, limit: 8, showPrices: true },
      productRecommendations: { enabled: true },
      newsletter: { enabled: true, popupDelay: 5 },
      reviews: { enabled: true, moderation: true },
      socialMedia: { enabled: true }
    },
    checkout: {
      guestCheckout: true,
      expressCheckout: true,
      abandonedCartEmails: true,
      orderConfirmationEmail: true,
      minimumOrderValue: 0,
      orderNotes: true,
      showEstimatedDelivery: true
    },
    shipping: {
      freeShippingThreshold: 50,
      displayShippingCalculator: true,
      internationalShipping: false,
      shippingOrigin: 'United States'
    },
    inventory: {
      lowStockThreshold: 5,
      showOutOfStock: true,
      notifyLowStock: true
    },
    analytics: {
      enabled: true,
      trackingID: 'UA-123456-7',
      facebookPixelID: '',
      hotjarID: ''
    }
  };
  
  // States for modals
  let activeModal = null;
  let editingComponent = null;
  
  // Save changes function
  const saveSettings = async () => {
    // API call to save settings
    const toast = document.getElementById('success-toast');
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  };
  
  // Open modal for component editing
  const openComponentModal = (component) => {
    editingComponent = { ...settings.components[component] };
    activeModal = component;
  };
  
  // Save component changes
  const saveComponentChanges = () => {
    settings.components[activeModal] = { ...editingComponent };
    activeModal = null;
  };
  
  // Toggle component state
  const toggleComponent = (component) => {
    settings.components[component].enabled = !settings.components[component].enabled;
  };
  
  // Tab navigation
  let activeTab = 'storeInfo';
  
  onMount(() => {
    // Fetch settings from API
  });
</script>

<div class="p-6 bg-base-100 min-h-screen">
  <div class="max-w-5xl mx-auto">
    <header class="mb-8">
      <h1 class="text-2xl md:text-3xl font-bold text-primary">Store Settings</h1>
      <p class="text-sm md:text-base text-base-content/70">Configure your store's appearance and functionality</p>
    </header>
    
    <!-- Tab Navigation -->
    <div class="tabs tabs-boxed mb-6 bg-base-200 overflow-x-auto whitespace-nowrap w-full">
      <button class="tab {activeTab === 'storeInfo' ? 'tab-active' : ''}" on:click={() => activeTab = 'storeInfo'}>Store Info</button>
      <button class="tab {activeTab === 'general' ? 'tab-active' : ''}" on:click={() => activeTab = 'general'}>General</button>
      <button class="tab {activeTab === 'seo' ? 'tab-active' : ''}" on:click={() => activeTab = 'seo'}>SEO</button>
      <button class="tab {activeTab === 'components' ? 'tab-active' : ''}" on:click={() => activeTab = 'components'}>Components</button>
      <button class="tab {activeTab === 'checkout' ? 'tab-active' : ''}" on:click={() => activeTab = 'checkout'}>Checkout</button>
      <button class="tab {activeTab === 'shipping' ? 'tab-active' : ''}" on:click={() => activeTab = 'shipping'}>Shipping</button>
      <button class="tab {activeTab === 'inventory' ? 'tab-active' : ''}" on:click={() => activeTab = 'inventory'}>Inventory</button>
      <button class="tab {activeTab === 'analytics' ? 'tab-active' : ''}" on:click={() => activeTab = 'analytics'}>Analytics</button>
    </div>
    
    <!-- Settings Content -->
    <div class="bg-base-200 rounded-lg shadow-sm border border-base-300">
      
      <!-- Store Info Tab -->
      {#if activeTab === 'storeInfo'}
        <div class="p-6">
          <h2 class="text-xl font-bold">Store Information</h2>
          
          <!-- Basic Info Card -->
          <div class="card bg-base-200">
            <div class="card-body">
              <h3 class="card-title text-lg">Basic Information</h3>
              
              <div>
                <!-- Store Name -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Store Name</span>
                  </label>
                  <input type="text" bind:value={settings.storeInfo.name} placeholder="My Awesome Store" class="input input-bordered w-full" />
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">This will be displayed throughout your store</span>
                  </label>
                </div>
                
                <!-- Store Description -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Store Description</span>
                  </label>
                  <textarea bind:value={settings.storeInfo.description} placeholder="Describe your store in a few words" class="textarea textarea-bordered h-24 w-full"></textarea>
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">A short description of your business</span>
                  </label>
                </div>
                
                <!-- Store Email -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Contact Email</span>
                  </label>
                  <input type="email" bind:value={settings.storeInfo.email} placeholder="contact@yourstore.com" class="input input-bordered w-full" />
                </div>
                
                <!-- Store Phone -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Contact Phone</span>
                  </label>
                  <input type="tel" bind:value={settings.storeInfo.phone} placeholder="+1 (555) 123-4567" class="input input-bordered w-full" />
                </div>
                
                <!-- Store Address -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Business Address</span>
                  </label>
                  <textarea bind:value={settings.storeInfo.address} placeholder="123 Commerce St, Shopville, CA 94123" class="textarea textarea-bordered h-24 w-full"></textarea>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Currency & Regional Settings -->
          <div class="card bg-base-200">
            <div class="card-body">
              <h3 class="card-title text-lg">Currency & Regional Settings</h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <!-- Currency -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Currency</span>
                  </label>
                  <select bind:value={settings.storeInfo.currency} class="select select-bordered w-full">
                    <option value="USD">USD - US Dollar ($)</option>
                    <option value="EUR">EUR - Euro (€)</option>
                    <option value="GBP">GBP - British Pound (£)</option>
                    <option value="JPY">JPY - Japanese Yen (¥)</option>
                    <option value="CAD">CAD - Canadian Dollar (C$)</option>
                    <option value="AUD">AUD - Australian Dollar (A$)</option>
                  </select>
                </div>
                
                <!-- Timezone -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Timezone</span>
                  </label>
                  <select bind:value={settings.storeInfo.timezone} class="select select-bordered w-full">
                    <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                    <option value="America/Denver">Mountain Time (US & Canada)</option>
                    <option value="America/Chicago">Central Time (US & Canada)</option>
                    <option value="America/New_York">Eastern Time (US & Canada)</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Paris">Paris</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                  </select>
                </div>
                

              </div>
            </div>
          </div>
          
          <!-- Logo & Branding -->
          <div class="card bg-base-200">
            <div class="card-body">
              <h3 class="card-title text-lg">Logo & Branding</h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <!-- Logo Upload -->
                <div>
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="block text-sm font-medium mb-2">Store Logo</label>
                  <div class="flex items-center justify-center w-full">
                    <label class="flex flex-col w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-base-300">
                      <div class="flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-base-content/70">Upload logo</p>
                        <p class="text-xs text-base-content/50">Recommended: 250×100px</p>
                      </div>
                      <input type="file" class="opacity-0" />
                    </label>
                  </div>
                </div>
                
                <!-- Favicon Upload -->
                <div>
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="block text-sm font-medium mb-2">Favicon</label>
                  <div class="flex items-center justify-center w-full">
                    <label class="flex flex-col w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-base-300">
                      <div class="flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider text-base-content/70">Upload favicon</p>
                        <p class="text-xs text-base-content/50">Recommended: 32×32px</p>
                      </div>
                      <input type="file" class="opacity-0" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Social Media Links -->
          <div class="card bg-base-200">
            <div class="card-body">
              <h3 class="card-title text-lg">Social Media Links</h3>
              
              <div class="space-y-4 mt-2">
                <!-- Facebook -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Facebook</span>
                  </label>
                  <input type="url" bind:value={settings.social.facebook} placeholder="https://facebook.com/yourstore" class="input input-bordered w-full" />
                </div>
                
                <!-- Instagram -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Instagram</span>
                  </label>
                  <input type="url" bind:value={settings.social.instagram} placeholder="https://instagram.com/yourstore" class="input input-bordered w-full" />
                </div>
                
                <!-- Twitter -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Twitter</span>
                  </label>
                  <input type="url" bind:value={settings.social.twitter} placeholder="https://twitter.com/yourstore" class="input input-bordered w-full" />
                </div>
                
                <!-- YouTube -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">YouTube</span>
                  </label>
                  <input type="url" bind:value={settings.social.youtube} placeholder="https://youtube.com/c/yourstore" class="input input-bordered w-full" />
                </div>
                
                <!-- Pinterest -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Pinterest</span>
                  </label>
                  <input type="url" bind:value={settings.social.pinterest} placeholder="https://pinterest.com/yourstore" class="input input-bordered w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- General Settings Tab -->
      {#if activeTab === 'general'}
        <div class="p-6">
          <!-- Domain Settings -->
          <div class="card bg-base-200">
            <div class="card-body">
              <h2 class="card-title text-xl">Domain Settings</h2>
              
              <div class="form-control w-full max-w-md">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="label">
                  <span class="label-text">Custom Domain</span>
                </label>
                <div class="block lg:flex input-group flex-col sm:flex-row space-y-1 lg:space-x-1">
                  <input type="text" bind:value={settings.domain.custom} placeholder="yourdomain.com" class="input input-bordered w-full" />
                  <!-- svelte-ignore a11y_consider_explicit_label -->
                  <button class="btn btn-square btn-outline mt-2 sm:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Your store will be accessible at this domain</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- Theme Settings -->
          <div class="card bg-base-200">
            <div class="card-body">
              <h2 class="card-title text-xl">Store Appearance</h2>
              
              <div class="form-control">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="label">
                  <span class="label-text">Select UI Theme</span>
                </label>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  <!-- Modern Theme -->
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <div class="card bg-base-100 hover:bg-base-300 cursor-pointer border-2 {settings.uiTheme === 'modern' ? 'border-primary' : 'border-transparent'}" on:click={() => settings.uiTheme = 'modern'}>
                    <div class="card-body p-4">
                      <div class="w-full h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md mb-2"></div>
                      <h3 class="font-medium">Modern</h3>
                      <p class="text-xs text-base-content/70">Clean, minimal aesthetic with gradients and rounded corners</p>
                    </div>
                  </div>
                  
                  <!-- Classic Theme -->
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <div class="card bg-base-100 hover:bg-base-300 cursor-pointer border-2 {settings.uiTheme === 'classic' ? 'border-primary' : 'border-transparent'}" on:click={() => settings.uiTheme = 'classic'}>
                    <div class="card-body p-4">
                      <div class="w-full h-24 bg-gradient-to-r from-amber-500 to-red-500 rounded-md mb-2"></div>
                      <h3 class="font-medium">Classic</h3>
                      <p class="text-xs text-base-content/70">Traditional e-commerce layout with warm colors</p>
                    </div>
                  </div>
                  
                  <!-- Minimal Theme -->
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                  <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <div class="card bg-base-100 hover:bg-base-300 cursor-pointer border-2 {settings.uiTheme === 'minimal' ? 'border-primary' : 'border-transparent'}" on:click={() => settings.uiTheme = 'minimal'}>
                    <div class="card-body p-4">
                      <div class="w-full h-24 bg-gradient-to-r from-gray-200 to-gray-400 rounded-md mb-2"></div>
                      <h3 class="font-medium">Minimal</h3>
                      <p class="text-xs text-base-content/70">Ultra minimalist design for a refined shopping experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Color Customization -->
          <div class="card bg-base-200">
            <div class="card-body">
              <h3 class="card-title text-lg">Color Customization</h3>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <!-- Primary Color -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Primary Color</span>
                  </label>
                  <div class="flex items-center gap-3">
                    <input type="color" bind:value={settings.colors.primary} class="w-12 h-10 rounded cursor-pointer" />
                    <input type="text" bind:value={settings.colors.primary} placeholder="#4f46e5" class="input input-bordered w-full" />
                  </div>
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Used for buttons, links, and highlights</span>
                  </label>
                </div>
                
                <!-- Secondary Color -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Secondary Color</span>
                  </label>
                  <div class="flex items-center gap-3">
                    <input type="color" bind:value={settings.colors.secondary} class="w-12 h-10 rounded cursor-pointer" />
                    <input type="text" bind:value={settings.colors.secondary} placeholder="#ec4899" class="input input-bordered w-full" />
                  </div>
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Used for secondary elements</span>
                  </label>
                </div>
                
                <!-- Accent Color -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Accent Color</span>
                  </label>
                  <div class="flex items-center gap-3">
                    <input type="color" bind:value={settings.colors.accent} class="w-12 h-10 rounded cursor-pointer" />
                    <input type="text" bind:value={settings.colors.accent} placeholder="#f97316" class="input input-bordered w-full" />
                  </div>
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Used for accents and highlights</span>
                  </label>
                </div>
                
                <!-- Background Color -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Background Color</span>
                  </label>
                  <div class="flex items-center gap-3">
                    <input type="color" bind:value={settings.colors.background} class="w-12 h-10 rounded cursor-pointer" />
                    <input type="text" bind:value={settings.colors.background} placeholder="#ffffff" class="input input-bordered w-full" />
                  </div>
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Used for main background</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- SEO Settings Tab -->
      {#if activeTab === 'seo'}
        <div class="p-6 space-y-6">
          <h2 class="text-xl font-bold mb-4">SEO Settings</h2>
          
          <!-- Meta Information -->
          <div class="card bg-base-200">
            <div class="card-body">
              <h3 class="card-title text-lg">Meta Information</h3>
              
              <div class="space-y-4 mt-2">
                <!-- Meta Title -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Meta Title</span>
                  </label>
                  <input type="text" bind:value={settings.seo.metaTitle} placeholder="Your Store Name | Tagline" class="input input-bordered w-full" />
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Recommended: 50-60 characters</span>
                  </label>
                </div>
                
                <!-- Meta Description -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Meta Description</span>
                  </label>
                  <textarea bind:value={settings.seo.metaDescription} placeholder="Brief description of your store for search results" class="textarea textarea-bordered h-24 w-full"></textarea>
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Recommended: 150-160 characters</span>
                  </label>
                </div>
                
                <!-- Google Site Verification -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Google Site Verification</span>
                  </label>
                  <input type="text" bind:value={settings.seo.googleVerification} placeholder="Google verification code" class="input input-bordered w-full" />
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Used to verify your site with Google Search Console</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Social Sharing -->
          <div class="card bg-base-200">
            <div class="card-body">
              <h3 class="card-title text-lg">Social Sharing</h3>
              
              <div class="mt-4">
                <!-- Open Graph Image -->
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="block text-sm font-medium mb-2">Default Social Share Image</label>
                <div class="flex items-center justify-center w-full">
                  <label class="flex flex-col w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-base-300">
                    <div class="flex flex-col items-center justify-center pt-7">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-base-content/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p class="pt-1 text-sm tracking-wider text-base-content/70">Upload image</p>
                      <p class="text-xs text-base-content/50">Recommended: 1200×630px</p>
                    </div>
                    <input type="file" class="opacity-0" />
                  </label>
                </div>
              </div>
              
              <div class="form-control mt-4">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" bind:checked={settings.seo.structuredData} class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Enable Structured Data</span>
                    <p class="text-sm text-base-content/60">Add schema markup to improve search engine results</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          
          <!-- Legal Pages -->
          <div class="card bg-base-200">
            <div class="card-body">
              <h3 class="card-title text-lg">Legal Pages</h3>
              
              <div class="space-y-4 mt-2">
                <!-- Terms & Conditions -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Terms & Conditions URL</span>
                  </label>
                  <input type="text" bind:value={settings.legal.termsUrl} placeholder="/terms" class="input input-bordered w-full" />
                </div>
                
                <!-- Privacy Policy -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Privacy Policy URL</span>
                  </label>
                  <input type="text" bind:value={settings.legal.privacyUrl} placeholder="/privacy" class="input input-bordered w-full" />
                </div>
                
                <!-- Return Policy -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Return Policy URL</span>
                  </label>
                  <input type="text" bind:value={settings.legal.returnPolicyUrl} placeholder="/returns" class="input input-bordered w-full" />
                </div>
                
                <!-- Cookie Consent -->
                <div class="form-control">
                  <label class="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" bind:checked={settings.inventory.notifyLowStock} class="toggle toggle-primary" />
                    <div>
                      <span class="label-text font-medium">Low Stock Notifications</span>
                      <p class="text-sm text-base-content/60">Receive email alerts when products reach low stock threshold</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Analytics Tab -->    
      {#if activeTab === 'analytics'}
      <div class="p-6 space-y-6">
        <h2 class="text-xl font-bold mb-4">Analytics Settings</h2>
        
        <!-- Analytics Integration -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h3 class="card-title text-lg">Analytics Integration</h3>
            
            <div class="form-control">
              <label class="label cursor-pointer justify-start gap-4">
                <input type="checkbox" bind:checked={settings.analytics.enabled} class="toggle toggle-primary" />
                <div>
                  <span class="label-text font-medium">Enable Analytics</span>
                  <p class="text-sm text-base-content/60">Track user behavior and sales data</p>
                </div>
              </label>
            </div>
            
            {#if settings.analytics.enabled}
              <div class="space-y-4 mt-4">
                <!-- Google Analytics -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Google Analytics Tracking ID</span>
                  </label>
                  <input type="text" bind:value={settings.analytics.trackingID} placeholder="UA-XXXXXXX-X or G-XXXXXXXX" class="input input-bordered w-full" />
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Enter your Google Analytics tracking ID</span>
                  </label>
                </div>
                
                <!-- Facebook Pixel -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Facebook Pixel ID</span>
                  </label>
                  <input type="text" bind:value={settings.analytics.facebookPixelID} placeholder="XXXXXXXXXX" class="input input-bordered w-full" />
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Enter your Facebook Pixel ID</span>
                  </label>
                </div>
                
                <!-- Hotjar ID -->
                <div class="form-control w-full">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Hotjar ID</span>
                  </label>
                  <input type="text" bind:value={settings.analytics.hotjarID} placeholder="XXXXXXX" class="input input-bordered w-full" />
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Enter your Hotjar ID for heatmaps and recordings</span>
                  </label>
                </div>
              </div>
            {/if}
          </div>
        </div>
        
        <!-- Privacy Settings -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h3 class="card-title text-lg">Privacy Settings</h3>
            
            <div class="space-y-4 mt-2">
              <!-- Cookie Consent -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" bind:checked={settings.legal.showCookieConsent} class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Show Cookie Consent Banner</span>
                    <p class="text-sm text-base-content/60">Display a cookie consent notification to visitors</p>
                  </div>
                </label>
              </div>
              
              <!-- IP Anonymization -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">IP Anonymization</span>
                    <p class="text-sm text-base-content/60">Anonymize user IP addresses in analytics data</p>
                  </div>
                </label>
              </div>
              
              <!-- Do Not Track -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Respect Do Not Track</span>
                    <p class="text-sm text-base-content/60">Do not collect analytics from users with DNT enabled</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Custom Events -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h3 class="card-title text-lg">Custom Events Tracking</h3>
            
            <div class="space-y-4 mt-2">
              <!-- Product View -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" checked class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Product Views</span>
                    <p class="text-sm text-base-content/60">Track when customers view product details</p>
                  </div>
                </label>
              </div>
              
              <!-- Add to Cart -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" checked class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Add to Cart</span>
                    <p class="text-sm text-base-content/60">Track when products are added to cart</p>
                  </div>
                </label>
              </div>
              
              <!-- Wishlist -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Wishlist Interactions</span>
                    <p class="text-sm text-base-content/60">Track wishlist adds and removals</p>
                  </div>
                </label>
              </div>
              
              <!-- Checkout Steps -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" checked class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Checkout Steps</span>
                    <p class="text-sm text-base-content/60">Track individual checkout process steps</p>
                  </div>
                </label>
              </div>
              
              <!-- Search Queries -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Search Queries</span>
                    <p class="text-sm text-base-content/60">Track customer search terms</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Report Settings -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h3 class="card-title text-lg">Analytics Reports</h3>
            
            <div class="space-y-4 mt-2">
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Weekly Email Reports</span>
                    <p class="text-sm text-base-content/60">Receive weekly analytics summary via email</p>
                  </div>
                </label>
              </div>
              
              <div class="form-control w-full max-w-xs">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="label">
                  <span class="label-text">Report Recipients</span>
                </label>
                <input type="text" placeholder="email@example.com, another@example.com" class="input input-bordered w-full" />
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Comma-separated email addresses</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
      
      <!-- Components Tab -->
      {#if activeTab === 'components'}
        <div class="p-6 space-y-6">
          <h2 class="text-xl font-bold mb-4">Store Components</h2>
          
          <!-- Mobile Component Cards (visible on small screens) -->
          <div class="md:hidden space-y-4">
            <!-- Featured Products -->
            <div class="card bg-base-200">
              <div class="card-body p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-medium">Featured Products</h3>
                    <p class="text-sm text-base-content/60">Display featured products on your homepage</p>
                    <div class="badge mt-2 {settings.components.featuredProducts.enabled ? 'badge-success' : 'badge-error'}">
                      {settings.components.featuredProducts.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
                <div class="card-actions justify-end mt-3">
                  <button class="btn btn-sm btn-outline" on:click={() => openComponentModal('featuredProducts')}>Edit</button>
                  <button class="btn btn-sm {settings.components.featuredProducts.enabled ? 'btn-error' : 'btn-success'}" on:click={() => toggleComponent('featuredProducts')}>
                    {settings.components.featuredProducts.enabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            </div>

            <!-- Product Recommendations -->
            <div class="card bg-base-200">
              <div class="card-body p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-medium">Product Recommendations</h3>
                    <p class="text-sm text-base-content/60">Show recommended products based on browsing history</p>
                    <div class="badge mt-2 {settings.components.productRecommendations.enabled ? 'badge-success' : 'badge-error'}">
                      {settings.components.productRecommendations.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
                <div class="card-actions justify-end mt-3">
                  <button class="btn btn-sm btn-outline" on:click={() => openComponentModal('productRecommendations')}>Edit</button>
                  <button class="btn btn-sm {settings.components.productRecommendations.enabled ? 'btn-error' : 'btn-success'}" on:click={() => toggleComponent('productRecommendations')}>
                    {settings.components.productRecommendations.enabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            </div>

            <!-- Newsletter -->
            <div class="card bg-base-200">
              <div class="card-body p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-medium">Newsletter Signup</h3>
                    <p class="text-sm text-base-content/60">Collect email subscribers with a popup or embedded form</p>
                    <div class="badge mt-2 {settings.components.newsletter.enabled ? 'badge-success' : 'badge-error'}">
                      {settings.components.newsletter.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
                <div class="card-actions justify-end mt-3">
                  <button class="btn btn-sm btn-outline" on:click={() => openComponentModal('newsletter')}>Edit</button>
                  <button class="btn btn-sm {settings.components.newsletter.enabled ? 'btn-error' : 'btn-success'}" on:click={() => toggleComponent('newsletter')}>
                    {settings.components.newsletter.enabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            </div>

            <!-- Reviews -->
            <div class="card bg-base-200">
              <div class="card-body p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-medium">Product Reviews</h3>
                    <p class="text-sm text-base-content/60">Allow customers to leave reviews on products</p>
                    <div class="badge mt-2 {settings.components.reviews.enabled ? 'badge-success' : 'badge-error'}">
                      {settings.components.reviews.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
                <div class="card-actions justify-end mt-3">
                  <button class="btn btn-sm btn-outline" on:click={() => openComponentModal('reviews')}>Edit</button>
                  <button class="btn btn-sm {settings.components.reviews.enabled ? 'btn-error' : 'btn-success'}" on:click={() => toggleComponent('reviews')}>
                    {settings.components.reviews.enabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div class="card bg-base-200">
              <div class="card-body p-4">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-medium">Social Media Integration</h3>
                    <p class="text-sm text-base-content/60">Display social media links and sharing options</p>
                    <div class="badge mt-2 {settings.components.socialMedia.enabled ? 'badge-success' : 'badge-error'}">
                      {settings.components.socialMedia.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </div>
                </div>
                <div class="card-actions justify-end mt-3">
                  <button class="btn btn-sm btn-outline" on:click={() => openComponentModal('socialMedia')}>Edit</button>
                  <button class="btn btn-sm {settings.components.socialMedia.enabled ? 'btn-error' : 'btn-success'}" on:click={() => toggleComponent('socialMedia')}>
                    {settings.components.socialMedia.enabled ? 'Disable' : 'Enable'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop Table (hidden on small screens) -->
          <div class="hidden md:block overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- Featured Products -->
                <tr>
                  <td>
                    <div class="font-medium">Featured Products</div>
                    <div class="text-sm text-base-content/60">Display featured products on your homepage</div>
                  </td>
                  <td>
                    <div class="badge {settings.components.featuredProducts.enabled ? 'badge-success' : 'badge-error'}">
                      {settings.components.featuredProducts.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </td>
                  <td class="flex gap-2">
                    <button class="btn btn-sm btn-outline" on:click={() => openComponentModal('featuredProducts')}>Edit</button>
                    <button class="btn btn-sm {settings.components.featuredProducts.enabled ? 'btn-error' : 'btn-success'}" on:click={() => toggleComponent('featuredProducts')}>
                      {settings.components.featuredProducts.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
                
                <!-- Product Recommendations -->
                <tr>
                  <td>
                    <div class="font-medium">Product Recommendations</div>
                    <div class="text-sm text-base-content/60">Show recommended products based on browsing history</div>
                  </td>
                  <td>
                    <div class="badge {settings.components.productRecommendations.enabled ? 'badge-success' : 'badge-error'}">
                      {settings.components.productRecommendations.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </td>
                  <td class="flex gap-2">
                    <button class="btn btn-sm btn-outline" on:click={() => openComponentModal('productRecommendations')}>Edit</button>
                    <button class="btn btn-sm {settings.components.productRecommendations.enabled ? 'btn-error' : 'btn-success'}" on:click={() => toggleComponent('productRecommendations')}>
                      {settings.components.productRecommendations.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
                
                <!-- Newsletter -->
                <tr>
                  <td>
                    <div class="font-medium">Newsletter Signup</div>
                    <div class="text-sm text-base-content/60">Collect email subscribers with a popup or embedded form</div>
                  </td>
                  <td>
                    <div class="badge {settings.components.newsletter.enabled ? 'badge-success' : 'badge-error'}">
                      {settings.components.newsletter.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </td>
                  <td class="flex gap-2">
                    <button class="btn btn-sm btn-outline" on:click={() => openComponentModal('newsletter')}>Edit</button>
                    <button class="btn btn-sm {settings.components.newsletter.enabled ? 'btn-error' : 'btn-success'}" on:click={() => toggleComponent('newsletter')}>
                      {settings.components.newsletter.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
                
                <!-- Reviews -->
                <tr>
                  <td>
                    <div class="font-medium">Product Reviews</div>
                    <div class="text-sm text-base-content/60">Allow customers to leave reviews on products</div>
                  </td>
                  <td>
                    <div class="badge {settings.components.reviews.enabled ? 'badge-success' : 'badge-error'}">
                      {settings.components.reviews.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </td>
                  <td class="flex gap-2">
                    <button class="btn btn-sm btn-outline" on:click={() => openComponentModal('reviews')}>Edit</button>
                    <button class="btn btn-sm {settings.components.reviews.enabled ? 'btn-error' : 'btn-success'}" on:click={() => toggleComponent('reviews')}>
                      {settings.components.reviews.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
                
                <!-- Social Media -->
                <tr>
                  <td>
                    <div class="font-medium">Social Media Integration</div>
                    <div class="text-sm text-base-content/60">Display social media links and sharing options</div>
                  </td>
                  <td>
                    <div class="badge {settings.components.socialMedia.enabled ? 'badge-success' : 'badge-error'}">
                      {settings.components.socialMedia.enabled ? 'Enabled' : 'Disabled'}
                    </div>
                  </td>
                  <td class="flex gap-2">
                    <button class="btn btn-sm btn-outline" on:click={() => openComponentModal('socialMedia')}>Edit</button>
                    <button class="btn btn-sm {settings.components.socialMedia.enabled ? 'btn-error' : 'btn-success'}" on:click={() => toggleComponent('socialMedia')}>
                      {settings.components.socialMedia.enabled ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      {/if}
      
      <!-- Checkout Tab -->
      {#if activeTab === 'checkout'}
        <div class="p-6 space-y-6">
          <h2 class="text-xl font-bold mb-4">Checkout Settings</h2>
          
          <div class="card bg-base-200">
            <div class="card-body">
              <div class="space-y-4">
                <!-- Guest Checkout -->
                <div class="form-control">
                  <label class="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" bind:checked={settings.checkout.guestCheckout} class="toggle toggle-primary" />
                    <div>
                      <span class="label-text font-medium">Guest Checkout</span>
                      <p class="text-sm text-base-content/60">Allow customers to check out without creating an account</p>
                    </div>
                  </label>
                </div>
                
                <!-- Express Checkout -->
                <div class="form-control">
                  <label class="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" bind:checked={settings.checkout.expressCheckout} class="toggle toggle-primary" />
                    <div>
                      <span class="label-text font-medium">Express Checkout</span>
                      <p class="text-sm text-base-content/60">Enable one-click checkout options (Apple Pay, Google Pay, etc.)</p>
                    </div>
                  </label>
                </div>
                
                <!-- Order Confirmation Email -->
                <div class="form-control">
                  <label class="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" bind:checked={settings.checkout.orderConfirmationEmail} class="toggle toggle-primary" />
                    <div>
                      <span class="label-text font-medium">Order Confirmation Emails</span>
                      <p class="text-sm text-base-content/60">Send confirmation emails to customers after purchase</p>
                    </div>
                  </label>
                </div>
                
                <!-- Abandoned Cart Recovery -->
                <div class="form-control">
                  <label class="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" bind:checked={settings.checkout.abandonedCartEmails} class="toggle toggle-primary" />
                    <div>
                      <span class="label-text font-medium">Abandoned Cart Recovery</span>
                      <p class="text-sm text-base-content/60">Send reminder emails to customers who abandon their carts</p>
                    </div>
                  </label>
                </div>
                
                <!-- Order Notes -->
                <div class="form-control">
                  <label class="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" bind:checked={settings.checkout.orderNotes} class="toggle toggle-primary" />
                    <div>
                      <span class="label-text font-medium">Order Notes</span>
                      <p class="text-sm text-base-content/60">Allow customers to add notes to their orders</p>
                    </div>
                  </label>
                </div>
                
                <!-- Estimated Delivery -->
                <div class="form-control">
                  <label class="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" bind:checked={settings.checkout.showEstimatedDelivery} class="toggle toggle-primary" />
                    <div>
                      <span class="label-text font-medium">Show Estimated Delivery</span>
                      <p class="text-sm text-base-content/60">Display estimated delivery dates during checkout</p>
                    </div>
                  </label>
                </div>
                
                <!-- Minimum Order Value -->
                <div class="form-control w-full max-w-xs">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Minimum Order Value</span>
                  </label>
                  <div class="input-group">
                    <span>$</span>
                    <input type="number" bind:value={settings.checkout.minimumOrderValue} min="0" class="input input-bordered w-full" />
                  </div>
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Set to 0 for no minimum</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Shipping Tab -->
      {#if activeTab === 'shipping'}
        <div class="p-6 space-y-6">
          <h2 class="text-xl font-bold mb-4">Shipping Settings</h2>
          
          <!-- Shipping Options -->
          <div class="card bg-base-200">
            <div class="card-body">
              <h3 class="card-title text-lg">Shipping Options</h3>
              
              <div class="space-y-4 mt-2">
                <!-- Free Shipping Threshold -->
                <div class="form-control w-full max-w-xs">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Free Shipping Threshold</span>
                  </label>
                  <div class="input-group">
                    <span>$</span>
                    <input type="number" bind:value={settings.shipping.freeShippingThreshold} min="0" class="input input-bordered w-full" />
                  </div>
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Set to 0 to disable free shipping</span>
                  </label>
                </div>
                
                <!-- Shipping Calculator -->
                <div class="form-control">
                  <label class="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" bind:checked={settings.shipping.displayShippingCalculator} class="toggle toggle-primary" />
                    <div>
                      <span class="label-text font-medium">Display Shipping Calculator</span>
                      <p class="text-sm text-base-content/60">Allow customers to estimate shipping costs before checkout</p>
                    </div>
                  </label>
                </div>
                
                <!-- International Shipping -->
                <div class="form-control">
                  <label class="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" bind:checked={settings.shipping.internationalShipping} class="toggle toggle-primary" />
                    <div>
                      <span class="label-text font-medium">Enable International Shipping</span>
                      <p class="text-sm text-base-content/60">Allow shipping to international addresses</p>
                    </div>
                  </label>
                </div>
                
                <!-- Shipping Origin -->
                <div class="form-control w-full max-w-md">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Shipping Origin</span>
                  </label>
                  <select bind:value={settings.shipping.shippingOrigin} class="select select-bordered w-full">
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Japan">Japan</option>
                  </select>
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Country where products are shipped from</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Inventory Tab -->
      {#if activeTab === 'inventory'}
      <div class="p-6 space-y-6">
        <h2 class="text-xl font-bold mb-4">Inventory Settings</h2>
        <!-- Inventory Management -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h3 class="card-title text-lg">Inventory Management</h3>
            
            <div class="space-y-4 mt-2">
              <!-- Low Stock Threshold -->
              <div class="form-control w-full max-w-xs">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="label">
                  <span class="label-text">Low Stock Threshold</span>
                </label>
                <input type="number" bind:value={settings.inventory.lowStockThreshold} min="0" class="input input-bordered w-full" />
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="label">
                  <span class="label-text-alt text-base-content/60">Number of items that triggers low stock alert</span>
                </label>
              </div>
              
              <!-- Show Out of Stock Products -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" bind:checked={settings.inventory.showOutOfStock} class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Show Out of Stock Products</span>
                    <p class="text-sm text-base-content/60">Display products that are currently out of stock</p>
                  </div>
                </label>
              </div>
              
              <!-- Low Stock Notifications -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" bind:checked={settings.inventory.notifyLowStock} class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Low Stock Notifications</span>
                    <p class="text-sm text-base-content/60">Receive email alerts when products reach low stock threshold</p>
                  </div>
                </label>
              </div>
              
              <!-- Additional Inventory Settings -->
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Automatic Inventory Updates</span>
                    <p class="text-sm text-base-content/60">Automatically update inventory after each order</p>
                  </div>
                </label>
              </div>
              
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Allow Backorders</span>
                    <p class="text-sm text-base-content/60">Allow customers to purchase out-of-stock items</p>
                  </div>
                </label>
              </div>
              
              <div class="form-control w-full max-w-xs">
                <!-- svelte-ignore a11y_label_has_associated_control -->
                <label class="label">
                  <span class="label-text">Stock Status Display Format</span>
                </label>
                <select class="select select-bordered w-full">
                  <option value="text">Text Only (In Stock/Out of Stock)</option>
                  <option value="numeric">Numeric (5 in stock)</option>
                  <option value="badge">Badge</option>
                  <option value="none">Don't Display</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Inventory Reports -->
        <div class="card bg-base-200">
          <div class="card-body">
            <h3 class="card-title text-lg">Inventory Reports</h3>
            
            <div class="space-y-4 mt-2">
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Weekly Inventory Reports</span>
                    <p class="text-sm text-base-content/60">Receive weekly reports of inventory status and trends</p>
                  </div>
                </label>
              </div>
              
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Product Performance Analysis</span>
                    <p class="text-sm text-base-content/60">Include product performance metrics in inventory reports</p>
                  </div>
                </label>
              </div>
              
              <button class="btn btn-outline mt-4">Download Latest Inventory Report</button>
            </div>
          </div>
        </div>
      </div>
    {/if}
      {#if activeTab === 'analytics'}
        <div class="p-6 space-y-6">
          <h2 class="text-xl font-bold mb-4">Analytics Settings</h2>
          
          <div class="card bg-base-200">
            <div class="card-body">
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-4">
                  <input type="checkbox" bind:checked={settings.analytics.enabled} class="toggle toggle-primary" />
                  <div>
                    <span class="label-text font-medium">Enable Analytics</span>
                    <p class="text-sm text-base-content/60">Track user behavior and sales data</p>
                  </div>
                </label>
              </div>
              
              {#if settings.analytics.enabled}
                <div class="form-control w-full max-w-md mt-4">
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text">Tracking ID</span>
                  </label>
                  <input type="text" bind:value={settings.analytics.trackingID} placeholder="UA-XXXXXXX-X" class="input input-bordered w-full" />
                  <!-- svelte-ignore a11y_label_has_associated_control -->
                  <label class="label">
                    <span class="label-text-alt text-base-content/60">Enter your Google Analytics tracking ID</span>
                  </label>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/if}
      
      <!-- Save Button -->
      <div class="bg-base-300 p-4 md:p-6 border-t border-base-300 flex justify-end">
        <button class="btn btn-primary w-full sm:w-auto" on:click={saveSettings}>Save Changes</button>
      </div>
    </div>
  </div>
  
  <!-- Success Toast -->
  <div id="success-toast" class="toast toast-center md:toast-end hidden">
    <div class="alert alert-success max-w-xs">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span>Settings saved successfully!</span>
    </div>
  </div>
  
  <!-- Component Edit Modals -->
  {#if activeModal === 'featuredProducts'}
    <div class="modal modal-open">
      <div class="modal-box w-11/12 max-w-md mx-auto">
        <h3 class="font-bold text-lg">Featured Products Settings</h3>
        
        <div class="form-control mt-4">
          <!-- svelte-ignore a11y_label_has_associated_control -->
          <label class="label">
            <span class="label-text">Number of products to display</span>
          </label>
          <input type="number" bind:value={editingComponent.limit} min="1" max="12" class="input input-bordered" />
        </div>
        
        <div class="form-control mt-4">
          <label class="label cursor-pointer justify-start gap-4">
            <input type="checkbox" bind:checked={editingComponent.showPrices} class="checkbox" />
            <span class="label-text">Show product prices</span>
          </label>
        </div>
        
        <div class="modal-action">
          <button class="btn" on:click={() => activeModal = null}>Cancel</button>
          <button class="btn btn-primary" on:click={saveComponentChanges}>Save</button>
        </div>
      </div>
    </div>
  {/if}
  
  {#if activeModal === 'reviews'}
    <div class="modal modal-open">
      <div class="modal-box w-11/12 max-w-md mx-auto">
        <h3 class="font-bold text-lg">Product Reviews Settings</h3>
        
        <div class="form-control mt-4">
          <label class="label cursor-pointer justify-start gap-4">
            <input type="checkbox" bind:checked={editingComponent.moderation} class="checkbox" />
            <span class="label-text">Enable review moderation</span>
          </label>
          <!-- svelte-ignore a11y_label_has_associated_control -->
          <label class="label">
            <span class="label-text-alt text-base-content/60">Requires admin approval before reviews are public</span>
          </label>
        </div>
        
        <div class="modal-action">
          <button class="btn" on:click={() => activeModal = null}>Cancel</button>
          <button class="btn btn-primary" on:click={saveComponentChanges}>Save</button>
        </div>
      </div>
    </div>
  {/if}
  
  {#if activeModal === 'newsletter'}
    <div class="modal modal-open">
      <div class="modal-box w-11/12 max-w-md mx-auto">
        <h3 class="font-bold text-lg">Newsletter Settings</h3>
        
        <div class="form-control mt-4">
          <!-- svelte-ignore a11y_label_has_associated_control -->
          <label class="label">
            <span class="label-text">Popup delay (seconds)</span>
          </label>
          <input type="number" bind:value={editingComponent.popupDelay} min="0" max="60" class="input input-bordered" />
          <!-- svelte-ignore a11y_label_has_associated_control -->
          <label class="label">
            <span class="label-text-alt text-base-content/60">How long to wait before showing the newsletter popup (0 to disable popup)</span>
          </label>
        </div>
        
        <div class="modal-action">
          <button class="btn" on:click={() => activeModal = null}>Cancel</button>
          <button class="btn btn-primary" on:click={saveComponentChanges}>Save</button>
        </div>
      </div>
    </div>
  {/if}
  
  {#if activeModal === 'productRecommendations' || activeModal === 'socialMedia'}
    <div class="modal modal-open">
      <div class="modal-box w-11/12 max-w-md mx-auto">
        <h3 class="font-bold text-lg">{activeModal === 'productRecommendations' ? 'Product Recommendations' : 'Social Media'} Settings</h3>
        
        <p class="py-4">Configure additional settings for this component.</p>
        
        <div class="modal-action">
          <button class="btn" on:click={() => activeModal = null}>Cancel</button>
          <button class="btn btn-primary" on:click={saveComponentChanges}>Save</button>
        </div>
      </div>
    </div>
  {/if}
</div>