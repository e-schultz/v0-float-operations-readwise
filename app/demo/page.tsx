import { KnowledgeRetrieval } from "@/components/knowledge-retrieval"

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Live Knowledge Retrieval Demo</h1>
          <p className="text-slate-300">Experience how your Twitter bookmarks become conversational AI context</p>
        </div>

        <KnowledgeRetrieval />
      </div>
    </div>
  )
}
