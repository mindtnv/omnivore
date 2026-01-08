import { AnkiConnectClient } from './integrations/anki'
import { logger } from '../utils/logger'

export const OMNIVORE_MODEL_NAME = 'Omnivore Enhanced'

/**
 * CSS styling for Omnivore Anki cards with beautiful formatting
 */
const OMNIVORE_CARD_CSS = `
.card {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #2c3e50;
  background: #ffffff;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.question {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1a202c;
  border-left: 4px solid #4299e1;
  padding-left: 16px;
}

.answer {
  margin-bottom: 20px;
}

.context {
  background: #f7fafc;
  border-left: 3px solid #cbd5e0;
  padding: 12px 16px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #4a5568;
  border-radius: 4px;
}

.source {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #e2e8f0;
  font-size: 14px;
  color: #718096;
}

.source a {
  color: #4299e1;
  text-decoration: none;
}

.source a:hover {
  text-decoration: underline;
}

/* Markdown content styling */
code {
  background: #f7fafc;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 0.9em;
  color: #e53e3e;
}

pre {
  background: #2d3748;
  color: #e2e8f0;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 16px 0;
}

pre code {
  background: transparent;
  color: inherit;
  padding: 0;
}

blockquote {
  border-left: 4px solid #cbd5e0;
  padding-left: 16px;
  margin: 16px 0;
  color: #4a5568;
  font-style: italic;
}

strong, b {
  font-weight: 600;
  color: #1a202c;
}

em, i {
  font-style: italic;
  color: #2d3748;
}

ul, ol {
  margin: 12px 0;
  padding-left: 28px;
}

li {
  margin: 6px 0;
}

a {
  color: #4299e1;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
}

th, td {
  border: 1px solid #cbd5e0;
  padding: 10px;
  text-align: left;
}

th {
  background: #f7fafc;
  font-weight: 600;
}

/* Night mode support */
.night_mode .card {
  background: #1a202c;
  color: #e2e8f0;
}

.night_mode .question {
  color: #e2e8f0;
  border-left-color: #63b3ed;
}

.night_mode .context {
  background: #2d3748;
  border-left-color: #4a5568;
  color: #cbd5e0;
}

.night_mode .source {
  border-top-color: #4a5568;
  color: #a0aec0;
}

.night_mode code {
  background: #2d3748;
  color: #fc8181;
}

.night_mode pre {
  background: #1a1f2e;
}

.night_mode th {
  background: #2d3748;
}

.night_mode strong, .night_mode b {
  color: #e2e8f0;
}
`

/**
 * Front template for Omnivore cards
 */
const OMNIVORE_FRONT_TEMPLATE = `
<div class="card">
  <div class="question">{{Question}}</div>
  {{#Context}}
  <div class="context">
    <strong>Контекст:</strong><br>
    {{Context}}
  </div>
  {{/Context}}
</div>
`

/**
 * Back template for Omnivore cards
 */
const OMNIVORE_BACK_TEMPLATE = `
<div class="card">
  <div class="question">{{Question}}</div>

  <div class="answer">{{Answer}}</div>

  {{#Context}}
  <div class="context">
    <strong>Контекст:</strong><br>
    {{Context}}
  </div>
  {{/Context}}

  <div class="source">
    <strong>Источник:</strong> {{Source}}
  </div>
</div>
`

/**
 * Ensures the Omnivore Enhanced model exists in Anki, creates it if missing
 */
export async function ensureOmnivoreModel(
  ankiClient: AnkiConnectClient
): Promise<void> {
  try {
    const existingModels = await ankiClient.modelNames()

    if (existingModels.includes(OMNIVORE_MODEL_NAME)) {
      logger.info('Omnivore Enhanced model already exists')
      return
    }

    logger.info('Creating Omnivore Enhanced model')

    await ankiClient.createModel(
      OMNIVORE_MODEL_NAME,
      ['Question', 'Answer', 'Context', 'Source'],
      OMNIVORE_CARD_CSS,
      [
        {
          Name: 'Card 1',
          Front: OMNIVORE_FRONT_TEMPLATE,
          Back: OMNIVORE_BACK_TEMPLATE,
        },
      ]
    )

    logger.info('Omnivore Enhanced model created successfully')
  } catch (error) {
    logger.error('Failed to ensure Omnivore model', { error })
    // Don't throw - we'll fall back to Basic model if needed
  }
}
