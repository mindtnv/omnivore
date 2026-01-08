import { parseHTML } from 'linkedom'

/**
 * Strip non-essential HTML attributes to reduce token usage for LLM translation
 *
 * Removes:
 * - class attributes (not used in frontend CSS)
 * - id attributes (except readability-page-1 which is used by HighlightsLayer)
 * - data-* attributes (not used by frontend)
 * - style attributes (inline styles)
 *
 * Keeps:
 * - All HTML tags and structure
 * - href (for links)
 * - src, alt, width, height (for images)
 * - target (for links)
 * - id="readability-page-1" (used by highlights)
 *
 * @param html - HTML content to clean
 * @returns Cleaned HTML with minimal attributes
 */
export const stripNonEssentialAttributes = (html: string): string => {
  // Return empty string if input is empty
  if (!html || html.trim() === '') {
    return html
  }

  try {
    const { document } = parseHTML(html)

    // For HTML fragments (chunks), process body children directly
    // For full documents, process documentElement
    const root = document.body?.childNodes?.length
      ? document.body
      : document.documentElement

    if (!root || !root.childNodes || root.childNodes.length === 0) {
      return html
    }

    // Attributes to keep for specific elements
    const KEEP_ATTRIBUTES: Record<string, string[]> = {
      a: ['href', 'target'],
      img: ['src', 'alt', 'width', 'height'],
      // Keep id="readability-page-1" for highlights functionality
      div: [],
    }

    // Recursively strip attributes from all elements
    const stripAttributes = (node: Node) => {
      if (node.nodeType === 1) {
        // Element node
        const element = node as Element
        const tagName = element.tagName.toLowerCase()
        const keepAttrs = KEEP_ATTRIBUTES[tagName] || []

        // Get all current attributes
        const attrs = Array.from(element.attributes || [])

        // Remove attributes that are not in the keep list
        for (const attr of attrs) {
          const attrName = attr.name

          // Special case: keep id="readability-page-1"
          if (attrName === 'id' && attr.value === 'readability-page-1') {
            continue
          }

          // Remove if not in keep list
          if (!keepAttrs.includes(attrName)) {
            element.removeAttribute(attrName)
          }
        }
      }

      // Recursively process children
      if (node.childNodes) {
        for (const child of Array.from(node.childNodes)) {
          stripAttributes(child)
        }
      }
    }

    // Process all children of root (not root itself - it's just a wrapper)
    for (const child of Array.from(root.childNodes)) {
      stripAttributes(child)
    }

    // Return cleaned HTML
    // Use innerHTML to get the content without the wrapper <body> or <html> tags
    // that linkedom adds when parsing fragments
    const result = root.innerHTML

    // Safety check: if result is significantly smaller than input, return original
    // This prevents data loss if something went wrong
    if (result && result.trim().length > 0) {
      return result
    }

    // Fallback to original if something went wrong
    return html
  } catch (error) {
    // If anything fails, return original HTML unchanged
    console.error('Error in stripNonEssentialAttributes:', error)
    return html
  }
}

const DATA_OMNIVORE_PREFIX = 'data-omnivore-'
const KEEP_GLOBAL_ATTRIBUTES = new Set(['lang', 'xml:lang', 'dir'])

const KEEP_ATTRIBUTES_BY_TAG: Record<string, string[]> = {
  a: ['href', 'target', 'rel', 'title'],
  img: ['src', 'alt', 'width', 'height', 'srcset', 'sizes'],
  td: ['colspan', 'rowspan'],
  th: ['colspan', 'rowspan'],
  time: ['datetime'],
}

const filterClassList = (tagName: string, classValue: string): string | null => {
  const classes = classValue.split(/\s+/).filter(Boolean)
  if (classes.length === 0) {
    return null
  }

  if (classes.includes('page')) {
    return 'page'
  }

  if (tagName === 'code' || tagName === 'pre') {
    const kept = classes.filter((cls) => cls === 'hljs' || cls.startsWith('language-'))
    return kept.length > 0 ? kept.join(' ') : null
  }

  return null
}

/**
 * Strip non-essential attributes while preserving Omnivore anchors and display-critical fields.
 * Intended for translation to reduce token usage without breaking reading progress or highlights.
 */
export const stripAttributesForTranslation = (html: string): string => {
  if (!html || html.trim() === '') {
    return html
  }

  try {
    const { document } = parseHTML(html)
    const root = document.body?.childNodes?.length
      ? document.body
      : document.documentElement

    if (!root || !root.childNodes || root.childNodes.length === 0) {
      return html
    }

    const stripAttributes = (node: Node) => {
      if (node.nodeType === 1) {
        const element = node as Element
        const tagName = element.tagName.toLowerCase()
        const keepAttrs = KEEP_ATTRIBUTES_BY_TAG[tagName] || []

        const attrs = Array.from(element.attributes || [])

        for (const attr of attrs) {
          const attrName = attr.name
          const attrValue = attr.value

          if (attrName.startsWith(DATA_OMNIVORE_PREFIX)) {
            continue
          }

          if (KEEP_GLOBAL_ATTRIBUTES.has(attrName)) {
            continue
          }

          if (attrName === 'id' && attrValue === 'readability-page-1') {
            continue
          }

          if (attrName === 'class') {
            const filtered = filterClassList(tagName, attrValue)
            if (filtered) {
              element.setAttribute('class', filtered)
              continue
            }
            element.removeAttribute(attrName)
            continue
          }

          if (keepAttrs.includes(attrName)) {
            continue
          }

          element.removeAttribute(attrName)
        }
      }

      if (node.childNodes) {
        for (const child of Array.from(node.childNodes)) {
          stripAttributes(child)
        }
      }
    }

    for (const child of Array.from(root.childNodes)) {
      stripAttributes(child)
    }

    const result = root.innerHTML
    if (result && result.trim().length > 0) {
      return result
    }

    return html
  } catch (error) {
    console.error('Error in stripAttributesForTranslation:', error)
    return html
  }
}
