"use client";
import { useEffect, useState } from "react";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState({ producto: "", cantidad: 1 });

  useEffect(() => {
    fetch("/api/pedidos")
      .then((res) => res.json())
      .then(setPedidos);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/pedidos", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    location.reload();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Gestión de Pedidos</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          placeholder="Producto"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, producto: e.target.value })}
        />
        <input
          type="number"
          placeholder="Cantidad"
          className="border p-2 w-full"
          onChange={(e) => setForm({ ...form, cantidad: parseInt(e.target.value) })}
        />
        <button className="bg-green-600 text-white p-2 rounded">Registrar Pedido</button>
      </form>

      <ul className="mt-6">
        {pedidos.map((p) => (
          <li key={p.id_orders} className="border p-2 mb-2">
            {p.producto} — {p.cantidad} unidades — Total: ${p.total}
          </li>
        ))}
      </ul>
    </div>
  );
}
