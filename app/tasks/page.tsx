'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Plus, Trash } from 'lucide-react'
import Link from "next/link"

const initialTasks = [
  { id: 1, title: "Design homepage", status: "To Do", project: "Website Redesign" },
  { id: 2, title: "Implement login functionality", status: "In Progress", project: "Website Redesign" },
  { id: 3, title: "Write API documentation", status: "Ready for QA", project: "Mobile App" },
  { id: 4, title: "Fix payment bug", status: "Completed", project: "E-commerce Platform" },
]

const projects = ["Website Redesign", "Mobile App", "E-commerce Platform"]
const statuses = ["To Do", "In Progress", "Ready for QA", "Completed"]

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedProject, setSelectedProject] = useState<string | undefined>()
  const [viewStyle, setViewStyle] = useState("kanban")

  const filteredTasks = selectedProject
    ? tasks.filter(task => task.project === selectedProject)
    : tasks

  const handleDragStart = (e: React.DragEvent, taskId: number) => {
    e.dataTransfer.setData("taskId", taskId.toString())
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, status: string) => {
    e.preventDefault()
    const taskId = parseInt(e.dataTransfer.getData("taskId"))
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ))
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <div className="flex space-x-4">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={undefined}>All Projects</SelectItem>
              {projects.map(project => (
                <SelectItem key={project} value={project}>{project}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href="/tasks/add">
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Link>
          </Button>
        </div>
      </div>

      <Tabs value={viewStyle} onValueChange={setViewStyle}>
        <TabsList>
          <TabsTrigger value="kanban">Kanban View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="kanban">
          <div className="grid grid-cols-4 gap-4">
            {statuses.map(status => (
              <Card key={status}>
                <CardHeader>
                  <CardTitle>{status}</CardTitle>
                </CardHeader>
                <CardContent
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, status)}
                >
                  {filteredTasks
                    .filter(task => task.status === status)
                    .map(task => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        className="p-2 mb-2 bg-secondary rounded-md cursor-move"
                      >
                        {task.title}
                      </div>
                    ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list">
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-medium">{task.title}</TableCell>
                      <TableCell>{task.status}</TableCell>
                      <TableCell>{task.project}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/tasks/edit/${task.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

