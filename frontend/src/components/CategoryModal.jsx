import { useState, useEffect } from "react";
import { api } from "../services/api.js";

export default function CategoryModal({ isOpen, onClose, categoryToEdit, onSuccess }) {
  const [name, setName] = useState("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.name || "");
    } else {
      setName("");
    }
  }, [categoryToEdit]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("El nombre es obligatorio");

    try {
      if (categoryToEdit) {
        await api.updateCategory(categoryToEdit.id, { name });
      } else {
        await api.createCategory({ name });
      }
      onSuccess();
      onClose();
    } catch {
      alert("Error al guardar categoría");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">
          {categoryToEdit ? "Editar Categoría" : "Nueva Categoría"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de la categoría"
            className="w-full px-3 py-2 border rounded-lg mb-4"
            autoFocus
          />

          <div className="flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
