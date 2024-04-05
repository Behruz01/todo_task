CREATE TABLE todos (
    id uuid default uuid_generate_v4( ) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_id SERIAL,
    status VARCHAR(50) DEFAULT 'todo',
    estimate TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);