"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: "", stock: 0, valor: 0 });

  // Cargar productos
  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then(setProductos);
  }, []);

  // Crear producto
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/productos", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    location.reload();
  };

  // Eliminar producto (solo admin)
  const handleDelete = async (id) => {
    await fetch(`/api/productos?id=${id}`, { method: "DELETE" });
    location.reload();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Panel de Administrador</h1>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          placeholder="Nombre"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, stock: parseInt(e.target.value) })
          }
        />
        <input
          type="number"
          step="0.01"
          placeholder="Valor"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({ ...form, valor: parseFloat(e.target.value) })
          }
        />
        <button className="bg-blue-600 text-white p-2 rounded">
          Agregar Producto
        </button>
      </form>

      <ul>
        {productos.map((p) => (
          <li
            key={p.id_product}
            className="flex justify-between items-center border p-2 mb-2"
          >
            {p.nombre} — Stock: {p.stock} — ${p.valor}
            <button
              onClick={() => handleDelete(p.id_product)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
