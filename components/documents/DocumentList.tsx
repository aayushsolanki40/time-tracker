import { useState } from 'react'
import { Document } from '@/types/document'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Trash2,
  Download,
  Info,
  MoreVertical,
  Share,
  Edit,
  Archive,
} from 'lucide-react'
import { DocumentDetailsModal } from './DocumentDetailsModal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { AvatarGroup } from '../ui/avatar'

interface DocumentListProps {
  documents: Document[]
  onDelete: (id: string) => void
}

export function DocumentList({ documents, onDelete }: DocumentListProps) {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(
    null,
  )
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  const handleInfoClick = (document: Document) => {
    setSelectedDocument(document)
    setIsDetailsModalOpen(true)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Access Members</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.fileName}</TableCell>
                <TableCell>{doc.projectName}</TableCell>
                <TableCell>{doc.uploadedAt.toLocaleDateString()}</TableCell>
                <TableCell>
                  <AvatarGroup
                    className="h-7 w-7"
                    images={[
                      'https://yt3.ggpht.com/ytc/APkrFKaERKeBTY6Z-ktDAHmsZ38tbAi2M84InFei9RtiPmQ=s800-c-k-c0x00ffffff-no-rj',
                      'https://yt3.ggpht.com/ytc/APkrFKaERKeBTY6Z-ktDAHmsZ38tbAi2M84InFei9RtiPmQ=s800-c-k-c0x00ffffff-no-rj',
                      'https://yt3.ggpht.com/ytc/APkrFKaERKeBTY6Z-ktDAHmsZ38tbAi2M84InFei9RtiPmQ=s800-c-k-c0x00ffffff-no-rj',
                      'https://yt3.ggpht.com/ytc/APkrFKaERKeBTY6Z-ktDAHmsZ38tbAi2M84InFei9RtiPmQ=s800-c-k-c0x00ffffff-no-rj',
                    ]}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => handleInfoClick(doc)}>
                        <Info className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => window.open(doc.fileUrl, '_blank')}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="mr-2 h-4 w-4" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:bg-red-50 focus:text-red-600"
                        onClick={() => onDelete(doc.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {documents.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-6 text-gray-500"
                >
                  No documents found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DocumentDetailsModal
        document={selectedDocument}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setSelectedDocument(null)
        }}
      />
    </>
  )
}
