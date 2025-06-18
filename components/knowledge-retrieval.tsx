"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Sparkles, Clock } from "lucide-react"

interface RetrievedContext {
  content: string
  author: string
  relevance: number
  tags: string[]
}

interface ConversationTurn {
  query: string
  response: string
  context: RetrievedContext[]
  timestamp: string
}

export function KnowledgeRetrieval() {
  const [query, setQuery] = useState("")
  const [conversation, setConversation] = useState<ConversationTurn[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock retrieval and response generation
  const handleQuery = async () => {
    if (!query.trim()) return

    setIsLoading(true)

    // Simulate retrieval delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock retrieved context
    const mockContext: RetrievedContext[] = [
      {
        content: "readwise - set it up to save bookmarks - chat with highlights a readwise mcp",
        author: "@e_p82",
        relevance: 0.95,
        tags: ["readwise", "mcp", "bookmarks"],
      },
      {
        content:
          "i've been using readwise for years and damn being able to prompt several years of highlights and saved tweets and stuff i wrote is handy",
        author: "@e_p82",
        relevance: 0.87,
        tags: ["readwise", "highlights", "productivity"],
      },
    ]

    // Mock LLM response
    const mockResponse = `Based on your bookmarked content, here's what I found about setting up a Twitter bookmark knowledge system:

**Readwise Integration**: You've highlighted the importance of using Readwise to automatically save bookmarks and create a searchable database. The Readwise MCP (Model Context Protocol) allows you to chat directly with your highlights.

**Long-term Value**: Your experience shows that having years of curated highlights and tweets becomes incredibly valuable for prompting and knowledge retrieval.

**Implementation**: The key is setting up the Readwise → bookmark sync pipeline, then using their API or MCP to make this content queryable by LLMs.

This creates a powerful feedback loop where your social media curation becomes a personalized knowledge base for AI assistance.`

    const newTurn: ConversationTurn = {
      query,
      response: mockResponse,
      context: mockContext,
      timestamp: new Date().toISOString(),
    }

    setConversation((prev) => [...prev, newTurn])
    setQuery("")
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-400" />
            Chat with Your Knowledge Base
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ask about your bookmarked content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
          />
          <Button
            onClick={handleQuery}
            disabled={isLoading || !query.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isLoading ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Query Knowledge Base
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Conversation History */}
      <div className="space-y-6">
        {conversation.map((turn, index) => (
          <div key={index} className="space-y-4">
            {/* User Query */}
            <Card className="bg-blue-500/10 border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 font-medium">You</span>
                  <span className="text-slate-500 text-sm flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(turn.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-white">{turn.query}</p>
              </CardContent>
            </Card>

            {/* Retrieved Context */}
            <Card className="bg-green-500/10 border-green-500/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 text-sm">Retrieved Context</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {turn.context.map((ctx, ctxIndex) => (
                  <div key={ctxIndex} className="bg-slate-800/50 p-3 rounded border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-blue-400 text-sm font-medium">{ctx.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {(ctx.relevance * 100).toFixed(0)}% relevant
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">{ctx.content}</p>
                    <div className="flex gap-1 flex-wrap">
                      {ctx.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs bg-slate-700">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Response */}
            <Card className="bg-purple-500/10 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span className="text-purple-400 font-medium">AI Assistant</span>
                </div>
                <div className="text-white whitespace-pre-line leading-relaxed">{turn.response}</div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
