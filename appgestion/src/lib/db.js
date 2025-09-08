import { Pool } from "pg";

// Usa tu cadena de conexión .env
// Ejemplo: postgresql://usuario:password@localhost:5432/tu_base
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;


