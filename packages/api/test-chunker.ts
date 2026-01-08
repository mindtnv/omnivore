import { parseHTML } from 'linkedom'
import { chunkHTMLContent } from './src/utils/content-chunker'

// Test with a simple HTML
const testHTML = `
<article>
  <h1>Introduction to Next.js</h1>
  <p>Next.js is a React framework for building full-stack web applications.</p>
  <p>You use React Components to build user interfaces, and Next.js for additional features and optimizations.</p>
  <p>Under the hood, Next.js also abstracts and automatically configures tooling needed for React.</p>
</article>
`

console.log('Testing chunker with sample HTML...\n')

const { document } = parseHTML(testHTML)

console.log('document.body:', document.body?.tagName, document.body?.innerHTML?.length)
console.log('document.documentElement:', document.documentElement?.tagName, document.documentElement?.innerHTML?.length)
console.log('document.body children:', document.body?.childNodes?.length)
console.log('document.documentElement children:', document.documentElement?.childNodes?.length)

const root = document.body?.childNodes?.length ? document.body : document.documentElement

console.log('\nUsing root element:', root.tagName)
console.log('Root HTML length:', root.innerHTML?.length || 0)
console.log('Root children:', root.childNodes?.length)

const chunks = chunkHTMLContent(root, 3000)

console.log(`\nChunked into ${chunks.length} chunks:\n`)

chunks.forEach((chunk, i) => {
  console.log(`Chunk ${i + 1}:`)
  console.log(`  Tokens: ${chunk.tokenCount}`)
  console.log(`  HTML length: ${chunk.html.length}`)
  console.log(`  Node indices: ${chunk.nodeIndices.join(', ')}`)
  console.log(`  HTML preview: ${chunk.html.substring(0, 100)}...`)
  console.log()
})
