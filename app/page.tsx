"use client"

import { useState, useEffect, useTransition } from "react"
import { fetchReadwiseHighlights } from "@/app/actions/readwise-actions"
import { Search, Twitter, Database, Brain, Zap, BookOpen, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data representing processed Twitter bookmarks
// Remove: const mockKnowledgeBase = [...]

export default function TwitterKnowledgeBase() {
  const [allHighlights, setAllHighlights] = useState<any[]>([]) // Store all fetched highlights
  const [results, setResults] = useState<any[]>([])
  const [isLoading, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    startTransition(async () => {
      setError(null)
      const result = await fetchReadwiseHighlights()
      if (result.error) {
        setError(result.error)
      } else if (result.data) {
        setAllHighlights(result.data)
        setResults(result.data) // Initially display all fetched highlights
      }
    })
  }, [])

  const handleSearch = () => {
    if (!query.trim()) {
      setResults(allHighlights) // Reset to all fetched highlights
      return
    }

    const filtered = allHighlights.filter(
      // Use allHighlights here
      (item) =>
        item.content.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase())) ||
        item.author.toLowerCase().includes(query.toLowerCase()),
    )
    setResults(filtered)
  }

  const filterByCategory = (category: string) => {
    setSelectedCategory(category)
    if (category === "all") {
      setResults(allHighlights) // Use allHighlights here
    } else {
      setResults(allHighlights.filter((item) => item.category === category)) // Use allHighlights here
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Twitter className="h-8 w-8 text-blue-400" />
            <Database className="h-8 w-8 text-green-400" />
            <Brain className="h-8 w-8 text-purple-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Twitter → Knowledge Base → LLM</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Transform your Twitter bookmarks into a queryable knowledge system for AI retrieval
          </p>
        </div>

        {/* Architecture Overview */}
        <Card className="mb-8 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              System Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <Twitter className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Twitter Bookmarks</h3>
                <p className="text-slate-300 text-sm">Curated content collection</p>
              </div>
              <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                <BookOpen className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Readwise Sync</h3>
                <p className="text-slate-300 text-sm">Automated ingestion</p>
              </div>
              <div className="text-center p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
                <Database className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold">Vector Store</h3>
                <p className="text-slate-300 text-sm">Semantic embeddings</p>
              </div>
              <div className="text-center p-4 bg-orange-500/20 rounded-lg border border-orange-500/30">
                <Brain className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <h3 className="text-white font-semibold">LLM Retrieval</h3>
                <p className="text-slate-300 text-sm">Contextual responses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Interface */}
        <Card className="mb-8 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Knowledge Search</CardTitle>
            <CardDescription className="text-slate-300">Query your curated Twitter knowledge base</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Search your bookmarked wisdom..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <Button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => filterByCategory("all")}
                className="text-xs"
              >
                All
              </Button>
              <Button
                variant={selectedCategory === "tools" ? "default" : "outline"}
                size="sm"
                onClick={() => filterByCategory("tools")}
                className="text-xs"
              >
                Tools
              </Button>
              <Button
                variant={selectedCategory === "professional" ? "default" : "outline"}
                size="sm"
                onClick={() => filterByCategory("professional")}
                className="text-xs"
              >
                Professional
              </Button>
              <Button
                variant={selectedCategory === "methodology" ? "default" : "outline"}
                size="sm"
                onClick={() => filterByCategory("methodology")}
                className="text-xs"
              >
                Methodology
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 text-purple-400 animate-spin mr-2" />
            <span className="text-white">Fetching Readwise highlights...</span>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-8 bg-red-900/30 border-red-700 text-red-300">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle className="text-red-200">Error Fetching Highlights</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Results */}
        <div className="space-y-6">
          {results.map((item) => (
            <Card key={item.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardContent className="p-6">
                {/* Header with author, date, and source link */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400 font-medium text-lg">{item.author}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400">{item.timestamp}</span>
                  </div>
                  {item.source_url && (
                    <a
                      href={item.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Badge variant="outline" className="text-xs hover:bg-slate-700 border-blue-400/50">
                        View Source
                      </Badge>
                    </a>
                  )}
                </div>

                {/* Content with better typography */}
                <div className="prose prose-invert max-w-none mb-6">
                  <div className="text-slate-100 leading-relaxed whitespace-pre-wrap text-base">{item.content}</div>
                </div>

                {/* Tags with better spacing */}
                {item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-600">
                    <span className="text-slate-400 text-sm mr-2">Tags:</span>
                    {item.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-xs bg-slate-700/70 text-slate-300 hover:bg-slate-600 transition-colors cursor-pointer"
                        onClick={() => {
                          setQuery(tag)
                          handleSearch()
                        }}
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Empty state */}
          {results.length === 0 && !isLoading && !error && (
            <Card className="bg-slate-800/30 border-slate-700">
              <CardContent className="p-12 text-center">
                <div className="text-slate-400 mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No results found</h3>
                  <p className="text-sm">Try adjusting your search terms or category filters</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Implementation Guide */}
        <Card className="mt-12 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Implementation Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="setup" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-700">
                <TabsTrigger value="setup" className="text-white">
                  Setup
                </TabsTrigger>
                <TabsTrigger value="sync" className="text-white">
                  Sync
                </TabsTrigger>
                <TabsTrigger value="process" className="text-white">
                  Process
                </TabsTrigger>
                <TabsTrigger value="query" className="text-white">
                  Query
                </TabsTrigger>
              </TabsList>

              <TabsContent value="setup" className="text-slate-300 space-y-4">
                <h3 className="text-white font-semibold">1. Readwise Configuration</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Connect Twitter account to Readwise</li>
                  <li>Configure bookmark auto-sync</li>
                  <li>Set up tagging and categorization rules</li>
                  <li>Enable API access for programmatic retrieval</li>
                </ul>
              </TabsContent>

              <TabsContent value="sync" className="text-slate-300 space-y-4">
                <h3 className="text-white font-semibold">2. Data Synchronization</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Automated bookmark ingestion via Readwise API</li>
                  <li>Content extraction and cleaning</li>
                  <li>Metadata enrichment (author, timestamp, context)</li>
                  <li>Deduplication and quality filtering</li>
                </ul>
              </TabsContent>

              <TabsContent value="process" className="text-slate-300 space-y-4">
                <h3 className="text-white font-semibold">3. Vector Processing</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Generate embeddings using OpenAI/local models</li>
                  <li>Store in ChromaDB or similar vector database</li>
                  <li>Create semantic clusters and relationships</li>
                  <li>Build searchable indices for fast retrieval</li>
                </ul>
              </TabsContent>

              <TabsContent value="query" className="text-slate-300 space-y-4">
                <h3 className="text-white font-semibold">4. LLM Integration</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Implement semantic search for relevant context</li>
                  <li>Provide retrieved content to LLM as context</li>
                  <li>Enable conversational queries over knowledge base</li>
                  <li>Support real-time updates and continuous learning</li>
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
