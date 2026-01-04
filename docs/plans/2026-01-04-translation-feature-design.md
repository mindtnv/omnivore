# Translation Feature Design

## Overview

Add automatic translation of article content to user's preferred language with in-reader language switching.

## Decisions

| Decision | Choice |
|----------|--------|
| Storage | Fields in LibraryItem entity |
| Trigger | Automatic on article save |
| Translation API | DeepSeek LLM (existing infrastructure) |

## Data Architecture

### LibraryItem Entity (new fields)

```typescript
translatedContent: string | null    // Translated HTML content
translatedLanguage: string | null   // Target language (ISO 639-1: "ru", "en")
translationStatus: 'pending' | 'processing' | 'completed' | 'failed' | null
```

### UserPersonalization Entity (new fields)

```typescript
preferredLanguage: string  // User's primary language (default: "en")
autoTranslate: boolean     // Auto-translate foreign content (default: false)
```

## Translation Job

File: `packages/api/src/jobs/translate-content.ts`

```typescript
export const TRANSLATE_CONTENT_JOB = 'translate-content-job'

export interface TranslateContentJobData {
  userId: string
  libraryItemId: string
  targetLanguage: string
}

export const translateContent = async (jobData: TranslateContentJobData) => {
  const llm = createLLM()
  if (!llm) return

  const item = await getLibraryItem(jobData.libraryItemId)
  const markdown = htmlToMarkdown(item.readableContent)

  // Split into chunks for long articles
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 4000 })
  const chunks = await splitter.splitText(markdown)

  const translatedChunks = await Promise.all(
    chunks.map(chunk => translateChunk(llm, chunk, jobData.targetLanguage))
  )

  const translatedHtml = markdownToHtml(translatedChunks.join('\n\n'))

  await updateLibraryItem(jobData.libraryItemId, {
    translatedContent: translatedHtml,
    translatedLanguage: jobData.targetLanguage,
    translationStatus: 'completed'
  })
}
```

### Translation Prompt

```
Translate the following article to {language}.
Preserve all formatting, links, and structure.
Do not add explanations, just translate.

{content}
```

## Trigger Logic

In `pubsub.ts`, after article is saved:

```typescript
if (type === EntityType.ITEM) {
  const userSettings = await getUserPersonalization(userId)

  if (userSettings.autoTranslate &&
      data.itemLanguage !== userSettings.preferredLanguage) {
    await enqueueTranslateContentJob({
      userId,
      libraryItemId: data.id,
      targetLanguage: userSettings.preferredLanguage
    })
  }
}
```

## UI Components

### 1. Language Toggle (Article Viewer)

Location: `ArticleContainer.tsx`

```tsx
<LanguageToggle
  originalLanguage={article.itemLanguage}
  translatedLanguage={article.translatedLanguage}
  hasTranslation={!!article.translatedContent}
  translationStatus={article.translationStatus}
  currentView={showTranslation ? 'translated' : 'original'}
  onToggle={() => setShowTranslation(!showTranslation)}
/>
```

Visual: `[EN 🌐 RU]` - clickable toggle

### 2. Translation Settings

Location: `pages/settings/account.tsx`

```tsx
<TranslationSettings>
  <Select label="Preferred Language" value={preferredLanguage}>
    <Option value="ru">Русский</Option>
    <Option value="en">English</Option>
    <Option value="de">Deutsch</Option>
    {/* ISO 639-1 languages */}
  </Select>

  <Checkbox
    label="Automatically translate articles in other languages"
    checked={autoTranslate}
  />
</TranslationSettings>
```

### 3. Status Badge (Library Cards)

Small badge on article cards: `🔄` (translating) or `🌐` (has translation)

## Database Migration

```sql
-- packages/db/migrations/0XXX_add_translation_fields.sql

ALTER TABLE omnivore.library_item
  ADD COLUMN translated_content TEXT,
  ADD COLUMN translated_language VARCHAR(10),
  ADD COLUMN translation_status VARCHAR(20);

ALTER TABLE omnivore.user_personalization
  ADD COLUMN preferred_language VARCHAR(10) DEFAULT 'en',
  ADD COLUMN auto_translate BOOLEAN DEFAULT false;

CREATE INDEX idx_library_item_translation_status
  ON omnivore.library_item(translation_status)
  WHERE translation_status IS NOT NULL;
```

## GraphQL Schema

```graphql
type Article {
  # existing fields...
  translatedContent: String
  translatedLanguage: String
  translationStatus: TranslationStatus
}

enum TranslationStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}

type UserPersonalization {
  # existing fields...
  preferredLanguage: String
  autoTranslate: Boolean
}

type Mutation {
  updatePreferredLanguage(language: String!): UserPersonalization
  requestTranslation(libraryItemId: ID!, targetLanguage: String!): Article
}
```

## Implementation Plan

### Phase 1: Backend (API)

1. Database migration - add fields
2. Update `LibraryItem` entity
3. Update `UserPersonalization` entity
4. Create `translate-content.ts` job
5. Register job in `queue-processor.ts`
6. Add trigger in `pubsub.ts`
7. Update GraphQL schema + resolvers

### Phase 2: Frontend (Web)

1. Add `TranslationSettings` to Settings page
2. Create `LanguageToggle` component
3. Integrate toggle in `ArticleContainer`
4. Add status badge to library cards
5. GraphQL queries for translation data

### Phase 3: Testing

1. Test long article translation (chunking)
2. Test different language pairs
3. API error handling

## Summary

| Component | Changes |
|-----------|---------|
| **DB** | 3 fields in library_item, 2 in user_personalization |
| **API** | 1 new job, 2 mutations, schema update |
| **Web** | 2 new components, settings section |
| **Dependencies** | None (uses existing LangChain) |
