import { query } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return Response.json({ error: "Missing user_id" }, { status: 400 });
    }

    const userResult = await query(
      `SELECT user_id, username, points, updated_at
       FROM users
       WHERE user_id = $1`,
      [userId],
    );

    if (userResult.rows.length === 0) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const historyResult = await query(
      `SELECT points, reason, admin_id, created_at
       FROM rewards
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 10`,
      [userId],
    );

    return Response.json({
      user_id: userResult.rows[0].user_id,
      username: userResult.rows[0].username,
      total_points: userResult.rows[0].points,
      last_updated: userResult.rows[0].updated_at,
      recent_rewards: historyResult.rows,
    });
  } catch (error) {
    console.error("Error fetching user points:", error);
    return Response.json(
      { error: "Failed to fetch user points" },
      { status: 500 },
    );
  }
}