import { expect } from 'chai'
import 'mocha'
import { countTokens, fitsInTokenLimit, truncateToTokenLimit } from '../../src/utils/tokens'

describe('Token utilities', () => {
  describe('countTokens', () => {
    it('counts tokens in simple text', () => {
      const text = 'Hello world'
      const count = countTokens(text)
      expect(count).to.be.greaterThan(0)
      expect(count).to.be.lessThan(10)
    })

    it('counts tokens in longer text', () => {
      const text = 'This is a longer piece of text with multiple sentences. It should have more tokens than the simple hello world example.'
      const count = countTokens(text)
      expect(count).to.be.greaterThan(15)
    })

    it('handles empty string', () => {
      const count = countTokens('')
      expect(count).to.equal(0)
    })

    it('handles unicode characters', () => {
      const text = 'Привет мир 你好世界'
      const count = countTokens(text)
      expect(count).to.be.greaterThan(0)
    })
  })

  describe('fitsInTokenLimit', () => {
    it('returns true for text within limit', () => {
      const text = 'Short text'
      expect(fitsInTokenLimit(text, 100)).to.be.true
    })

    it('returns false for text exceeding limit', () => {
      const text = 'a'.repeat(10000) // Very long text
      expect(fitsInTokenLimit(text, 10)).to.be.false
    })

    it('applies 10% safety margin', () => {
      const text = 'a'.repeat(1000)
      const tokenCount = countTokens(text)
      // Should fit if limit is > tokenCount / 0.9
      expect(fitsInTokenLimit(text, Math.ceil(tokenCount / 0.9))).to.be.true
      expect(fitsInTokenLimit(text, tokenCount)).to.be.false
    })
  })

  describe('truncateToTokenLimit', () => {
    it('does not truncate text within limit', () => {
      const text = 'Short text'
      const result = truncateToTokenLimit(text, 100)
      expect(result.text).to.equal(text)
      expect(result.truncated).to.be.false
    })

    it('truncates text exceeding limit', () => {
      const text = 'This is a longer piece of text that should be truncated'
      const result = truncateToTokenLimit(text, 5)
      expect(result.text.length).to.be.lessThan(text.length)
      expect(result.truncated).to.be.true
    })

    it('handles empty string', () => {
      const result = truncateToTokenLimit('', 100)
      expect(result.text).to.equal('')
      expect(result.truncated).to.be.false
    })
  })
})
