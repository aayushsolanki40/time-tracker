import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Plus, Trash, Users } from 'lucide-react'
import Link from 'next/link'

const projects = [
  { id: 1, name: 'Website Redesign', members: 5, tasks: 12, progress: 75 },
  {
    id: 2,
    name: 'Mobile App Development',
    members: 8,
    tasks: 24,
    progress: 40,
  },
  { id: 3, name: 'Marketing Campaign', members: 3, tasks: 8, progress: 90 },
  { id: 4, name: 'Marketing Campaign', members: 3, tasks: 8, progress: 90 },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button asChild className="bg-primary-blue hover:bg-secondary-blue">
          <Link href="/projects/add">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="overflow-hidden transition-transform transform hover:shadow-lg rounded-lg border border-gray-300"
          >
            <CardHeader className="bg-white text-gray-800 p-4 rounded-t-lg shadow-sm">
              <CardTitle className="flex justify-between items-center text-lg font-semibold">
                {project.name}
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-blue-500"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-600 hover:text-red-500"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-gray-500" />
                  <span className="text-gray-700">
                    {project.members} members
                  </span>
                </div>
                <Badge variant="secondary">{project.tasks} tasks</Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-500 mt-2">
                {project.progress}% complete
              </p>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 rounded-b-lg">
              <Button variant="ghost" className="w-full text-gray-600">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
