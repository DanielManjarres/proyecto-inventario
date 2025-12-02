import { useState, useEffect } from "react";
import { api } from "../services/api.js";

export default function ProductModal({
  isOpen,
  onClose,
  productToEdit,
  categories,
  onSuccess,
}) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
  });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (productToEdit) {
      setForm({
        name: productToEdit.name || "",
        price: productToEdit.price || "",
        stock: productToEdit.stock || "",
        categoryId: productToEdit.categoryId || "",
      });
    } else {
      setForm({ name: "", price: "", stock: "", categoryId: "" });
    }
  }, [productToEdit]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock || !form.categoryId) {
      return alert("Todos los campos son obligatorios");
    }

    try {
      const data = {
        name: form.name,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        categoryId: parseInt(form.categoryId),
      };

      if (productToEdit) {
        await api.updateProduct(productToEdit.id, data);
      } else {
        await api.createProduct(data);
      }
      onSuccess();
      onClose();
    } catch {
      alert("Error al guardar producto");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {productToEdit ? "Editar Producto" : "Nuevo Producto"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            id="product-name"
            placeholder="Nombre"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            type="number"
            step="0.01"
            name="price"
            id="product-price"
            placeholder="Precio"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <input
            type="number"
            name="stock"
            id="product-stock"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => handleChange("stock", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          />

          <select
            name="categoryId"
            id="product-category"
            value={form.categoryId}
            onChange={(e) => handleChange("categoryId", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}