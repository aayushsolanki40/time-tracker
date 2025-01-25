// src/data/sampleTasks.ts
import { TaskTypes } from '@/types/todo'

export const sampleTasks: TaskTypes = {
  'todo-column': {
    title: 'To Do',
    color: '#5030E5',
    tasks: [
      {
        id: 'task-1',
        content: 'Implement Time Tracking Dashboard',
        priority: 'High',
        description:
          'Create main dashboard with time tracking visualizations and statistics',
        comments: 3,
        files: 2,
        assignees: ['aayushsolanki40', 'dev1', 'dev2'],
      },
      {
        id: 'task-2',
        content: 'User Authentication System',
        priority: 'High',
        description: 'Set up OAuth and email authentication flow',
        comments: 5,
        files: 1,
        assignees: ['aayushsolanki40'],
      },
      {
        id: 'task-3',
        content: 'Database Schema Design',
        priority: 'Medium',
        description:
          'Design and implement database schema for time entries and projects',
        comments: 2,
        files: 3,
        assignees: ['dev2', 'dev3'],
      },
    ],
  },
  'in-progress': {
    title: 'In Progress',
    color: '#FFA500',
    tasks: [
      {
        id: 'task-4',
        content: 'Project Management Features',
        priority: 'Medium',
        description:
          'Implement CRUD operations for projects and team management',
        comments: 4,
        files: 2,
        assignees: ['aayushsolanki40', 'dev1'],
      },
      {
        id: 'task-5',
        content: 'Timer Functionality',
        priority: 'High',
        description:
          'Create start/stop timer feature with automatic time tracking',
        comments: 6,
        files: 1,
        assignees: ['dev3'],
      },
    ],
  },
  completed: {
    title: 'Completed',
    color: '#8BC48A',
    tasks: [
      {
        id: 'task-6',
        content: 'Initial Project Setup',
        priority: 'Low',
        description:
          'Set up TypeScript project with Next.js and required dependencies',
        comments: 2,
        files: 4,
        assignees: ['aayushsolanki40'],
      },
      {
        id: 'task-7',
        content: 'UI Component Library Integration',
        priority: 'Medium',
        description: 'Integrate and customize Shadcn UI components',
        comments: 3,
        files: 2,
        assignees: ['dev1', 'dev2'],
      },
    ],
  },
  blocked: {
    title: 'Blocked',
    color: '#E5304E',
    tasks: [
      {
        id: 'task-8',
        content: 'Report Generation System',
        priority: 'High',
        description:
          'Implement PDF and Excel report generation for time tracking data',
        comments: 8,
        files: 3,
        assignees: ['aayushsolanki40', 'dev3'],
      },
    ],
  },
}
