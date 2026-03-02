-- Add 'critical' to allowed severity values on reports
BEGIN;
ALTER TABLE public.reports DROP CONSTRAINT IF EXISTS reports_severity_check;
ALTER TABLE public.reports ADD CONSTRAINT reports_severity_check CHECK (
  (
    severity = ANY (ARRAY['mild'::text, 'moderate'::text, 'severe'::text, 'critical'::text])
  )
);
COMMIT;
