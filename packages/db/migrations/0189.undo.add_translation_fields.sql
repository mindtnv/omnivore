-- Remove translation fields from library_item
ALTER TABLE omnivore.library_item
  DROP COLUMN IF EXISTS translated_content,
  DROP COLUMN IF EXISTS translated_language,
  DROP COLUMN IF EXISTS translation_status;

-- Remove translation preferences from user_personalization
ALTER TABLE omnivore.user_personalization
  DROP COLUMN IF EXISTS preferred_language,
  DROP COLUMN IF EXISTS auto_translate;

-- Drop index
DROP INDEX IF EXISTS omnivore.idx_library_item_translation_status;
