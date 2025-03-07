<script>

    export let data;
    let hero = JSON.parse(data.value)
</script>

<div class="flex justify-center items-center w-screen h-[80vh] bg-[url('//new-ella-demo.myshopify.com/cdn/shop/files/h7j1-image-banner-1.jpg')] bg-center bg-cover bg-no-repeat">
    <div class="text-center">
        <p class="underline ">{hero.upperText}</p>
        <h1>{hero.title}</h1>
        <p>{hero.underText}</p>
        <a href="{hero.buttonHref}">
            <button class="btn btn-primary mt-3">{hero.buttonText}</button>
        </a>    
    </div>
</div>