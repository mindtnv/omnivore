import { LibraryItem } from '../entity/library_item'

/**
 * Creates an Anki deck name with a subdeck based on the source of the library item.
 * Format: ParentDeck::SourceName
 *
 * @param parentDeck - The parent deck name (e.g., "Omnivore")
 * @param libraryItem - The library item containing source information
 * @returns Deck name in format "ParentDeck::SourceName"
 */
export const createAnkiDeckName = (
  parentDeck: string,
  libraryItem: LibraryItem | { siteName?: string | null; originalUrl?: string | null }
): string => {
  // Get source name from siteName or domain from originalUrl
  let sourceName = libraryItem.siteName

  // If siteName is not available, extract domain from originalUrl
  if (!sourceName && libraryItem.originalUrl) {
    try {
      const url = new URL(libraryItem.originalUrl)
      sourceName = url.hostname
        .replace(/^www\./, '') // Remove 'www.' prefix
        .split('.')
        .slice(0, -1) // Remove TLD (.com, .org, etc)
        .join('.')
    } catch (error) {
      // If URL parsing fails, use a default
      sourceName = 'Unknown'
    }
  }

  // Fallback if still no source name
  if (!sourceName) {
    sourceName = 'Unknown'
  }

  // Clean source name: capitalize first letter, remove special characters
  sourceName = sourceName
    .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special chars except spaces and hyphens
    .trim()
    .split(/[\s-]+/) // Split by spaces or hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

  // Return deck name in Anki format: ParentDeck::SourceName
  return `${parentDeck}::${sourceName}`
}
