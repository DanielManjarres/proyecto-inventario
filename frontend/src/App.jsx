import { useState, useEffect, useCallback } from "react";
import { api } from "./services/api.js";
import CategoryModal from "./components/CategoryModal.jsx";
import ProductModal from "./components/ProductModal.jsx";
import ConfirmModal from "./components/ConfirmModal.jsx";

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categoryModal, setCategoryModal] = useState({
    isOpen: false,
    category: null,
  });

  const [productModal, setProductModal] = useState({
    isOpen: false,
    product: null,
  });

  // MODAL DE CONFIRMACIÓN
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    message: "",
    onConfirm: () => {},
  });

  // ------------------------
  // CARGA DE DATOS PRINCIPAL
  // ------------------------
  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const [cats, prods] = await Promise.all([
        api.getCategories(),
        api.getProducts(),
      ]);

      setCategories(cats);
      setProducts(prods);
    } catch {
      alert("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSuccess = () => loadData();

  // ------------------------
  // ELIMINAR CATEGORÍA
  // ------------------------
  const deleteCategory = (id) => {
    setConfirmModal({
      isOpen: true,
      message: "¿Eliminar esta categoría y todos sus productos?",
      onConfirm: async () => {
        try {
          await api.deleteCategory(id);
          handleSuccess();
        } catch {
          alert("Error al eliminar categoría");
        }
      },
    });
  };

  // ------------------------
  // ELIMINAR PRODUCTO
  // ------------------------
  const deleteProduct = (id) => {
    setConfirmModal({
      isOpen: true,
      message: "¿Eliminar este producto?",
      onConfirm: async () => {
        try {
          await api.deleteProduct(id);
          handleSuccess();
        } catch {
          alert("Error al eliminar producto");
        }
      },
    });
  };

  // ------------------------
  // LOADING
  // ------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Cargando...
      </div>
    );
  }

  // ------------------------
  // UI PRINCIPAL
  // ------------------------
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-blue-700">
          Sistema de Inventario
        </h1>

        {/* CATEGORÍAS */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Categorías</h2>
            <button
              onClick={() =>
                setCategoryModal({ isOpen: true, category: null })
              }
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              + Nueva Categoría
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Nombre</th>
                  <th className="px-6 py-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{cat.id}</td>
                    <td className="px-6 py-4 font-medium">{cat.name}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          setCategoryModal({
                            isOpen: true,
                            category: cat,
                          })
                        }
                        className="text-blue-600 hover:underline mr-4"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PRODUCTOS */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Productos</h2>
            <button
              onClick={() =>
                setProductModal({ isOpen: true, product: null })
              }
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
            >
              + Nuevo Producto
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left">ID</th>
                  <th className="px-6 py-3 text-left">Nombre</th>
                  <th className="px-6 py-3 text-left">Precio</th>
                  <th className="px-6 py-3 text-left">Stock</th>
                  <th className="px-6 py-3 text-left">Categoría</th>
                  <th className="px-6 py-3 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{prod.id}</td>
                    <td className="px-6 py-4 font-medium">{prod.name}</td>

                    <td className="px-6 py-4 text-green-600 font-semibold">
                      ${prod.price.toLocaleString("es-CO")}
                    </td>

                    <td className="px-6 py-4">{prod.stock}</td>

                    <td className="px-6 py-4">
                      {prod.category?.name || "—"}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          setProductModal({
                            isOpen: true,
                            product: prod,
                          })
                        }
                        className="text-blue-600 hover:underline mr-4"
                      >
                        Editar
                      </button>

                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="text-red-600 hover:underline"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODALES */}
        <CategoryModal
          isOpen={categoryModal.isOpen}
          onClose={() =>
            setCategoryModal({ isOpen: false, category: null })
          }
          categoryToEdit={categoryModal.category}
          onSuccess={handleSuccess}
        />

        <ProductModal
          isOpen={productModal.isOpen}
          onClose={() =>
            setProductModal({ isOpen: false, product: null })
          }
          productToEdit={productModal.product}
          categories={categories}
          onSuccess={handleSuccess}
        />

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          message={confirmModal.message}
          onConfirm={confirmModal.onConfirm}
          onClose={() =>
            setConfirmModal({ isOpen: false, message: "", onConfirm: () => {} })
          }
        />
      </div>
    </div>
  );
}

export default App;