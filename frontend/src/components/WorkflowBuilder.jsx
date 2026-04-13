import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { createWorkflow } from '../services/api'

export default function WorkflowBuilder({ setWorkflows }) {
  const [formData, setFormData] = useState({
    name: 'My Data Pipeline',
    description: 'AI Generated Workflow',
    natural_language: 'Upload CSV → clean data → analyze trends → store results → send email'
  })
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: accepted => setFile(accepted[0] || null),
    accept: { 'text/csv': ['.csv'] },
    multiple: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.natural_language.trim()) return setError('Enter pipeline description')

    setLoading(true)
    setError(null)

    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('description', formData.description)
    formDataToSend.append('natural_language', formData.natural_language)
    
    if (file) formDataToSend.append('file', file)

    try {
      const workflow = await createWorkflow(
        formData.name,
        formData.description,
        formData.natural_language,
        file
      )
      setWorkflows(wfs => [workflow, ...wfs])
      
      // Reset form
      setFormData(prev => ({ ...prev, natural_language: '' }))
      setFile(null)
      
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20">
      <h2 className="text-3xl font-black text-white mb-8 bg-gradient-to-r from-white to-gray-200 bg-clip-text">
        🎯 Create Pipeline
      </h2>

      <div className="space-y-6">
        {/* Natural Language Input */}
        <div>
          <label className="block text-white/90 font-semibold mb-3 text-lg">🤖 Describe your pipeline</label>
          <textarea
            value={formData.natural_language}
            onChange={e => setFormData({...formData, natural_language: e.target.value})}
            placeholder="Upload sales CSV → clean missing values → analyze revenue trends → store in database → email report to team"
            className="w-full p-6 bg-white/20 border-2 border-dashed border-white/30 rounded-2xl text-white placeholder-white/60 resize-vertical h-32 focus:outline-none focus:border-white/50 focus:ring-4 focus:ring-white/20 text-lg"
          />
          <p className="text-white/60 text-sm mt-2">AI will automatically convert this to cloud pipeline</p>
        </div>

        {/* File Upload */}
        <div {...getRootProps()} className={`group border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer hover:border-white/50 ${
          isDragActive ? 'border-indigo-400 bg-indigo-500/20 scale-105' : 'border-white/30 hover:bg-white/10'
        }`}>
          <input {...getInputProps()} />
          {file ? (
            <>
              <div className="w-20 h-20 mx-auto mb-4 bg-green-400/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-2xl">✅</span>
              </div>
              <p className="text-xl font-bold text-white mb-1">{file.name}</p>
              <p className="text-white/70">Ready for AI processing</p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto mb-4 bg-white/30 rounded-2xl flex items-center justify-center group-hover:bg-white/50 transition-colors">
                <span className="text-2xl">📁</span>
              </div>
              <p className="text-xl font-bold text-white mb-1">Drop CSV file here</p>
              <p className="text-white/70 text-lg">(Optional - AI generates sample data)</p>
            </>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="p-5 bg-red-500/20 border-2 border-red-500/50 rounded-2xl backdrop-blur-sm">
            <p className="text-red-100 font-medium">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !formData.natural_language.trim()}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-8 px-8 rounded-3xl font-black text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-4 border-transparent hover:border-white/30 disabled:border-white/20"
        >
          {loading ? (
            <>
              <div className="inline-block w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mr-3" />
              🤖 AI Building Pipeline...
            </>
          ) : (
            '🚀 Deploy AI Pipeline Now'
          )}
        </button>
      </div>
    </form>
  )
}