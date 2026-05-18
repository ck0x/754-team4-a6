# Points System - Performance Testing Assignment

A minimal point-based reward system built with Next.js, TypeScript, React, and Neon PostgreSQL for SOFTENG 754 Assignment 6.

## Features

- **Point System**: Award and track user points
- **Admin Dashboard**: Interface for admins to reward users
- **Leaderboard**: Real-time ranking of users by points
- **RESTful API**: Endpoints for points management

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Neon PostgreSQL
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## Setup

### 1. Environment Setup

Clone `.env.local.example` to `.env.local` and add your Neon database URL:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
DATABASE_URL=postgresql://user:password@ep-xxxxx.neon.tech/neondb
```

### 2. Install Dependencies

```bash
npm install
npm install @neondatabase/serverless
```

### 3. Database Setup

Run the SQL schema in `src/lib/database.sql` in your Neon console to create tables and indexes.

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create a new user
  ```json
  {
    "user_id": "user123",
    "username": "john_doe",
    "email": "john@example.com"
  }
  ```

### Rewards
- `POST /api/reward` - Award points to a user
  ```json
  {
    "user_id": "user123",
    "points": 10,
    "reason": "Completed assignment"
  }
  ```

### Leaderboard
- `GET /api/leaderboard?limit=100&offset=0` - Get leaderboard rankings

## Pages

- `/` - Home page
- `/leaderboard` - Public leaderboard view
- `/admin` - Admin dashboard for awarding points

## Directory Structure

```
src/
├── app/
│   ├── api/
│   │   ├── users/route.ts
│   │   ├── reward/route.ts
│   │   └── leaderboard/route.ts
│   ├── leaderboard/page.tsx
│   ├── admin/page.tsx
│   └── page.tsx
├── components/
│   ├── LeaderboardTable.tsx
│   ├── RewardForm.tsx
│   └── Navbar.tsx
├── lib/
│   ├── db.ts
│   └── database.sql
└── types/
    └── user.ts
```

## Performance Testing

This implementation supports performance testing with realistic workloads:
- Database schema optimized with indexes on frequently queried columns
- API endpoints designed for load testing
- Pagination support on leaderboard endpoint

See `src/test/resources/performancetest/` for JMeter test plans.

## Development Notes

- Database schema includes proper indexing for performance
- All endpoints return appropriate HTTP status codes
- Error handling with descriptive error messages
- Type-safe API and component development

## Team Contribution

Add contribution details in the final report under Task 1 deliverables.
