'use client'
// import TaskArea from '@/components/tasks/TaskArea'
import dynamic from 'next/dynamic'

const TaskArea = dynamic(() => import('@/components/tasks/TaskArea'), {
  ssr: false,
})

export default function TasksPage() {
  return (
    <div className="container xl:max-w-[2560px] mx-auto space-y-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Task Management</h1>
      </div>
      <TaskArea className="min-h-[600px]" />
    </div>
  )
}
