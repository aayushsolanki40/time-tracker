'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Document } from '@/types/document'
import { Label } from '@/components/ui/label'
import { DocumentList } from '../../components/documents/DocumentList'
import { AddDocumentDialog } from '../../components/documents/AddDocumentModal'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Demo projects data
const demoProjects = [
  { id: 'proj1', name: 'Project Alpha' },
  { id: 'proj2', name: 'Project Beta' },
  { id: 'proj3', name: 'Project Gamma' },
]

// Demo data
const demoDocuments: Document[] = [
  {
    id: '1',
    title: 'Project Requirements',
    fileName: 'requirements.pdf',
    fileUrl: '#',
    projectId: 'proj1',
    uploadedBy: 'aayushsolanki40',
    uploadedAt: new Date('2024-01-14'),
    assignedTo: ['Team Lead', 'Developer'],
    description: 'Initial project requirements documentation',
    projectName: 'Project Alpha',
  },
  {
    id: '2',
    title: 'Technical Specifications',
    fileName: 'tech-spec.docx',
    fileUrl: '#',
    projectId: 'proj1',
    uploadedBy: 'aayushsolanki40',
    uploadedAt: new Date('2024-01-13'),
    assignedTo: ['Developer', 'Designer'],
    description: 'Technical specifications for the new feature',
    projectName: 'Project Alpha',
  },
  {
    id: '3',
    title: 'Design Guidelines',
    fileName: 'design-guidelines.pdf',
    fileUrl: '#',
    projectId: 'proj2',
    uploadedBy: 'aayushsolanki40',
    uploadedAt: new Date('2024-01-12'),
    assignedTo: ['Designer'],
    description: 'Brand and design guidelines',
    projectName: 'Project Beta',
  },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>(demoDocuments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<string>('all')

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const handleAddDocument = (newDocument: Document) => {
    const projectName =
      demoProjects.find((p) => p.id === newDocument.projectId)?.name || ''
    setDocuments([
      ...documents,
      {
        ...newDocument,
        id: (documents.length + 1).toString(),
        uploadedAt: new Date(),
        uploadedBy: 'aayushsolanki40',
        projectName,
      },
    ])
    setIsDialogOpen(false)
  }

  const filteredDocuments =
    selectedProject === 'all'
      ? documents
      : documents.filter((doc) => doc.projectId === selectedProject)

  return (
    <div className="container xl:max-w-[2560px] mx-auto space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Documents</h1>
        <div className="flex items-center gap-4">
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-[200px]">
              <SelectValue>All Projects</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {demoProjects.map((project) => (
                <SelectItem key={project.id} value={project.id.toString()}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={() => setIsDialogOpen(true)}>Add Document</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <DocumentList documents={filteredDocuments} onDelete={handleDelete} />
      </div>
      <div className="flex items-end mt-3">
        <p className="text-sm text-gray-500">
          Showing {filteredDocuments.length} document
          {filteredDocuments.length !== 1 ? 's' : ''}
        </p>
      </div>

      <AddDocumentDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAdd={handleAddDocument}
        projects={demoProjects}
      />
    </div>
  )
}
