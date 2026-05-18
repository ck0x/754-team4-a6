import { query } from "@/lib/db";
import { RewardRequest } from "@/types/user";

export async function POST(request: Request) {
  try {
    const { user_id, points, reason, admin_id } =
      (await request.json()) as RewardRequest & {
        admin_id?: string;
      };

    if (!user_id || points === undefined || points === null) {
      return Response.json(
        { error: "Missing required fields: user_id and points" },
        { status: 400 },
      );
    }

    if (typeof points !== "number" || points <= 0) {
      return Response.json(
        { error: "Points must be a positive number" },
        { status: 400 },
      );
    }

    // Update user points and record reward in transaction
    const result = await query(
      `WITH reward_insert AS (
        INSERT INTO rewards (user_id, points, reason, admin_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      )
      UPDATE users
      SET points = points + $2, updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
      RETURNING *`,
      [user_id, points, reason || null, admin_id || null],
    );

    if (result.rows.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error rewarding user:", error);
    return Response.json({ error: "Failed to reward user" }, { status: 500 });
  }
}
