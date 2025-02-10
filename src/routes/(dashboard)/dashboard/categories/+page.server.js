export const load = async ({ fetch }) => {
    try {
        const res = await fetch('http://localhost:5000/categories');
        if (!res.ok) throw new Error('Kon orders niet ophalen');
        
        const apiData = await res.json();

        const formattedData = apiData.map(item => ({
            category_id: item.category_id,
            name: item.name,
            description: item.description,
            parent_id: item.parent_id,
            created_at: item.created_at,
        }));
        console.log(formattedData);
        return {data: formattedData}; // Direct de array retourneren
        
    } catch (err) {
        return {
            status: 500,
            error: err.message
        };
    }
}