'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit, Plus, Trash, User } from 'lucide-react'
import Link from 'next/link'

type Status = 'approved' | 'pending' | 'rejected'

const initialTeamMembers: {
  id: number
  name: string
  role: string
  email: string
  status: Status
}[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Admin',
    email: 'john@example.com',
    status: 'approved',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Employee',
    email: 'jane@example.com',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    role: 'Employee',
    email: 'bob@example.com',
    status: 'rejected',
  },
]

const statusColors = {
  approved: 'text-green-600',
  pending: 'text-yellow-600',
  rejected: 'text-red-600',
}

const getStatusTag = (status: keyof typeof statusColors) => {
  const bgColor = {
    approved: 'bg-green-100',
    pending: 'bg-yellow-100',
    rejected: 'bg-red-100',
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]} ${bgColor[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null)

  const handleDeleteMember = (id: number) => {
    setMemberToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (memberToDelete) {
      setTeamMembers(
        teamMembers.filter((member) => member.id !== memberToDelete),
      )
      setIsDeleteDialogOpen(false)
      setMemberToDelete(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <Button asChild>
          <Link href="/teams/add">
            <Plus className="mr-2 h-4 w-4" /> Add Team Member
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Members List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{getStatusTag(member.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/teams/edit/${member.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteMember(member.id)}
                      >
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

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this team member? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
