'use client'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core'
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { RootState } from '@/store'
import { moveTask, updateTaskTypes } from '@/store/features/taskSlice'
import { Task } from '@/types/todo'
import { cn } from '@/lib/utils'
import TaskContainer from './TaskContainer'
import TodoCard from './TodoCard'

interface TaskAreaProps {
  className?: string
}

function TaskArea({ className }: TaskAreaProps) {
  const dispatch = useDispatch()
  const taskTypes = useSelector((state: RootState) => state.tasks.taskTypes)
  const [activeTask, setActiveTask] = useState<Task | null>(null)
  const [overId, setOverId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const findContainer = (taskId: string): string | undefined => {
    return Object.keys(taskTypes).find((containerId) =>
      taskTypes[containerId].tasks.some((task) => task.id === taskId),
    )
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const activeId = active.id as string
    const activeContainerId = findContainer(activeId)

    if (activeContainerId) {
      const activeTask = taskTypes[activeContainerId].tasks.find(
        (task) => task.id === activeId,
      )
      setActiveTask(activeTask || null)
    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event
    setOverId(over ? (over.id as string) : null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      setActiveTask(null)
      setOverId(null)
      return
    }

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainerId = findContainer(activeId)
    let overContainerId = findContainer(overId)

    // If dropping on a container
    if (!overContainerId) {
      overContainerId = overId
    }

    if (
      activeContainerId &&
      overContainerId &&
      activeContainerId !== overContainerId
    ) {
      dispatch(
        moveTask({
          fromContainerId: activeContainerId,
          toContainerId: overContainerId,
          taskId: activeId,
        }),
      )
    }

    setActiveTask(null)
    setOverId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div
        className={cn(
          'custom-scrollbar relative max-w-full grow overflow-x-auto',
          className,
        )}
      >
        <div className="flex h-full min-w-max space-x-4 p-4">
          {Object.entries(taskTypes).map(
            ([containerId, { title, color, tasks }]) => (
              <SortableContext
                key={containerId}
                id={containerId}
                items={tasks.map((task) => task.id)}
                strategy={rectSortingStrategy}
              >
                <TaskContainer
                  id={containerId}
                  title={title}
                  color={color}
                  tasks={tasks}
                  activeTaskId={activeTask?.id || null}
                  overId={overId}
                />
              </SortableContext>
            ),
          )}
        </div>
      </div>
      <DragOverlay>
        {activeTask && (
          <TodoCard
            id={activeTask.id}
            content={activeTask.content}
            priority={activeTask.priority}
            description={activeTask.description}
            comments={activeTask.comments}
            files={activeTask.files}
            assignees={activeTask.assignees}
            dragOverlay
          />
        )}
      </DragOverlay>
    </DndContext>
  )
}

export default TaskArea
