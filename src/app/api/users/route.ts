import { query } from "@/lib/db";
import { User } from "@/types/user";

export async function GET(request: Request) {
  try {
    const result = await query("SELECT * FROM users ORDER BY created_at DESC");
    return Response.json(result.rows as User[]);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { user_id, username, email } = await request.json();

    if (!user_id || !username || !email) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const result = await query(
      `INSERT INTO users (user_id, username, email, points)
       VALUES ($1, $2, $3, 0)
       RETURNING *`,
      [user_id, username, email],
    );

    return Response.json(result.rows[0] as User, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }
}
