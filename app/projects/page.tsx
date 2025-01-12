import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Trash, Users } from 'lucide-react'
import Link from "next/link"

const projects = [
  { id: 1, name: "Website Redesign", members: 5, tasks: 12, progress: 75 },
  { id: 2, name: "Mobile App Development", members: 8, tasks: 24, progress: 40 },
  { id: 3, name: "Marketing Campaign", members: 3, tasks: 8, progress: 90 },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button asChild>
          <Link href="/projects/add">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <CardTitle className="flex justify-between items-center">
                {project.name}
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="text-white hover:text-blue-200">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white hover:text-blue-200">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{project.members} members</span>
                </div>
                <Badge variant="secondary">{project.tasks} tasks</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${project.progress}%` }}></div>
              </div>
              <p className="text-right text-sm text-gray-500 mt-2">{project.progress}% complete</p>
            </CardContent>
            <CardFooter className="bg-gray-50">
              <Button variant="ghost" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

