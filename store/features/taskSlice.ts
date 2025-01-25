// src/store/features/taskSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task, TaskTypes } from '@/types/todo'
import { sampleTasks } from '@/data/sampleTasks'

const initialTaskTypes: TaskTypes = sampleTasks

interface TaskState {
  taskTypes: TaskTypes
}

const initialState: TaskState = {
  taskTypes: initialTaskTypes,
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState: initialState,
  reducers: {
    updateTaskTypes: (state, action: PayloadAction<TaskTypes>) => {
      state.taskTypes = action.payload
    },
    addTask: (
      state,
      action: PayloadAction<{ containerId: string; task: Task }>,
    ) => {
      const { containerId, task } = action.payload
      state.taskTypes[containerId].tasks.push(task)
    },
    removeTask: (
      state,
      action: PayloadAction<{ containerId: string; taskId: string }>,
    ) => {
      const { containerId, taskId } = action.payload
      state.taskTypes[containerId].tasks = state.taskTypes[
        containerId
      ].tasks.filter((task) => task.id !== taskId)
    },
    moveTask: (
      state,
      action: PayloadAction<{
        fromContainerId: string
        toContainerId: string
        taskId: string
      }>,
    ) => {
      const { fromContainerId, toContainerId, taskId } = action.payload

      // Find the task to move
      const taskToMove = state.taskTypes[fromContainerId].tasks.find(
        (task) => task.id === taskId,
      )

      if (taskToMove) {
        // Create new arrays instead of mutating existing ones
        const newFromTasks = state.taskTypes[fromContainerId].tasks.filter(
          (task) => task.id !== taskId,
        )

        const newToTasks = [...state.taskTypes[toContainerId].tasks, taskToMove]

        // Update state immutably
        state.taskTypes = {
          ...state.taskTypes,
          [fromContainerId]: {
            ...state.taskTypes[fromContainerId],
            tasks: newFromTasks,
          },
          [toContainerId]: {
            ...state.taskTypes[toContainerId],
            tasks: newToTasks,
          },
        }
      }
    },
  },
})

export const { updateTaskTypes, moveTask, addTask, removeTask } =
  taskSlice.actions
export default taskSlice.reducer
