import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);

  // Carga inicial de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${API_URL}/categories`),
          axios.get(`${API_URL}/products`)
        ]);
        setCategories(catRes.data);
        setProducts(prodRes.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
        alert("Error al conectar con la API");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshCategories = async () => {
    const res = await axios.get(`${API_URL}/categories`);
    setCategories(res.data);
  };

  const refreshProducts = async () => {
    const res = await axios.get(`${API_URL}/products`);
    setProducts(res.data);
  };

  const createCategory = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    if (!name) return;
    await axios.post(`${API_URL}/categories`, { name });
    e.target.reset();
    refreshCategories();
  };

  const createProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      description: form.description.value || null,
      price: Number(form.price.value),
      stock: Number(form.stock.value),
      categoryId: Number(form.categoryId.value)
    };
    await axios.post(`${API_URL}/products`, data);
    form.reset();
    refreshProducts();
  };

  const deleteProduct = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return;
    await axios.delete(`${API_URL}/products/${id}`);
    refreshProducts();
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-2xl">Cargando inventario...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-blue-700">
          Sistema de Inventario
        </h1>

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              activeTab === 'products' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white shadow'
            }`}
          >
            Productos
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              activeTab === 'categories' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white shadow'
            }`}
          >
            Categorías
          </button>
        </div>

        {activeTab === 'categories' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-8">Gestión de Categorías</h2>
            <form onSubmit={createCategory} className="flex gap-4 mb-10">
              <input
                name="name"
                placeholder="Nombre de la nueva categoría"
                required
                className="flex-1 border-2 border-gray-300 rounded-xl px-6 py-4 text-lg"
              />
              <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-bold text-lg transition">
                Crear Categoría
              </button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map(cat => (
                <div key={cat.id} className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl text-center font-semibold shadow-md">
                  {cat.name}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
              <h2 className="text-3xl font-bold mb-8">Agregar Nuevo Producto</h2>
              <form onSubmit={createProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="name" placeholder="Nombre del producto" required className="border-2 rounded-xl px-6 py-4" />
                <input name="description" placeholder="Descripción (opcional)" className="border-2 rounded-xl px-6 py-4" />
                <input name="price" type="number" step="0.01" placeholder="Precio" required className="border-2 rounded-xl px-6 py-4" />
                <input name="stock" type="number" placeholder="Stock inicial" required className="border-2 rounded-xl px-6 py-4" />
                <select name="categoryId" required className="border-2 rounded-xl px-6 py-4">
                  <option value="">Selecciona una categoría</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <button type="submit" className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white py-5 rounded-xl font-bold text-xl transition">
                  Guardar Producto
                </button>
              </form>
            </div>

            <h2 className="text-3xl font-bold mb-8 mb-8 text-center">Productos en Inventario</h2>
            {products.length === 0 ? (
              <p className="text-center text-xl text-gray-500 py-20">No hay productos registrados aún</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(p => (
                  <div key={p.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
                    <div className="bg-gray-200 border-2 border-dashed rounded-t-2xl w-full h-48" />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
                      <p className="text-gray-600 mb-4">{p.description || 'Sin descripción'}</p>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-3xl font-bold text-green-600">${p.price.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Stock: {p.stock} und</p>
                        </div>
                        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                          {p.category?.name || 'Sin categoría'}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;