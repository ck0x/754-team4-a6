import { query } from "@/lib/db";
import { LeaderboardEntry } from "@/types/user";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get("limit") || "100", 10);
    const offset = parseInt(url.searchParams.get("offset") || "0", 10);

    if (limit < 1 || limit > 1000) {
      return Response.json(
        { error: "Limit must be between 1 and 1000" },
        { status: 400 },
      );
    }

    const result = await query(
      `SELECT 
        ROW_NUMBER() OVER (ORDER BY points DESC) as rank,
        user_id,
        username,
        points
      FROM users
      ORDER BY points DESC
      LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    const total = await query("SELECT COUNT(*) FROM users");

    return Response.json({
      data: result.rows as LeaderboardEntry[],
      total: parseInt(total.rows[0].count, 10),
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return Response.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 },
    );
  }
}
