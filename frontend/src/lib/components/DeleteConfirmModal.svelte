<script>
    import { createEventDispatcher } from 'svelte';
    
    export let title = "Verwijderen";
    export let message = "Weet je zeker dat je dit item wilt verwijderen?";
    
    const dispatch = createEventDispatcher();
    
    const handleCancel = () => {
      dispatch('cancel');
    };
    
    const handleConfirm = () => {
      dispatch('confirm');
    };
  </script>
  
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-base-100 p-6 rounded-lg max-w-md w-full">
      <h3 class="text-lg font-bold mb-4">{title}</h3>
      <p class="mb-6">{message}</p>
      <div class="flex justify-end gap-3">
        <button class="btn btn-ghost" on:click={handleCancel}>
          Annuleren
        </button>
        <button class="btn btn-error" on:click={handleConfirm}>
          Verwijderen
        </button>
      </div>
    </div>
  </div>