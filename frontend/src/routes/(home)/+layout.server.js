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
    const categories = await categoriesRes.json();
    return {
        siteSettings,
        products,
        categories
    };
}