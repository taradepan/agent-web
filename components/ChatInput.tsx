'use client'

import React, { useState, useRef, useEffect } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  messageCount: number
}

export function ChatInput({ onSendMessage, isLoading, messageCount }: ChatInputProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [input])

  return (
    <div className="border-t border-neutral-200 bg-white">
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={messageCount === 0 ? "What do you want to build?" : "Continue the conversation..."}
              disabled={isLoading}
              rows={1}
              className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900 bg-white resize-none transition-colors placeholder-neutral-400 text-neutral-900 text-[15px] disabled:bg-neutral-50 disabled:text-neutral-400 leading-relaxed max-h-32 overflow-y-auto"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-700 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed transition-colors font-medium text-sm flex-shrink-0"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Generating</span>
              </span>
            ) : (
              'Send'
            )}
          </button>
        </div>
        {!isLoading && (
          <div className="mt-2 flex items-center justify-between text-[11px] text-neutral-400">
            <span>
              {input.trim() ? '↵ Enter to send, Shift+↵ for new line' : 'Start typing to create a component'}
            </span>
            {input.length > 0 && (
              <span className={input.length > 500 ? 'text-amber-600 font-medium' : ''}>
                {input.length}/1000
              </span>
            )}
          </div>
        )}
      </form>
    </div>
  )
}
