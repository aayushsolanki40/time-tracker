export interface Document {
  id: string
  title: string
  fileName: string
  fileUrl: string
  projectId: string
  projectName: string
  uploadedBy: string
  uploadedAt: Date
  assignedTo: string[]
  description?: string
}
