"use server"

interface ReadwiseTag {
  id: number
  name: string
}

interface ReadwiseHighlight {
  id: number
  text: string
  note: string
  location: number
  location_type: string
  highlighted_at: string | null
  url: string | null
  color: string
  updated_at: string
  book_id: number
  tags: ReadwiseTag[]
  // Additional fields from Readwise API if needed for book details
  book_title?: string // We'll try to get this if available or mock it
  book_author?: string // Same as above
}

interface FormattedHighlight {
  id: string
  author: string // Will use book_author or book_title
  content: string
  tags: string[]
  timestamp: string
  category: string // Can be derived or fixed
  source_url?: string | null
}

export async function fetchReadwiseHighlights(): Promise<{ data?: FormattedHighlight[]; error?: string }> {
  const apiKey = process.env.READWISE_API_KEY

  if (!apiKey) {
    console.error("READWISE_API_KEY is not set.")
    return { error: "Server configuration error: Readwise API key is missing." }
  }

  try {
    // First, fetch highlights
    const highlightsResponse = await fetch("https://readwise.io/api/v2/highlights/?page_size=50", {
      // Fetching 50 highlights for demo
      headers: {
        Authorization: `Token ${apiKey}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!highlightsResponse.ok) {
      const errorData = await highlightsResponse.text()
      console.error("Failed to fetch Readwise highlights:", highlightsResponse.status, errorData)
      return { error: `Failed to fetch highlights: ${highlightsResponse.statusText}` }
    }

    const highlightsData = await highlightsResponse.json()

    // To get book titles and authors, we'd typically need to fetch book details for each book_id
    // For simplicity in this PoC, we'll make a few book lookups or use placeholders.
    // A more robust solution would batch these book lookups.

    const bookDetailsCache: Record<number, { title: string; author: string }> = {}

    const formattedHighlights: FormattedHighlight[] = []

    for (const highlight of highlightsData.results as ReadwiseHighlight[]) {
      let bookTitle = "Unknown Title"
      let bookAuthor = "Unknown Author"

      if (highlight.book_id && !bookDetailsCache[highlight.book_id]) {
        try {
          const bookResponse = await fetch(`https://readwise.io/api/v2/books/${highlight.book_id}/`, {
            headers: { Authorization: `Token ${apiKey}` },
          })
          if (bookResponse.ok) {
            const bookData = await bookResponse.json()
            bookDetailsCache[highlight.book_id] = { title: bookData.title, author: bookData.author || "N/A" }
          }
        } catch (e) {
          console.warn(`Failed to fetch details for book_id ${highlight.book_id}`, e)
        }
      }

      if (bookDetailsCache[highlight.book_id]) {
        bookTitle = bookDetailsCache[highlight.book_id].title
        bookAuthor = bookDetailsCache[highlight.book_id].author
      }

      formattedHighlights.push({
        id: String(highlight.id),
        author: bookAuthor !== "N/A" ? bookAuthor : bookTitle,
        content: highlight.text + (highlight.note ? `\n\nNote: ${highlight.note}` : ""),
        tags: highlight.tags.map((tag) => tag.name),
        timestamp: highlight.highlighted_at
          ? new Date(highlight.highlighted_at).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        category: highlight.tags.length > 0 ? highlight.tags[0].name : "general", // Simple category derivation
        source_url: highlight.url,
      })
    }

    return { data: formattedHighlights }
  } catch (error) {
    console.error("Error fetching Readwise highlights:", error)
    return { error: "An unexpected error occurred while fetching highlights." }
  }
}
