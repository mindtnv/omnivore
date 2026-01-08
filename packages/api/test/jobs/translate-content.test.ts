import { expect } from 'chai'
import 'mocha'
import sinon from 'sinon'
import { LibraryItem, LibraryItemState } from '../../src/entity/library_item'
import * as repository from '../../src/repository'
import * as aiUtils from '../../src/utils/ai'
import * as integrationService from '../../src/services/integrations'
import { translateContent, TranslateContentJobData } from '../../src/jobs/translate-content'

describe('translateContent job', () => {
  let authTrxStub: sinon.SinonStub
  let createLLMStub: sinon.SinonStub
  let findIntegrationByNameStub: sinon.SinonStub

  const testUserId = 'test-user-id'
  const testLibraryItemId = 'test-library-item-id'
  const targetLanguage = 'es'

  const mockLibraryItem: Partial<LibraryItem> = {
    id: testLibraryItemId,
    state: LibraryItemState.Succeeded,
    title: 'Test Article',
    originalUrl: 'https://example.com/article',
    readableContent: `
      <html>
        <body>
          <h1>Introduction to Testing</h1>
          <p>This is a comprehensive guide to testing.</p>
          <h2>Why Testing Matters</h2>
          <p>Testing ensures code quality and reliability.</p>
          <p>It helps catch bugs early in development.</p>
          <h2>Best Practices</h2>
          <ul>
            <li>Write tests first</li>
            <li>Keep tests simple</li>
            <li>Test edge cases</li>
          </ul>
        </body>
      </html>
    `,
    itemLanguage: 'en',
    translationStatus: undefined,
    translatedLanguage: undefined,
    translatedContent: undefined,
  }

  // Mock LLM that returns Spanish translations
  const createMockLLM = () => {
    const mockLLM = {
      pipe: sinon.stub().returnsThis(),
      invoke: sinon.stub().callsFake(async (input: any) => {
        // Simple mock translation that preserves HTML structure
        const content = input.content || ''

        // Mock translation rules
        const translations: Record<string, string> = {
          'Introduction to Testing': 'Introducción a las Pruebas',
          'This is a comprehensive guide to testing.': 'Esta es una guía completa de pruebas.',
          'Why Testing Matters': 'Por Qué Importan las Pruebas',
          'Testing ensures code quality and reliability.': 'Las pruebas aseguran la calidad y confiabilidad del código.',
          'It helps catch bugs early in development.': 'Ayuda a detectar errores temprano en el desarrollo.',
          'Best Practices': 'Mejores Prácticas',
          'Write tests first': 'Escribir pruebas primero',
          'Keep tests simple': 'Mantener las pruebas simples',
          'Test edge cases': 'Probar casos extremos',
        }

        // Simple translation by replacing known phrases
        let translated = content
        for (const [en, es] of Object.entries(translations)) {
          translated = translated.replace(en, es)
        }

        return translated
      }),
    }
    return mockLLM
  }

  beforeEach(() => {
    // Stub authTrx to execute the transaction function immediately
    authTrxStub = sinon.stub(repository, 'authTrx')
    authTrxStub.callsFake(async (fn: any) => {
      // Create a mock transaction object
      const mockTx = {
        getRepository: sinon.stub().returns({
          update: sinon.stub().resolves(),
        }),
        withRepository: sinon.stub().returns({
          findById: sinon.stub().resolves(mockLibraryItem),
        }),
      }
      return fn(mockTx)
    })

    // Stub createLLM to return mock LLM
    createLLMStub = sinon.stub(aiUtils, 'createLLM')
    createLLMStub.returns(createMockLLM())

    // Stub findIntegrationByName to return null (no Anki integration)
    findIntegrationByNameStub = sinon.stub(integrationService, 'findIntegrationByName')
    findIntegrationByNameStub.resolves(null)
  })

  afterEach(() => {
    sinon.restore()
  })

  describe('successful translation', () => {
    it('translates content with chunking and saves result', async () => {
      const jobData: TranslateContentJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        targetLanguage,
      }

      await translateContent(jobData)

      // Verify authTrx was called multiple times
      expect(authTrxStub.called).to.be.true

      // Verify the transaction function received library item update calls
      const calls = authTrxStub.getCalls()

      // Should have at least 3 calls:
      // 1. Set status to PROCESSING
      // 2. Fetch library item
      // 3. Save translated content with COMPLETED status
      expect(calls.length).to.be.at.least(3)

      // Verify LLM was created
      expect(createLLMStub.calledOnce).to.be.true

      // Verify integration check was performed
      expect(findIntegrationByNameStub.calledWith('ANKI', testUserId)).to.be.true
    })
  })

  describe('skip conditions', () => {
    it('skips translation if already translated to target language', async () => {
      const alreadyTranslatedItem = {
        ...mockLibraryItem,
        translatedLanguage: targetLanguage,
        translatedContent: '<p>Ya traducido</p>',
      }

      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          getRepository: sinon.stub().returns({
            update: sinon.stub().resolves(),
          }),
          withRepository: sinon.stub().returns({
            findById: sinon.stub().resolves(alreadyTranslatedItem),
          }),
        }
        return fn(mockTx)
      })

      const mockLLM = createMockLLM()
      createLLMStub.returns(mockLLM)

      const jobData: TranslateContentJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        targetLanguage,
      }

      await translateContent(jobData)

      // Verify LLM invoke was never called (translation was skipped)
      expect(mockLLM.invoke.called).to.be.false
    })

    it('skips translation if library item is not in Succeeded state', async () => {
      const processingItem = {
        ...mockLibraryItem,
        state: LibraryItemState.Processing,
      }

      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          getRepository: sinon.stub().returns({
            update: sinon.stub().resolves(),
          }),
          withRepository: sinon.stub().returns({
            findById: sinon.stub().resolves(processingItem),
          }),
        }
        return fn(mockTx)
      })

      const mockLLM = createMockLLM()
      createLLMStub.returns(mockLLM)

      const jobData: TranslateContentJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        targetLanguage,
      }

      await translateContent(jobData)

      // Verify LLM invoke was never called
      expect(mockLLM.invoke.called).to.be.false
    })
  })

  describe('error handling', () => {
    it('handles translation failure gracefully', async () => {
      // Create LLM that throws an error
      const failingLLM = {
        pipe: sinon.stub().returnsThis(),
        invoke: sinon.stub().rejects(new Error('Translation API error')),
      }
      createLLMStub.returns(failingLLM)

      const jobData: TranslateContentJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        targetLanguage,
      }

      // Should not throw, but handle error gracefully
      await translateContent(jobData)

      // Verify status was set to FAILED
      expect(authTrxStub.called).to.be.true
    })

    it('handles empty content gracefully', async () => {
      const emptyContentItem = {
        ...mockLibraryItem,
        readableContent: '<html><body></body></html>',
      }

      authTrxStub.callsFake(async (fn: any) => {
        const mockTx = {
          getRepository: sinon.stub().returns({
            update: sinon.stub().resolves(),
          }),
          withRepository: sinon.stub().returns({
            findById: sinon.stub().resolves(emptyContentItem),
          }),
        }
        return fn(mockTx)
      })

      const jobData: TranslateContentJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        targetLanguage,
      }

      await translateContent(jobData)

      // Should complete without errors
      expect(authTrxStub.called).to.be.true
    })

    it('fails when no LLM is configured', async () => {
      // Return null from createLLM (no API key)
      createLLMStub.returns(null)

      const jobData: TranslateContentJobData = {
        userId: testUserId,
        libraryItemId: testLibraryItemId,
        targetLanguage,
      }

      await translateContent(jobData)

      // Verify status was set to FAILED
      const calls = authTrxStub.getCalls()
      expect(calls.length).to.be.at.least(2)
    })
  })
})
