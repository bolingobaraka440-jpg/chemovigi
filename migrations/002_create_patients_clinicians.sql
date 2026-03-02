-- Create patients and clinicians tables to store role-specific data
BEGIN;

CREATE TABLE IF NOT EXISTS public.patients (
  id uuid PRIMARY KEY,
  name text,
  email text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.clinicians (
  id uuid PRIMARY KEY,
  name text,
  email text,
  license_number text,
  specialty text,
  created_at timestamptz DEFAULT now()
);

COMMIT;
