export const load = async ({ fetch }) => {
    try {
      const res = await fetch('http://localhost/api/products');
      if (!res.ok) throw new Error('Kon producten niet ophalen');
      const response = await res.json();
      
      // Controleer de structuur van de API-respons
      const products = response.products || response;
      
      return {
        products: products,
        success: true
      };
    } catch (err) {
      console.error('Error loading products:', err);
      return {
        products: [],
        success: false,
        error: err.message
      };
    }
  }