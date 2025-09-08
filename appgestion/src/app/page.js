export default function HomePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Bienvenido al sistema</h1>
      <ul className="list-disc list-inside">
        <li><a href="/productos" className="text-blue-600 underline">Gestión de Productos</a></li>
        <li><a href="/pedidos" className="text-blue-600 underline">Gestión de Pedidos</a></li>
      </ul>
    </div>
  );
}
