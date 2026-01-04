-- Add translation support fields to library_item
ALTER TABLE omnivore.library_item
  ADD COLUMN IF NOT EXISTS translated_content TEXT,
  ADD COLUMN IF NOT EXISTS translated_language VARCHAR(10),
  ADD COLUMN IF NOT EXISTS translation_status VARCHAR(20);

-- Add translation preferences to user_personalization
ALTER TABLE omnivore.user_personalization
  ADD COLUMN IF NOT EXISTS preferred_language VARCHAR(10) DEFAULT 'en',
  ADD COLUMN IF NOT EXISTS auto_translate BOOLEAN DEFAULT false;

-- Index for finding items by translation status
CREATE INDEX IF NOT EXISTS idx_library_item_translation_status
  ON omnivore.library_item(translation_status)
  WHERE translation_status IS NOT NULL;
