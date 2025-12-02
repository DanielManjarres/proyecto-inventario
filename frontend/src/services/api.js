const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  async getCategories() {
    const res = await fetch(`${API_URL}/categories`);
    return res.json();
  },

  async createCategory(data) {
    const res = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateCategory(id, data) {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteCategory(id) {
    await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE' });
  },

  async getProducts() {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
  },

  async createProduct(data) {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateProduct(id, data) {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteProduct(id) {
    await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
  },
};