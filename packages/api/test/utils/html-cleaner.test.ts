import { expect } from 'chai'
import 'mocha'
import { stripNonEssentialAttributes } from '../../src/utils/html-cleaner'

describe('stripNonEssentialAttributes', () => {
  it('should remove class attributes', () => {
    const input = '<div class="container wrapper"><p class="text">Hello</p></div>'
    const output = stripNonEssentialAttributes(input)

    expect(output).to.not.include('class=')
    expect(output).to.include('<div>')
    expect(output).to.include('<p>')
    expect(output).to.include('Hello')
  })

  it('should remove data-* attributes', () => {
    const input = '<div data-block-type="5" data-id="123"><p>Content</p></div>'
    const output = stripNonEssentialAttributes(input)

    expect(output).to.not.include('data-block-type')
    expect(output).to.not.include('data-id')
    expect(output).to.include('Content')
  })

  it('should remove style attributes', () => {
    const input = '<p style="color: red; margin: 10px;">Styled text</p>'
    const output = stripNonEssentialAttributes(input)

    expect(output).to.not.include('style=')
    expect(output).to.include('Styled text')
  })

  it('should remove most id attributes', () => {
    const input = '<div id="block-123"><span id="yui_abc">Text</span></div>'
    const output = stripNonEssentialAttributes(input)

    expect(output).to.not.include('id="block-123"')
    expect(output).to.not.include('id="yui_abc"')
  })

  it('should keep id="readability-page-1"', () => {
    const input = '<div id="readability-page-1"><p>Content</p></div>'
    const output = stripNonEssentialAttributes(input)

    expect(output).to.include('id="readability-page-1"')
    expect(output).to.include('Content')
  })

  it('should keep href on links', () => {
    const input = '<a href="https://example.com" class="link">Click</a>'
    const output = stripNonEssentialAttributes(input)

    expect(output).to.include('href="https://example.com"')
    expect(output).to.not.include('class=')
    expect(output).to.include('Click')
  })

  it('should keep target on links', () => {
    const input = '<a href="https://example.com" target="_blank" class="external">Link</a>'
    const output = stripNonEssentialAttributes(input)

    expect(output).to.include('href="https://example.com"')
    expect(output).to.include('target="_blank"')
    expect(output).to.not.include('class=')
  })

  it('should keep src, alt, width, height on images', () => {
    const input = '<img src="image.jpg" alt="Description" width="800" height="600" class="photo" data-id="123">'
    const output = stripNonEssentialAttributes(input)

    expect(output).to.include('src="image.jpg"')
    expect(output).to.include('alt="Description"')
    expect(output).to.include('width="800"')
    expect(output).to.include('height="600"')
    expect(output).to.not.include('class=')
    expect(output).to.not.include('data-id')
  })

  it('should preserve HTML structure', () => {
    const input = `
      <div class="article">
        <h1 id="title" class="header">Title</h1>
        <p class="text">Paragraph one</p>
        <p class="text">Paragraph two</p>
        <ul class="list">
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    `
    const output = stripNonEssentialAttributes(input)

    // Check structure is preserved
    expect(output).to.include('<div>')
    expect(output).to.include('<h1>')
    expect(output).to.include('<p>')
    expect(output).to.include('<ul>')
    expect(output).to.include('<li>')
    expect(output).to.include('Title')
    expect(output).to.include('Paragraph one')
    expect(output).to.include('Paragraph two')
    expect(output).to.include('Item 1')
    expect(output).to.include('Item 2')

    // Check attributes are removed
    expect(output).to.not.include('class=')
    expect(output).to.not.include('id="title"')
  })

  it('should handle complex real-world HTML', () => {
    const input = `
      <div id="readability-page-1" class="page">
        <div id="block-123" data-block-type="2" class="wrapper">
          <h1 class="title" style="font-size: 24px;">Article Title</h1>
          <p class="intro" data-index="0">
            Introduction text with <a href="/link" class="internal" target="_blank">a link</a>.
          </p>
          <figure class="image-container" data-lightbox="true">
            <img src="photo.jpg" alt="Photo" width="800" height="600"
                 class="responsive" data-src="photo-large.jpg">
            <figcaption class="caption">Photo caption</figcaption>
          </figure>
        </div>
      </div>
    `
    const output = stripNonEssentialAttributes(input)

    // Preserved
    expect(output).to.include('id="readability-page-1"')
    expect(output).to.include('href="/link"')
    expect(output).to.include('target="_blank"')
    expect(output).to.include('src="photo.jpg"')
    expect(output).to.include('alt="Photo"')
    expect(output).to.include('width="800"')
    expect(output).to.include('height="600"')

    // Removed
    expect(output).to.not.include('class=')
    expect(output).to.not.include('id="block-123"')
    expect(output).to.not.include('data-block-type')
    expect(output).to.not.include('data-index')
    expect(output).to.not.include('data-lightbox')
    expect(output).to.not.include('data-src')
    expect(output).to.not.include('style=')

    // Content preserved
    expect(output).to.include('Article Title')
    expect(output).to.include('Introduction text')
    expect(output).to.include('a link')
    expect(output).to.include('Photo caption')
  })

  it('should reduce HTML size significantly', () => {
    const input = `
      <div id="block-abc123" class="article-wrapper container" data-type="article" data-id="456" style="margin: 20px;">
        <h1 class="article-title main-heading" id="heading-1" data-level="1">Title</h1>
        <p class="article-text body-text" id="para-1" data-index="0">Content</p>
      </div>
    `
    const output = stripNonEssentialAttributes(input)

    // Output should be much smaller
    expect(output.length).to.be.lessThan(input.length * 0.5) // At least 50% reduction

    // But content should be intact
    expect(output).to.include('Title')
    expect(output).to.include('Content')
  })
})
