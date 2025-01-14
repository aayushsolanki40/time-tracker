'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, User } from 'lucide-react'
import Loading from './loading'

interface Message {
  id: string
  title: string
  assignedBy: string
  date: string
  group: 'Yesterday' | 'Last 7 days'
  status: 'completed' | 'pending'
  count: number
}

const MessageRow = ({ message }: { message: Message }) => {
  return (
    <div className="flex items-center py-3.5 px-6 hover:bg-gray-50 transition-colors group">
      <div className="flex-shrink-0 w-8">
        <CheckCircle className="w-5 h-5 text-emerald-500" />
      </div>

      <div className="flex-[2] min-w-0">
        <span className="text-gray-700 text-sm font-medium">
          {message.title}
        </span>
      </div>

      <div className="flex-[3] flex items-center gap-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-500" />
          </div>
          <span className="text-gray-600 font-medium">
            {message.assignedBy}
          </span>
          <span className="text-blue-500">assigned this task to you</span>
        </div>
      </div>

      <div className="flex items-center gap-6 ml-auto">
        <div className="bg-gray-100 px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-600">
            {message.count}
          </span>
        </div>
        {message.status === 'pending' ? (
          <Button
            variant="default"
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 shadow-sm"
          >
            Clear
          </Button>
        ) : (
          <span className="text-gray-500 text-sm w-20 text-right">
            {message.date}
          </span>
        )}
      </div>
    </div>
  )
}

export default function InboxPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      try {
        const dummyMessages: Message[] = [
          {
            id: '1',
            title: 'App Admin : Unable to add a new Agent',
            assignedBy: 'Chirag Balani',
            date: 'Oct 29',
            group: 'Yesterday',
            status: 'completed',
            count: 10,
          },
          {
            id: '2',
            title: 'App Admin : Unable to add a new Agent',
            assignedBy: 'Chirag Balani',
            date: 'Oct 29',
            group: 'Yesterday',
            status: 'pending',
            count: 10,
          },
          {
            id: '3',
            title: 'App Admin : Unable to add a new Agent',
            assignedBy: 'Chirag Balani',
            date: 'Oct 29',
            group: 'Yesterday',
            status: 'completed',
            count: 10,
          },
          {
            id: '4',
            title: 'App Admin : Unable to add a new Agent',
            assignedBy: 'Chirag Balani',
            date: 'Oct 29',
            group: 'Last 7 days',
            status: 'completed',
            count: 10,
          },
          {
            id: '5',
            title: 'App Admin : Unable to add a new Agent',
            assignedBy: 'Chirag Balani',
            date: 'Oct 29',
            group: 'Last 7 days',
            status: 'pending',
            count: 10,
          },
        ]

        setMessages(dummyMessages)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching messages:', error)
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  if (loading) {
    return <Loading />
  }

  const groupedMessages = messages.reduce(
    (acc, message) => {
      if (!acc[message.group]) {
        acc[message.group] = []
      }
      acc[message.group].push(message)
      return acc
    },
    {} as Record<string, Message[]>,
  )

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Notifications</h1>

      <div className="min-h-full bg-white border rounded-lg shadow-sm">
        {Object.entries(groupedMessages).map(([group, messages], index) => (
          <div key={group} className="border-b border-gray-100 last:border-b-0">
            <div className="px-6 py-2.5 bg-gray-50 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-600">{group}</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {messages.map((message) => (
                <MessageRow key={message.id} message={message} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
