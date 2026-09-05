CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN
  CREATE TYPE appointment_status AS ENUM ('PENDING','CONFIRMED','CANCELLED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  service text NOT NULL,
  message text,
  status appointment_status NOT NULL DEFAULT 'PENDING',
  admin_note text,
  confirmed_at timestamptz,
  cancelled_at timestamptz
);

CREATE INDEX IF NOT EXISTS appointments_created_at_idx ON appointments(created_at DESC);
CREATE INDEX IF NOT EXISTS appointments_status_idx ON appointments(status);
CREATE INDEX IF NOT EXISTS appointments_preferred_date_idx ON appointments(preferred_date);
