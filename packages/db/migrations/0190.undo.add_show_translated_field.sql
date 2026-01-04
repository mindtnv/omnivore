-- Remove show_translated field from library_item
BEGIN;

ALTER TABLE omnivore.library_item
    DROP COLUMN IF EXISTS show_translated;

COMMIT;
