import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM pedidos ORDER BY id_orders DESC"
    );
    return Response.json(result.rows);
  } catch (error) {
    return new Response("Error en GET pedidos: " + error.message, {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { producto, cantidad } = body;

    // Consultar valor unitario del producto
    const prodRes = await pool.query(
      "SELECT valor FROM productos WHERE nombre = $1",
      [producto]
    );
    if (prodRes.rows.length === 0) {
      return new Response("Producto no encontrado", { status: 404 });
    }

    const valor_u = prodRes.rows[0].valor;
    const total = valor_u * cantidad;

    // Insertar pedido
    const result = await pool.query(
      "INSERT INTO pedidos (producto, cantidad, valor_u, total) VALUES ($1, $2, $3, $4) RETURNING *",
      [producto, cantidad, valor_u, total]
    );

    // Actualizar stock
    await pool.query("UPDATE productos SET stock = stock - $1 WHERE nombre = $2", [
      cantidad,
      producto,
    ]);

    return Response.json(result.rows[0]);
  } catch (error) {
    return new Response("Error en POST pedidos: " + error.message, {
      status: 500,
    });
  }
}
