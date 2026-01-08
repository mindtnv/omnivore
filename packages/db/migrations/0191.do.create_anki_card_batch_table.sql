-- Type: DO
-- Name: create_anki_card_batch_table
-- Description: Create anki_card_batch table for storing Anki card batches

BEGIN;

CREATE TYPE anki_card_status AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'WAITING_FOR_TRANSLATION');

CREATE TABLE omnivore.anki_card_batch (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v1mc(),
    library_item_id uuid NOT NULL REFERENCES omnivore.library_item ON DELETE CASCADE,
    user_id uuid NOT NULL REFERENCES omnivore.user ON DELETE CASCADE,
    anki_note_ids jsonb,
    deck text NOT NULL,
    card_count integer NOT NULL DEFAULT 0,
    status anki_card_status NOT NULL DEFAULT 'PENDING',
    language text,
    card_details jsonb,
    created_at timestamptz NOT NULL DEFAULT current_timestamp,
    updated_at timestamptz NOT NULL DEFAULT current_timestamp
);

CREATE TRIGGER update_anki_card_batch_modtime BEFORE UPDATE ON omnivore.anki_card_batch FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE INDEX anki_card_batch_library_item_id_idx ON omnivore.anki_card_batch (library_item_id);
CREATE INDEX anki_card_batch_user_id_status_idx ON omnivore.anki_card_batch (user_id, status);

ALTER TABLE omnivore.anki_card_batch ENABLE ROW LEVEL SECURITY;

CREATE POLICY anki_card_batch_policy ON omnivore.anki_card_batch
    USING (user_id = omnivore.get_current_user_id())
    WITH CHECK (user_id = omnivore.get_current_user_id());

GRANT SELECT, INSERT, UPDATE, DELETE ON omnivore.anki_card_batch TO omnivore_user;

COMMIT;
