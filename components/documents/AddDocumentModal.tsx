import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Document } from '@/types/document'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface AddDocumentDialogProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (document: Document) => void
  projects: { id: string; name: string }[]
}

// Demo data for projects and team members
const demoProjects = [
  { id: 'proj1', name: 'Project Alpha' },
  { id: 'proj2', name: 'Project Beta' },
]

const demoTeamMembers = [
  { id: 'teamLead', name: 'Team Lead' },
  { id: 'developer', name: 'Developer' },
  { id: 'designer', name: 'Designer' },
  { id: 'qaEngineer', name: 'QA Engineer' },
]

export function AddDocumentDialog({
  isOpen,
  onClose,
  onAdd,
  projects,
}: AddDocumentDialogProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [projectId, setProjectId] = useState('')
  const [assignedTo, setAssignedTo] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newDocument: Document = {
      id: '', // Will be set by parent component
      title,
      fileName: selectedFile?.name || 'Untitled',
      fileUrl: '#',
      projectId,
      uploadedBy: 'Current User',
      uploadedAt: new Date(),
      assignedTo,
      description,
      projectName:
        projects.find((project) => project.id === projectId)?.name || '',
    }

    onAdd(newDocument)
    resetForm()
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setSelectedFile(null)
    setProjectId('')
    setAssignedTo([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Document</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full p-2 border rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="project">Project</Label>
            <select
              id="project"
              className="w-full p-2 border rounded-md"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required
            >
              <option value="">Select Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Project</Label>
            <div className="w-full">
              <Select
                value={projectId}
                onValueChange={(value) => setProjectId(value)}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {demoProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignTo">Assign To</Label>
            <Select onValueChange={(value) => setProjectId(value)} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select member" />
              </SelectTrigger>
              <SelectContent>
                {demoTeamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Upload File</Label>
            <Input
              id="file"
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Document</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
