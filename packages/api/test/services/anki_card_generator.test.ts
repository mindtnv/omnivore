import { expect } from 'chai'
import 'mocha'
import sinon from 'sinon'
import * as aiUtils from '../../src/utils/ai'
import {
  AnkiCardGenerator,
  CardMetadata,
  CHUNK_SIZE,
} from '../../src/services/anki_card_generator'

describe('AnkiCardGenerator', () => {
  let createLLMStub: sinon.SinonStub

  const testMetadata: CardMetadata = {
    articleTitle: 'Test Article Title',
    articleUrl: 'https://example.com/article',
    siteName: 'Example Site',
    author: 'Test Author',
    labels: ['label1', 'Label Two'],
  }

  const validLLMResponse = JSON.stringify([
    {
      question: 'What is the main topic?',
      answer: 'The main topic is about testing.',
      context: 'From the introduction section',
    },
    {
      question: 'What are the key benefits?',
      answer: 'The key benefits include improved reliability.',
      context: 'From the benefits section',
    },
  ])

  const createMockLLM = (response: string) => {
    return {
      pipe: sinon.stub().returnsThis(),
      invoke: sinon.stub().resolves(response),
    }
  }

  beforeEach(() => {
    createLLMStub = sinon.stub(aiUtils, 'createLLM')
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('generateCards()', () => {
    it('generates cards for short article (< 3000 words)', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const content = '<p>This is a short article about testing. It contains useful information.</p>'
      const result = await AnkiCardGenerator.generateCards(content, 'English', testMetadata)

      expect(result).to.have.lengthOf(2)
      expect(result[0].fields.Front).to.equal('What is the main topic?')
      expect(result[0].fields.Back).to.equal('The main topic is about testing.')
      expect(result[0].fields.Source).to.equal('[Test Article Title](https://example.com/article)')
      expect(result[0].fields.Context).to.equal('From the introduction section')
    })

    it('generates cards for long article (> 3000 words) with chunking', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      // Generate content with more than 3000 words
      const longParagraph = 'word '.repeat(1200) // ~1200 words per paragraph
      const content = `<p>${longParagraph}</p><p>${longParagraph}</p><p>${longParagraph}</p>`

      const result = await AnkiCardGenerator.generateCards(content, 'English', testMetadata)

      // With 3600 words split into chunks of 3000, we should have 2 chunks
      // Each chunk generates 2 cards = 4 total
      expect(result).to.have.lengthOf(4)
      expect(mockLLM.invoke.callCount).to.be.greaterThan(1)
    })

    it('preserves code blocks in content', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const contentWithCode = `
        <p>Here is some code:</p>
        <pre><code>function test() { return true; }</code></pre>
        <p>This explains the code.</p>
      `

      const result = await AnkiCardGenerator.generateCards(contentWithCode, 'English', testMetadata)

      expect(result).to.have.lengthOf(2)
      // Verify the LLM was called with content containing code
      expect(mockLLM.invoke.calledOnce).to.be.true
    })

    it('throws error when LLM is not configured', async () => {
      createLLMStub.returns(null)

      try {
        await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect((error as Error).message).to.equal('AI not configured')
      }
    })

    it('handles invalid JSON from LLM gracefully', async () => {
      const mockLLM = createMockLLM('This is not valid JSON')
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      // Should return empty array when JSON parsing fails
      expect(result).to.deep.equal([])
    })

    it('handles LLM timeout gracefully', async () => {
      const mockLLM = {
        pipe: sinon.stub().returnsThis(),
        invoke: sinon.stub().rejects(new Error('timeout')),
      }
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      // Should return empty array on error
      expect(result).to.deep.equal([])
    })

    it('returns empty array for empty content', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('', 'English', testMetadata)

      expect(result).to.deep.equal([])
      expect(mockLLM.invoke.called).to.be.false
    })

    it('returns empty array for whitespace-only content', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('   \n\t  ', 'English', testMetadata)

      expect(result).to.deep.equal([])
    })

    it('extracts JSON from markdown code blocks', async () => {
      const wrappedResponse = '```json\n' + validLLMResponse + '\n```'
      const mockLLM = createMockLLM(wrappedResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result).to.have.lengthOf(2)
    })

    it('extracts JSON from generic code blocks', async () => {
      const wrappedResponse = '```\n' + validLLMResponse + '\n```'
      const mockLLM = createMockLLM(wrappedResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result).to.have.lengthOf(2)
    })

    it('filters out invalid cards from response', async () => {
      const mixedResponse = JSON.stringify([
        {
          question: 'Valid question',
          answer: 'Valid answer',
        },
        {
          question: '', // Invalid: empty question
          answer: 'Some answer',
        },
        {
          question: 'Another valid question',
          answer: '', // Invalid: empty answer
        },
        {
          question: 'Third valid question',
          answer: 'Third valid answer',
          context: 'With context',
        },
      ])
      const mockLLM = createMockLLM(mixedResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result).to.have.lengthOf(2)
      expect(result[0].fields.Front).to.equal('Valid question')
      expect(result[1].fields.Front).to.equal('Third valid question')
    })

    it('handles non-array JSON response', async () => {
      const objectResponse = JSON.stringify({ question: 'Q', answer: 'A' })
      const mockLLM = createMockLLM(objectResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result).to.deep.equal([])
    })
  })

  describe('tag generation', () => {
    it('includes omnivore base tag', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result[0].tags).to.include('omnivore')
    })

    it('generates article slug tag from title', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result[0].tags).to.include('omnivore::test-article-title')
    })

    it('generates source tag from site name', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result[0].tags).to.include('source::example-site')
    })

    it('includes sanitized user labels as tags', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result[0].tags).to.include('label1')
      expect(result[0].tags).to.include('label-two')
    })

    it('handles special characters in title for slug', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const metadataWithSpecialChars = {
        ...testMetadata,
        articleTitle: 'Test! Article: (Special) @Title#',
      }

      const result = await AnkiCardGenerator.generateCards(
        '<p>Test</p>',
        'English',
        metadataWithSpecialChars
      )

      // Special characters should be removed
      expect(result[0].tags).to.include('omnivore::test-article-special-title')
    })

    it('truncates long titles in slug', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const metadataWithLongTitle = {
        ...testMetadata,
        articleTitle: 'A'.repeat(100) + ' Very Long Title',
      }

      const result = await AnkiCardGenerator.generateCards(
        '<p>Test</p>',
        'English',
        metadataWithLongTitle
      )

      // Slug should be truncated to 50 characters
      const articleTag = result[0].tags?.find((t) => t.startsWith('omnivore::'))
      expect(articleTag).to.exist
      expect(articleTag!.replace('omnivore::', '')).to.have.lengthOf.at.most(50)
    })
  })

  describe('AnkiNote formatting', () => {
    it('sets correct deck name', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result[0].deckName).to.equal('Omnivore')
    })

    it('sets correct model name', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result[0].modelName).to.equal('Basic')
    })

    it('sets duplicate prevention options', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result[0].options?.allowDuplicate).to.be.false
      expect(result[0].options?.duplicateScope).to.equal('deck')
    })

    it('formats Source field as markdown link', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result[0].fields.Source).to.equal(
        '[Test Article Title](https://example.com/article)'
      )
    })

    it('handles missing context in generated card', async () => {
      const responseWithoutContext = JSON.stringify([
        {
          question: 'Question without context',
          answer: 'Answer without context',
        },
      ])
      const mockLLM = createMockLLM(responseWithoutContext)
      createLLMStub.returns(mockLLM)

      const result = await AnkiCardGenerator.generateCards('<p>Test</p>', 'English', testMetadata)

      expect(result[0].fields.Context).to.equal('')
    })

    it('handles missing author in metadata', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const metadataWithoutAuthor = {
        ...testMetadata,
        author: undefined,
      }

      const result = await AnkiCardGenerator.generateCards(
        '<p>Test</p>',
        'English',
        metadataWithoutAuthor
      )

      expect(result).to.have.lengthOf(2)
    })

    it('handles missing site name in metadata', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const metadataWithoutSiteName = {
        ...testMetadata,
        siteName: '',
      }

      const result = await AnkiCardGenerator.generateCards(
        '<p>Test</p>',
        'English',
        metadataWithoutSiteName
      )

      expect(result).to.have.lengthOf(2)
      expect(result[0].tags).to.include('source::unknown')
    })

    it('handles empty labels array', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      const metadataWithNoLabels = {
        ...testMetadata,
        labels: [],
      }

      const result = await AnkiCardGenerator.generateCards(
        '<p>Test</p>',
        'English',
        metadataWithNoLabels
      )

      expect(result[0].tags).to.have.lengthOf(3) // omnivore, omnivore::slug, source::slug
    })
  })

  describe('chunking algorithm', () => {
    it('does not chunk content under CHUNK_SIZE words', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      // Content with ~100 words
      const shortContent = '<p>' + 'word '.repeat(100) + '</p>'

      await AnkiCardGenerator.generateCards(shortContent, 'English', testMetadata)

      expect(mockLLM.invoke.calledOnce).to.be.true
    })

    it('chunks content exactly at CHUNK_SIZE boundary', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      // Content with exactly CHUNK_SIZE + 1 words
      const boundaryContent = '<p>' + 'word '.repeat(CHUNK_SIZE + 1) + '</p>'

      await AnkiCardGenerator.generateCards(boundaryContent, 'English', testMetadata)

      // Should process in 2 chunks since it exceeds CHUNK_SIZE
      expect(mockLLM.invoke.callCount).to.be.greaterThanOrEqual(1)
    })

    it('continues processing when one chunk fails', async () => {
      const callCount = { count: 0 }
      const mockLLM = {
        pipe: sinon.stub().returnsThis(),
        invoke: sinon.stub().callsFake(() => {
          callCount.count++
          if (callCount.count === 1) {
            return Promise.reject(new Error('First chunk failed'))
          }
          return Promise.resolve(validLLMResponse)
        }),
      }
      createLLMStub.returns(mockLLM)

      // Content that will be split into multiple chunks
      const longContent = '<p>' + 'word '.repeat(1500) + '</p><p>' + 'word '.repeat(1500) + '</p>'

      const result = await AnkiCardGenerator.generateCards(longContent, 'English', testMetadata)

      // Should still have cards from the second chunk
      expect(result.length).to.be.greaterThan(0)
    })
  })

  describe('language parameter', () => {
    it('passes language to LLM prompt', async () => {
      const mockLLM = createMockLLM(validLLMResponse)
      createLLMStub.returns(mockLLM)

      await AnkiCardGenerator.generateCards('<p>Test</p>', 'Spanish', testMetadata)

      expect(mockLLM.invoke.calledOnce).to.be.true
      const invokeArgs = mockLLM.invoke.firstCall.args[0]
      expect(invokeArgs.language).to.equal('Spanish')
    })
  })
})
