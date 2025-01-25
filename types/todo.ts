export interface Task {
  id: string
  content: string
  priority: 'Low' | 'Medium' | 'High'
  description?: string
  comments: number
  files: number
  assignees: string[]
}

export interface TaskType {
  title: string
  color: string
  tasks: Task[]
}

export interface TaskTypes {
  [key: string]: TaskType
}
