import { expect } from 'chai'
import 'mocha'
import { parseHTML } from 'linkedom'
import { chunkHTMLContent, ContentChunk, createTranslationContext } from '../../src/utils/content-chunker'
import { countTokens } from '../../src/utils/tokens'

describe('Content chunker', () => {
  describe('chunkHTMLContent', () => {
    it('creates single chunk for small content', () => {
      const html = '<div><p>Short paragraph.</p></div>'
      const { document } = parseHTML(html)
      const root = document.documentElement

      const chunks = chunkHTMLContent(root, 1000)

      expect(chunks).to.have.lengthOf(1)
      expect(chunks[0].html).to.include('Short paragraph')
      expect(chunks[0].tokenCount).to.be.greaterThan(0)
    })

    it('splits large content into multiple chunks', () => {
      const html = `<div>
        <p>${'A'.repeat(1000)}</p>
        <p>${'B'.repeat(1000)}</p>
        <p>${'C'.repeat(1000)}</p>
      </div>`
      const { document } = parseHTML(html)
      const root = document.documentElement

      const chunks = chunkHTMLContent(root, 500)

      expect(chunks.length).to.be.greaterThan(1)
      chunks.forEach((chunk: ContentChunk) => {
        expect(chunk.tokenCount).to.be.lessThanOrEqual(500)
      })
    })

    it('respects block boundaries', () => {
      const html = `<div>
        <p>First paragraph.</p>
        <h2>Section Title</h2>
        <p>Second paragraph.</p>
      </div>`
      const { document } = parseHTML(html)
      const root = document.documentElement

      const chunks = chunkHTMLContent(root, 1000)

      // Should keep semantic blocks together
      expect(chunks).to.have.lengthOf(1)
      expect(chunks[0].html).to.include('Section Title')
    })

    it('skips code blocks and technical elements', () => {
      const html = `<div>
        <p>Regular text.</p>
        <pre><code>function test() { return true; }</code></pre>
        <p>More text.</p>
      </div>`
      const { document } = parseHTML(html)
      const root = document.documentElement

      const chunks = chunkHTMLContent(root, 1000)

      expect(chunks[0].html).to.include('Regular text')
      expect(chunks[0].html).to.include('<code>')
      expect(chunks[0].html).to.include('More text')
    })

    it('handles empty content', () => {
      const html = '<div></div>'
      const { document } = parseHTML(html)
      const root = document.documentElement

      const chunks = chunkHTMLContent(root, 1000)

      expect(chunks).to.have.lengthOf(0)
    })
  })

  describe('createTranslationContext', () => {
    it('returns empty string when previousChunks is empty', () => {
      const context = createTranslationContext([])
      expect(context).to.equal('')
    })

    it('returns single chunk translation when only one chunk exists', () => {
      const chunks = [
        {
          original: '<p>Original text</p>',
          translated: '<p>Translated text</p>'
        }
      ]

      const context = createTranslationContext(chunks)
      expect(context).to.equal('<p>Translated text</p>')
    })

    it('returns both chunks when two chunks are within token limit', () => {
      const chunks = [
        {
          original: '<p>First paragraph</p>',
          translated: '<p>Premier paragraphe</p>'
        },
        {
          original: '<p>Second paragraph</p>',
          translated: '<p>Deuxième paragraphe</p>'
        }
      ]

      const context = createTranslationContext(chunks, 2, 2000)
      expect(context).to.include('Premier paragraphe')
      expect(context).to.include('Deuxième paragraphe')
    })

    it('truncates context when it exceeds maxContextTokens', () => {
      // Create a large chunk that exceeds the limit
      const largeText = '<p>' + 'A'.repeat(5000) + '</p>'
      const chunks = [
        {
          original: largeText,
          translated: largeText
        }
      ]

      const maxTokens = 100
      const context = createTranslationContext(chunks, 1, maxTokens)

      const tokenCount = countTokens(context)
      expect(tokenCount).to.be.lessThanOrEqual(maxTokens)
    })

    it('uses only last chunk when two chunks exceed limit', () => {
      const chunk1 = '<p>' + 'A'.repeat(3000) + '</p>'
      const chunk2 = '<p>' + 'B'.repeat(3000) + '</p>'
      const chunks = [
        {
          original: chunk1,
          translated: chunk1
        },
        {
          original: chunk2,
          translated: chunk2
        }
      ]

      const maxTokens = 500
      const context = createTranslationContext(chunks, 2, maxTokens)

      // Should contain chunk2 but not chunk1
      expect(context).to.include('B')
      expect(context).to.not.include('A')
    })

    it('respects windowSize parameter', () => {
      const chunks = [
        {
          original: '<p>First</p>',
          translated: '<p>Premier</p>'
        },
        {
          original: '<p>Second</p>',
          translated: '<p>Deuxième</p>'
        },
        {
          original: '<p>Third</p>',
          translated: '<p>Troisième</p>'
        }
      ]

      // Window size of 1 should only include last chunk
      const context = createTranslationContext(chunks, 1, 2000)
      expect(context).to.include('Troisième')
      expect(context).to.not.include('Premier')
      expect(context).to.not.include('Deuxième')
    })

    it('sliding window includes last N chunks', () => {
      const chunks = [
        {
          original: '<p>First</p>',
          translated: '<p>Premier</p>'
        },
        {
          original: '<p>Second</p>',
          translated: '<p>Deuxième</p>'
        },
        {
          original: '<p>Third</p>',
          translated: '<p>Troisième</p>'
        },
        {
          original: '<p>Fourth</p>',
          translated: '<p>Quatrième</p>'
        }
      ]

      // Window size of 2 should include last 2 chunks
      const context = createTranslationContext(chunks, 2, 2000)
      expect(context).to.include('Troisième')
      expect(context).to.include('Quatrième')
      expect(context).to.not.include('Premier')
      expect(context).to.not.include('Deuxième')
    })
  })
})
