export const metadata = {
  title: "Gestión DB2",
  description: "Parcial práctico con Next.js y PostgreSQL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <header className="p-4 bg-blue-600 text-white font-bold text-xl">
          Gestión DB2
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
