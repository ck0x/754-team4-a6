-- Create 5 test users 
INSERT INTO users (user_id, username, email, points)
VALUES
  ('user_001', 'alice_dev',   'alice@example.com',   0),
  ('user_002', 'bob_coder',   'bob@example.com',     0),
  ('user_003', 'carol_java',  'carol@example.com',   0),
  ('user_004', 'dave_oop',    'dave@example.com',    0),
  ('user_005', 'eve_learner', 'eve@example.com',     0)
ON CONFLICT (user_id) DO NOTHING;