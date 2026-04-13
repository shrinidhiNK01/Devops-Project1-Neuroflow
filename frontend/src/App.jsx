import { useState } from 'react'
import WorkflowBuilder from './components/WorkflowBuilder.jsx'

export default function App() {
  const [workflows, setWorkflows] = useState([])

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Header */}
      <header className="backdrop-blur-xl bg-white/20 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                🧠 NeuroFlow
              </h1>
              <p className="text-white/90 mt-1 font-medium">AI Serverless Data Pipelines</p>
            </div>
            <button className="px-6 py-3 bg-white/20 text-white rounded-2xl hover:bg-white/30 transition-all">
              Upgrade Pro
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <WorkflowBuilder workflows={workflows} setWorkflows={setWorkflows} />
          <WorkflowHistory workflows={workflows} />
        </div>
      </main>
    </div>
  )
}

function WorkflowHistory({ workflows }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 sticky top-32">
      <h2 className="text-2xl font-bold text-white mb-6">📋 Pipeline History</h2>
      {workflows.length === 0 ? (
        <div className="text-center py-20 text-white/50">
          <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-3xl flex items-center justify-center">
            ✨
          </div>
          <p className="text-xl">Create your first pipeline!</p>
        </div>
      ) : (
        workflows.map(wf => (
          <div key={wf.id} className="bg-white/10 p-6 rounded-2xl mb-4 border border-white/20">
            <h3 className="font-bold text-white text-lg mb-2">{wf.name}</h3>
            <p className="text-white/70 text-sm mb-4">{wf.natural_language}</p>
            <div className="space-y-2">
              {wf.logs.slice(0, 5).map((log, i) => (
                <div key={i} className="text-green-300 text-sm font-mono">{log}</div>
              ))}
            </div>
            {wf.s3_output && (
              <a href={`#${wf.s3_output}`} className="text-blue-300 text-xs mt-3 block hover:underline">
                📁 View Results
              </a>
            )}
          </div>
        ))
      )}
    </div>
  )
}