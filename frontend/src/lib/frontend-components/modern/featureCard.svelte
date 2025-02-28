<script>
    import { onMount } from 'svelte';
  
    // Array of feature data (could be passed as props if dynamic)
    const features = [
      {
        title: 'Free Standard Delivery',
        description: 'Phasellus malesuada de pulvinar maecenas',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-24 h-24"><path fill="currentColor" d="M10 2a1.75 1.75 0 1 0 0 3.5h4A1.75 1.75 0 1 0 14 2zM3.863 16.205c-.858-3.432-1.287-5.147-.386-6.301S6.147 8.75 9.684 8.75h4.63c3.538 0 5.307 0 6.208 1.154s.472 2.87-.386 6.301c-.546 2.183-.819 3.274-1.633 3.91c-.813.635-1.938.635-4.188.635h-4.63c-2.25 0-3.376 0-4.19-.635c-.813-.636-1.086-1.727-1.632-3.91" opacity="0.5" /><path fill="currentColor" d="M15.58 4.502a1.74 1.74 0 0 0 .002-1.501c.683.005 1.216.036 1.692.222a3.25 3.25 0 0 1 1.426 1.09c.367.494.54 1.127.776 1.998l.047.17l.512 2.964c-.408-.282-.935-.45-1.617-.55l-.361-2.087c-.284-1.04-.387-1.367-.561-1.601a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118M8.418 3a1.74 1.74 0 0 0 .002 1.502c-.662.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.174.234-.277.561-.56 1.6l-.362 2.089c-.681.1-1.208.267-1.617.548l.512-2.962l.047-.17c.237-.872.41-1.506.776-2a3.25 3.25 0 0 1 1.426-1.089c.476-.186 1.008-.217 1.692-.222m.332 9.749a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0zM16 12a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4A.75.75 0 0 1 16 12m-3.25.75a.75.75 0 0 0-1.5 0v4a.75.75 0 0 0 1.5 0z" /></svg>`
      },
      {
        title: 'Free In Store Returns',
        description: 'Phasellus malesuada de pulvinar maecenas',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-24 h-24"><path fill="currentColor" d="M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073l-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709z" /><path fill="currentColor" d="m17.577 4.432l-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641" opacity="0.7" /><path fill="currentColor" d="m21.403 7.14l-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802" opacity="0.5" /><path fill="currentColor" d="m6.323 4.484l.1-.052l1.493-.784l9.1 5.005l4.025-2.011q.205.232.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3 3 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824q.156-.266.362-.498l9.04 4.52l3.387-1.693z" /></svg>`
      },
      {
        title: '100% Secure Checkout',
        description: 'Phasellus malesuada de pulvinar maecenas',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-24 h-24"><path fill="currentColor" d="M4.083 10.894c.439-2.34.658-3.511 1.491-4.203C6.408 6 7.598 6 9.98 6h4.04c2.383 0 3.573 0 4.407.691c.833.692 1.052 1.862 1.491 4.203l.75 4c.617 3.292.926 4.938.026 6.022S18.12 22 14.771 22H9.23c-3.349 0-5.024 0-5.923-1.084c-.9-1.084-.591-2.73.026-6.022z" opacity="0.5" /><path fill="currentColor" d="M9.75 5a2.25 2.25 0 0 1 4.5 0v1c.566 0 1.062.002 1.5.015V5a3.75 3.75 0 1 0-7.5 0v1.015C8.688 6.002 9.184 6 9.75 6zm5.836 6.969a.75.75 0 1 0-1.172-.937l-3.476 4.345L9.53 13.97a.75.75 0 1 0-1.06 1.06l2 2a.75.75 0 0 0 1.116-.062z" /></svg>`
      }
    ];
  
    let currentIndex = 0;
    const totalItems = features.length;
  
    function goPrev() {
      if (currentIndex > 0) currentIndex--;
    }
  
    function goNext() {
      if (currentIndex < totalItems - 1) currentIndex++;
    }
  </script>
  
  <div class="my-12">
    <div class="flex md:flex-row flex-col items-center justify-center relative">
      <div class="hidden md:flex w-full overflow-hidden">
        {#each features as feature}
          <div class="flex-1 flex flex-col items-center p-4">
            {@html feature.svg}
            <h4 class="text-2xl text-center font-bold">{feature.title}</h4>
            <p class="mt-4 text-center">{feature.description}</p>
            <p class="text-center"><a class="underline" href="/">Learn More</a></p>
          </div>
        {/each}
      </div>
  
      <div class="md:hidden w-full overflow-hidden relative">
        <div
          class="flex transition-transform duration-300 ease-in-out"
          style="transform: translateX(-{currentIndex * 100}%);"
        >
          {#each features as feature}
            <div class="flex-shrink-0 w-full flex flex-col items-center p-4">
              {@html feature.svg}
              <h4 class="text-2xl text-center font-bold">{feature.title}</h4>
              <p class="mt-4 text-center">{feature.description}</p>
              <p class="text-center"><a class="underline" href="/">Learn More</a></p>
            </div>
          {/each}
        </div>
  
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button
          on:click={goPrev}
          disabled={currentIndex === 0}
          class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full {currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m15 5l-6 7l6 7" />
        </svg>
        </button>
        <button
          on:click={goNext}
          disabled={currentIndex === totalItems - 1}
          class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full {currentIndex === totalItems - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}"
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...$$props}>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m9 5l6 7l-6 7" />
        </svg>
        </button>
      </div>
    </div>
  </div>
  
  <style>
    .flex {
      width: 100%;
    }
  </style>