-- Create the database schema for TaskFlow

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create boards table
CREATE TABLE IF NOT EXISTS boards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table with enum types
CREATE TYPE task_status AS ENUM ('todo', 'in-progress', 'completed');
CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high');

CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status task_status NOT NULL DEFAULT 'todo',
    priority task_priority NOT NULL DEFAULT 'medium',
    board_id UUID NOT NULL REFERENCES boards(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_boards_user_id ON boards(user_id);
CREATE INDEX IF NOT EXISTS idx_tasks_board_id ON tasks(board_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_boards_updated_at BEFORE UPDATE ON boards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data (optional)
INSERT INTO users (email, password, first_name, last_name) VALUES
('demo@taskflow.com', '$2b$10$K7L/VE6.LK6V6BqA5xmfKe7Yq5Q5rGfOQAMOQJHVJHVJHVJHVJHVJ', 'Demo', 'User')
ON CONFLICT (email) DO NOTHING;

-- Get the demo user ID for sample data
DO $$
DECLARE
    demo_user_id UUID;
    demo_board_id UUID;
BEGIN
    SELECT id INTO demo_user_id FROM users WHERE email = 'demo@taskflow.com';
    
    IF demo_user_id IS NOT NULL THEN
        -- Insert sample board
        INSERT INTO boards (name, description, user_id) VALUES
        ('My First Board', 'A sample board to get you started', demo_user_id)
        ON CONFLICT DO NOTHING
        RETURNING id INTO demo_board_id;
        
        -- If board was just created, add sample tasks
        IF demo_board_id IS NOT NULL THEN
            INSERT INTO tasks (title, description, status, priority, board_id) VALUES
            ('Welcome to TaskFlow', 'This is your first task! You can drag it between columns.', 'todo', 'high', demo_board_id),
            ('Create your first real task', 'Click "Add Task" to create a new task for your project.', 'todo', 'medium', demo_board_id),
            ('Explore the features', 'Try dragging tasks between columns and creating new boards.', 'in-progress', 'low', demo_board_id),
            ('Setup complete!', 'You have successfully set up TaskFlow.', 'completed', 'medium', demo_board_id);
        END IF;
    END IF;
END $$;