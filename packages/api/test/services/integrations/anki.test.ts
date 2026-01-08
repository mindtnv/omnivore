import { expect } from 'chai'
import 'mocha'
import nock from 'nock'
import {
  AnkiConnectClient,
  AnkiNote,
  AnkiNoteUpdate,
} from '../../../src/services/integrations/anki'

const TEST_URL = 'http://localhost:8765'
const TEST_TOKEN = 'test-api-key'

describe('AnkiConnectClient', () => {
  let client: AnkiConnectClient

  beforeEach(() => {
    client = new AnkiConnectClient(TEST_TOKEN, TEST_URL)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  describe('ping()', () => {
    it('returns true when version is >= 6', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'version')
        .reply(200, { result: 6, error: null })

      const result = await client.ping()
      expect(result).to.be.true
    })

    it('returns true when version is > 6', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'version')
        .reply(200, { result: 7, error: null })

      const result = await client.ping()
      expect(result).to.be.true
    })

    it('returns false when version is < 6', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'version')
        .reply(200, { result: 5, error: null })

      const result = await client.ping()
      expect(result).to.be.false
    })

    it('returns false when error occurs', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'version')
        .reply(200, { result: null, error: 'AnkiConnect not available' })

      const result = await client.ping()
      expect(result).to.be.false
    })

    it('returns false on network error', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'version')
        .replyWithError({ code: 'ECONNREFUSED' })

      const result = await client.ping()
      expect(result).to.be.false
    })
  })

  describe('addNotes()', () => {
    const testNotes: AnkiNote[] = [
      {
        deckName: 'Test Deck',
        modelName: 'Basic',
        fields: { Front: 'Question 1', Back: 'Answer 1' },
        tags: ['test'],
      },
      {
        deckName: 'Test Deck',
        modelName: 'Basic',
        fields: { Front: 'Question 2', Back: 'Answer 2' },
        tags: ['test'],
      },
    ]

    it('returns array of note IDs on success', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'addNotes')
        .reply(200, { result: [123, 456], error: null })

      const result = await client.addNotes(testNotes)
      expect(result).to.deep.equal([123, 456])
    })

    it('filters out null values for failed notes', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'addNotes')
        .reply(200, { result: [123, null, 456], error: null })

      const result = await client.addNotes([...testNotes, testNotes[0]])
      expect(result).to.deep.equal([123, 456])
    })

    it('throws error when deck not found', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'addNotes')
        .reply(200, { result: null, error: 'deck was not found' })

      try {
        await client.addNotes(testNotes)
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect((error as Error).message).to.equal('deck was not found')
      }
    })

    it('throws error when model not found', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'addNotes')
        .reply(200, { result: null, error: 'note type was not found' })

      try {
        await client.addNotes(testNotes)
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect((error as Error).message).to.equal('note type was not found')
      }
    })
  })

  describe('updateNoteFields()', () => {
    const updates: AnkiNoteUpdate[] = [
      { id: 123, fields: { Front: 'Updated Question' } },
      { id: 456, fields: { Back: 'Updated Answer' } },
    ]

    it('returns true on success', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'updateNoteFields')
        .times(2)
        .reply(200, { result: null, error: null })

      const result = await client.updateNoteFields(updates)
      expect(result).to.be.true
    })

    it('throws error on failure', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'updateNoteFields')
        .reply(200, { result: null, error: 'note not found' })

      try {
        await client.updateNoteFields(updates)
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect((error as Error).message).to.equal('note not found')
      }
    })
  })

  describe('deleteNotes()', () => {
    it('returns true on success', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'deleteNotes')
        .reply(200, { result: null, error: null })

      const result = await client.deleteNotes([123, 456])
      expect(result).to.be.true
    })

    it('throws error on failure', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'deleteNotes')
        .reply(200, { result: null, error: 'failed to delete notes' })

      try {
        await client.deleteNotes([123, 456])
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect((error as Error).message).to.equal('failed to delete notes')
      }
    })
  })

  describe('createDeck()', () => {
    it('returns deck ID on success', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'createDeck')
        .reply(200, { result: 123456789, error: null })

      const result = await client.createDeck('Omnivore/Medium')
      expect(result).to.equal(123456789)
    })

    it('throws error on failure', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'createDeck')
        .reply(200, { result: null, error: 'invalid deck name' })

      try {
        await client.createDeck('')
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect((error as Error).message).to.equal('invalid deck name')
      }
    })
  })

  describe('deckNames()', () => {
    it('returns array of deck names', async () => {
      const expectedDecks = ['Default', 'Omnivore', 'Omnivore::Medium']

      nock(TEST_URL)
        .post('/', (body) => body.action === 'deckNames')
        .reply(200, { result: expectedDecks, error: null })

      const result = await client.deckNames()
      expect(result).to.deep.equal(expectedDecks)
    })

    it('throws error on failure', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'deckNames')
        .reply(200, { result: null, error: 'failed to get decks' })

      try {
        await client.deckNames()
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect((error as Error).message).to.equal('failed to get decks')
      }
    })
  })

  describe('accessToken()', () => {
    it('returns token when ping succeeds', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'version')
        .reply(200, { result: 6, error: null })

      const result = await client.accessToken()
      expect(result).to.equal(TEST_TOKEN)
    })

    it('returns null when ping fails', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'version')
        .reply(200, { result: null, error: 'not available' })

      const result = await client.accessToken()
      expect(result).to.be.null
    })
  })

  describe('auth()', () => {
    it('throws not implemented error', async () => {
      try {
        await client.auth()
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect((error as Error).message).to.equal('Method not implemented.')
      }
    })
  })

  describe('export()', () => {
    it('throws not implemented error', async () => {
      try {
        await client.export([])
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect((error as Error).message).to.equal('Method not implemented.')
      }
    })
  })

  describe('Bearer auth', () => {
    it('includes key in request when token is provided', async () => {
      nock(TEST_URL)
        .post('/', (body) => {
          expect(body.key).to.equal(TEST_TOKEN)
          return body.action === 'version'
        })
        .reply(200, { result: 6, error: null })

      await client.ping()
    })

    it('does not include key when token is empty', async () => {
      const clientWithoutToken = new AnkiConnectClient('', TEST_URL)

      nock(TEST_URL)
        .post('/', (body) => {
          expect(body.key).to.be.undefined
          return body.action === 'version'
        })
        .reply(200, { result: 6, error: null })

      await clientWithoutToken.ping()
    })
  })

  describe('error handling', () => {
    it('handles connection refused error', async () => {
      const clientWithBadUrl = new AnkiConnectClient(TEST_TOKEN, 'http://localhost:9999')

      nock('http://localhost:9999')
        .post('/')
        .replyWithError({ code: 'ECONNREFUSED' })

      const result = await clientWithBadUrl.ping()
      expect(result).to.be.false
    })

    it('handles timeout error', async () => {
      nock(TEST_URL)
        .post('/', (body) => body.action === 'deckNames')
        .delay(6000)
        .reply(200, { result: [], error: null })

      try {
        await client.deckNames()
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect((error as Error).message).to.equal('AnkiConnect request timed out')
      }
    })

    it('passes through AnkiConnect error messages', async () => {
      const errorMessage = 'cannot create note because it is a duplicate'

      nock(TEST_URL)
        .post('/', (body) => body.action === 'addNotes')
        .reply(200, { result: null, error: errorMessage })

      try {
        await client.addNotes([
          {
            deckName: 'Test',
            modelName: 'Basic',
            fields: { Front: 'Q', Back: 'A' },
          },
        ])
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect((error as Error).message).to.equal(errorMessage)
      }
    })
  })
})
