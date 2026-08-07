import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Sparkles, Wand2, FileText, Lightbulb } from 'lucide-react'
import { ChatMessage } from '../types'
import { initialChatMessages, mockAIResponses } from '../data'

const suggestions = [
  { icon: Wand2, text: 'Summarize my tasks' },
  { icon: FileText, text: 'Generate weekly report' },
  { icon: Lightbulb, text: 'Suggest improvements' },
]

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const handleSend = (text: string = input) => {
    if (!text.trim()) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = mockAIResponses[Math.floor(Math.random() * mockAIResponses.length)]
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 glass rounded-2xl flex flex-col overflow-hidden"
      >
        <div className="flex items-center gap-3 p-4 border-b border-black/5 dark:border-white/5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-fuchsia-600 flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold dark:text-white text-slate-900">Orbit AI</h3>
            <p className="text-xs text-slate-500">Powered by GPT-4</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {suggestions.map((s) => (
                <button
                  key={s.text}
                  onClick={() => handleSend(s.text)}
                  className="p-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition text-left"
                >
                  <s.icon size={18} className="text-cyan-400 mb-2" />
                  <p className="text-sm dark:text-slate-300 text-slate-700">{s.text}</p>
                </button>
              ))}
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'assistant'
                    ? 'bg-gradient-to-br from-violet-400 to-fuchsia-600'
                    : 'bg-gradient-to-br from-cyan-400 to-blue-600'
                }`}
              >
                {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
              </div>
              <div
                className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'assistant'
                    ? 'bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300 rounded-tl-sm'
                    : 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-100 border border-cyan-500/20 rounded-tr-sm'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-600 flex items-center justify-center">
                <Bot size={14} />
              </div>
              <div className="bg-black/5 dark:bg-white/5 px-4 py-2.5 rounded-2xl rounded-tl-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-black/5 dark:border-white/5">
          <div className="flex items-center gap-2 glass rounded-xl px-4 py-3">
            <input
              type="text"
              placeholder="Ask Orbit AI anything..."
              className="flex-1 bg-transparent outline-none text-sm dark:text-slate-100 text-slate-900 placeholder:text-slate-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/30 transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}