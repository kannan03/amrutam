-- Users table (patients + doctors both)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT CHECK (role IN ('user', 'doctor', 'admin')) DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Doctor Slots table (available times)
CREATE TABLE doctor_slots (
    id SERIAL PRIMARY KEY,
    doctor_id INT NOT NULL REFERENCES users(id),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    specialization TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Appointments table
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    doctor_id INT NOT NULL REFERENCES users(id),
    slot_id INT NOT NULL REFERENCES doctor_slots(id),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status TEXT CHECK (status IN ('booked', 'completed', 'cancelled')) DEFAULT 'booked',
    created_at TIMESTAMPTZ DEFAULT now()
);
