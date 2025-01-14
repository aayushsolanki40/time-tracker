import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Document } from '@/types/document'

interface DocumentDetailsModalProps {
  document: Document | null
  isOpen: boolean
  onClose: () => void
}

export function DocumentDetailsModal({
  document,
  isOpen,
  onClose,
}: DocumentDetailsModalProps) {
  if (!document) return null

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Document Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-sm text-gray-500">Title</h4>
              <p className="mt-1">{document.title}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-500">File Name</h4>
              <p className="mt-1">{document.fileName}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-500">Project</h4>
              <p className="mt-1">{document.projectName}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-500">
                Upload Date
              </h4>
              <p className="mt-1">{document.uploadedAt.toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-500">
                Uploaded By
              </h4>
              <p className="mt-1">{document.uploadedBy}</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm text-gray-500">
                Assigned To
              </h4>
              <p className="mt-1">{document.assignedTo.join(', ')}</p>
            </div>
          </div>
          {document.description && (
            <div>
              <h4 className="font-semibold text-sm text-gray-500">
                Description
              </h4>
              <p className="mt-1 text-sm">{document.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
