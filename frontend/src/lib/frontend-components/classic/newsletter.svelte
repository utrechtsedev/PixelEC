<script>
    let email = '';
    let subscribed = false;
    let error = '';
    
    function handleSubscribe() {
      if (!email || !email.includes('@')) {
        error = 'Please enter a valid email address';
        return;
      }
      
      // Simulate subscription success
      error = '';
      subscribed = true;
      
      // Reset after 5 seconds
      setTimeout(() => {
        subscribed = false;
        email = '';
      }, 5000);
    }
  </script>
  
  <section class="py-16 bg-primary text-primary-content">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto text-center">
        <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
        <p class="mb-8">Subscribe to our newsletter for exclusive deals and the latest tech news</p>
        
        {#if subscribed}
          <div class="alert alert-success shadow-lg max-w-md mx-auto">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Thank you for subscribing!</span>
            </div>
          </div>
        {:else}
          <form on:submit|preventDefault={handleSubscribe} class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div class="flex-grow">
              <input
                type="email"
                bind:value={email}
                placeholder="Your email address"
                class="input w-full bg-primary-content/20 placeholder-primary-content/60 border-primary-content/30 focus:border-primary-content"
                on:focus={() => error = ''}
              />
              {#if error}
                <p class="text-sm text-left mt-1 text-error-content">{error}</p>
              {/if}
            </div>
            <button type="submit" class="btn bg-primary-content text-primary hover:bg-primary-content/90">
              Subscribe
            </button>
          </form>
          
          <p class="text-sm mt-4 text-primary-content/70">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from Pixel Store.
          </p>
        {/if}
      </div>
    </div>
  </section>