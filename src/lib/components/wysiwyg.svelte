<script>
    export let content = '';
    let editorRef;
  
    const format = (command, value = null) => {
      document.execCommand(command, false, value);
      editorRef.focus();
    };
  
    const clearFormat = () => {
      // First remove all formatting
      format('removeFormat');
      
      // Explicitly convert block elements to divs
      format('formatBlock', '<div>');
      
      // Convert any remaining block elements to paragraphs
      format('formatBlock', '<p>');
    };
  
    // Alignment handlers
    const alignLeft = () => format('justifyLeft');
    const alignCenter = () => format('justifyCenter');
    const alignRight = () => format('justifyRight');
  </script>
  
  <div class="w-full">
    <!-- Toolbar -->
    <div class="flex flex-wrap gap-1 p-2 bg-base-300 rounded-t-lg border border-base-300">
      <!-- Headers -->
      <button on:click={() => format('formatBlock', 'h1')} class="btn btn-xs btn-primary">
        H1
      </button>
      <button on:click={() => format('formatBlock', 'h2')} class="btn btn-xs btn-primary">
        H2
      </button>
      <button on:click={() => format('formatBlock', 'h3')} class="btn btn-xs btn-primary">
        H3
      </button>
      
      <div class="divider divider-horizontal mx-1"></div>
      
      <!-- Text Formatting -->
      <button on:click={() => format('bold')} class="btn btn-xs">
        <span class="font-bold">B</span>
      </button>
      <button on:click={() => format('italic')} class="btn btn-xs">
        <em class="italic">I</em>
      </button>
      <button on:click={() => format('underline')} class="btn btn-xs">
        <u>U</u>
      </button>
      <button on:click={() => format('strikeThrough')} class="btn btn-xs">
        <s>S</s>
      </button>
      
      <div class="divider divider-horizontal mx-1"></div>
      
      <!-- Alignment -->
      <button on:click={alignLeft} class="btn btn-xs">
        ←
      </button>
      <button on:click={alignCenter} class="btn btn-xs">
        ↔
      </button>
      <button on:click={alignRight} class="btn btn-xs">
        →
      </button>
      
      <div class="divider divider-horizontal mx-1"></div>
      
      <button on:click={clearFormat} class="btn btn-xs btn-error">
        Clear
      </button>
    </div>
  
    <!-- Editor -->
    <div
      bind:this={editorRef}
      contenteditable="true"
      on:input={(e) => (content = e.target.innerHTML)}
      class="w-full p-4 min-h-[200px] border-8 border-base-300 rounded-b-lg prose 
            focus:outline-none"
    ></div>
    </div>
  
    <!-- HTML Output Preview -->

    <!-- <div class="mt-4 p-4 bg-base-200 rounded-lg">
      <pre class="text-sm">{content}</pre>
    </div> -->