-- Type: DO
-- Name: add_anki_integration_support
-- Description: Add ANKI value to integration_type enum for Anki flashcard integration

BEGIN;

-- Add 'ANKI' to the integration_type enum
ALTER TYPE omnivore.integration_type ADD VALUE IF NOT EXISTS 'ANKI';

COMMIT;
