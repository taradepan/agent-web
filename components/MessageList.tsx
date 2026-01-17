'use client'

import React from 'react'
import { Message } from './Message'

interface MessageListProps {
  messages: Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
  }>
}

export function MessageList({ messages }: MessageListProps) {
  const messagesEndRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto px-8 py-8 bg-[#FAFAF8]">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center">
          <div className="text-center max-w-lg">
            <h2 className="text-3xl font-bold text-neutral-900 mb-3" style={{ letterSpacing: '-0.02em' }}>
              UI Component Generator
            </h2>
            <p className="text-neutral-600 text-base mb-8 leading-relaxed">
              Describe any component and get working React code instantly
            </p>

            <div className="grid grid-cols-2 gap-3 text-left">
              {[
                { title: 'Button variants', desc: 'Primary, secondary, ghost styles' },
                { title: 'Card layouts', desc: 'Product cards, stat cards, etc.' },
                { title: 'Form inputs', desc: 'Text fields, selects, checkboxes' },
                { title: 'Navigation', desc: 'Headers, tabs, breadcrumbs' },
              ].map((example, i) => (
                <div key={i} className="p-4 border border-neutral-200 bg-white hover:border-neutral-400 transition-colors">
                  <div className="text-sm font-semibold text-neutral-900 mb-1">{example.title}</div>
                  <div className="text-xs text-neutral-500">{example.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <Message
              key={message.id}
              content={message.content}
              role={message.role}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  )
}