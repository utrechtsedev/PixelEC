export const load = async ({ fetch }) => {
    try {
      const res = await fetch('/api/categories');
      if (!res.ok) throw new Error('Could not load categories');
      
      const apiData = await res.json();
      const formattedData = apiData.map(item => ({
        category_id: item.category_id,
        name: item.name,
        public_id: item.public_id,
        description: item.description || '',
        parent_id: item.parent_id,
        created_at: item.created_at,
      }));
      
      return { data: formattedData };
    } catch (err) {
      console.error('Error loading categories:', err);
      return {
        data: [],
        error: err.message
      };
    }
  }