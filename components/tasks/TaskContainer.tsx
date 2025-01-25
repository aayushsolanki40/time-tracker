import React, { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { Task } from '@/types/todo'
import { AddTaskDialog } from './AddTaskDialog'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import TodoCard from './TodoCard'

interface TaskContainerProps {
  id: string
  title: string
  color: string
  tasks: Task[]
  activeTaskId: string | null
  overId: string | null
}

function TaskContainer({
  id,
  title,
  color,
  tasks,
  activeTaskId,
  overId,
}: TaskContainerProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const { setNodeRef, isOver } = useDroppable({ id })

  // Filter out the active task
  const tasksWithoutActive = tasks.filter((task) => task.id !== activeTaskId)

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex w-[350px] flex-col rounded-lg bg-background/95 p-4 pb-2 shadow-sm',
        isOver && 'bg-muted',
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-medium">{title}</span>
          <Badge variant="secondary" className="ml-2">
            {tasksWithoutActive.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsAddTaskOpen(true)}
        >
          <PlusCircle className="h-5 w-5" />
        </Button>
      </div>
      <div
        className="mt-4 h-1 rounded-full"
        style={{ backgroundColor: color }}
      />
      <div className="custom-scrollbar relative mt-5 flex grow overflow-y-auto">
        {tasksWithoutActive.length > 0 ? (
          <div className="flex max-h-full min-h-max w-full flex-col space-y-4">
            {tasksWithoutActive.map((task) => (
              <TodoCard
                key={task.id}
                id={task.id}
                content={task.content}
                priority={task.priority}
                description={task.description} // Continuing src/components/tasks/TaskContainer.tsx
                comments={task.comments}
                files={task.files}
                assignees={task.assignees}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            No tasks
          </div>
        )}
      </div>
      <AddTaskDialog
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        containerId={id}
      />
    </div>
  )
}

export default TaskContainer
