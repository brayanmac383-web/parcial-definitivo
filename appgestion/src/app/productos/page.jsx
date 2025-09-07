"use client";
import { useEffect, useState } from "react";

export default function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: "", stock: 0, valor: 0 });

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then(setProductos);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/productos", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    location.reload();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Gestión de Productos</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          placeholder="Nombre"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) })}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Valor"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, valor: parseFloat(e.target.value) })}
        />
        <button className="bg-blue-600 text-white p-2 rounded">Agregar</button>
      </form>

      <ul className="mt-6">
        {productos.map((p) => (
          <li key={p.id_product} className="border p-2 mb-2">
            {p.nombre} — Stock: {p.stock} — ${p.valor}
          </li>
        ))}
      </ul>
    </div>
  );
}
