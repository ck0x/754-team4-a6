export interface User {
  id: number;
  user_id: string;
  username: string;
  email: string;
  points: number;
  created_at: string;
  updated_at: string;
}

export interface Reward {
  id: number;
  user_id: string;
  points: number;
  reason?: string;
  admin_id?: string;
  created_at: string;
}

export interface LeaderboardEntry {
  rank: number;
  user_id: string;
  username: string;
  points: number;
}

export interface RewardRequest {
  user_id: string;
  points: number;
  reason?: string;
}
