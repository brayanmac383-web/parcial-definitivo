import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM productos ORDER BY id_product DESC");
    return Response.json(result.rows);
  } catch (error) {
    return new Response("Error en GET productos: " + error.message, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { nombre, stock, valor } = body;

    const result = await pool.query(
      "INSERT INTO productos (nombre, stock, valor) VALUES ($1, $2, $3) RETURNING *",
      [nombre, stock, valor]
    );

    return Response.json(result.rows[0]);
  } catch (error) {
    return new Response("Error en POST productos: " + error.message, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const result = await pool.query("DELETE FROM productos WHERE id_product = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return new Response("Producto no encontrado", { status: 404 });
    }

    return Response.json({ message: "Producto eliminado" });
  } catch (error) {
    return new Response("Error en DELETE productos: " + error.message, { status: 500 });
  }
}
