import { expect } from 'chai'
import 'mocha'
import { parseHTML } from 'linkedom'
import { chunkHTMLContent, ContentChunk } from '../../src/utils/content-chunker'

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
})
