-- Add show_translated field to library_item to remember user's language preference per article
BEGIN;

ALTER TABLE omnivore.library_item
    ADD COLUMN IF NOT EXISTS show_translated boolean DEFAULT false;

COMMENT ON COLUMN omnivore.library_item.show_translated IS 'Whether to show translated content when viewing this article';

COMMIT;
