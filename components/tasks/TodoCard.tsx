import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MessageSquare, Paperclip } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TodoCardProps {
  id: string
  content: string
  priority: 'Low' | 'Medium' | 'High'
  description?: string
  comments: number
  files: number
  assignees: string[]
  dragOverlay?: boolean
}

const priorityColors = {
  Low: 'bg-yellow-100 text-yellow-800',
  Medium: 'bg-orange-100 text-orange-800',
  High: 'bg-red-100 text-red-800',
}

function TodoCard({
  id,
  content,
  priority,
  description,
  comments,
  files,
  assignees,
  dragOverlay = false,
}: TodoCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  }

  const cardProps = dragOverlay
    ? {}
    : {
        ref: setNodeRef,
        style,
        ...attributes,
        ...listeners,
      }

  return (
    <Card
      {...cardProps}
      className={cn('w-full p-4', dragOverlay && 'shadow-lg')}
    >
      <div className="space-y-4">
        <Badge
          variant="outline"
          className={cn('w-fit', priorityColors[priority])}
        >
          {priority}
        </Badge>

        <div className="space-y-2">
          <h4 className="font-semibold leading-none">{content}</h4>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {assignees.map((assignee, index) => (
              <Avatar
                key={index}
                className="h-6 w-6 border-2 border-background"
              >
                <AvatarImage src={`https://avatar.vercel.sh/${assignee}`} />
                <AvatarFallback>
                  {assignee.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>

          <div className="flex items-center space-x-3 text-muted-foreground">
            <div className="flex items-center space-x-1">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm">{comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Paperclip className="h-4 w-4" />
              <span className="text-sm">{files}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default TodoCard
