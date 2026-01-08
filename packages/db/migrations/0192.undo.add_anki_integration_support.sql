-- Type: UNDO
-- Name: add_anki_integration_support
-- Description: Remove ANKI value from integration_type enum
-- Note: PostgreSQL does not support removing enum values directly.
-- This migration drops all ANKI integrations and recreates the enum without ANKI.

BEGIN;

-- Delete any integrations using ANKI type
DELETE FROM omnivore.integrations WHERE type = 'ANKI';

-- Recreate enum without ANKI (PostgreSQL limitation: cannot remove enum values)
ALTER TABLE omnivore.integrations
    ALTER COLUMN type TYPE VARCHAR(20) USING type::VARCHAR(20);

DROP TYPE omnivore.integration_type;

CREATE TYPE omnivore.integration_type AS ENUM ('EXPORT', 'IMPORT');

ALTER TABLE omnivore.integrations
    ALTER COLUMN type TYPE omnivore.integration_type
    USING type::omnivore.integration_type;

COMMIT;
