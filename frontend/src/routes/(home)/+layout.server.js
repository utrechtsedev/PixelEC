export async function load({ fetch }) {
    const [siteSettingsRes, productsRes, categoriesRes] = await Promise.all([
      fetch('/api/settings'),
      fetch('/api/products'),
      fetch('/api/categories')
    ]);
    
    if (!siteSettingsRes.ok || !productsRes.ok || !categoriesRes.ok) {
      throw new Error('Failed to load data');
    }
    
    const siteSettings = await siteSettingsRes.json();
    const products = await productsRes.json();
    const rawCategories = await categoriesRes.json();
    
    const categories = rawCategories.map(category => {
      const primaryImage = category.CategoryImages.find(img => img.is_primary === true) || 
                           (category.CategoryImages.length > 0 ? category.CategoryImages[0] : null);
      
      return {
        ...category,
        CategoryImages: primaryImage
      };
    });
    
    return {
      siteSettings,
      products,
      categories
    };
  }