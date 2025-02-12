export async function DELETE({ params, fetch }) {
    const { id } = params;
    
    // Stuur een DELETE request naar je Express backend
    const res = await fetch(`http://localhost:5000/categories/${id}`, {
      method: 'DELETE'
    });
    
    if (!res.ok) {
      console.log(res)
      const errorText = await res.text();
      return new Response(JSON.stringify({ error: errorText }), { status: 500 });
    }
    
    return new Response(JSON.stringify({ success: true }));
  }