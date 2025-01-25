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
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Edit, Plus, Trash, User, Ban } from 'lucide-react'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Status = 'approved' | 'pending' | 'rejected' | 'blocked'

interface TeamMember {
  id: number
  name: string
  role: string
  email: string
  status: Status
  profileImage?: string
}

const initialTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Admin',
    email: 'john@example.com',
    status: 'approved',
    profileImage: 'https://api.dicebear.com/7.x/avatars/svg?seed=john',
  },
  {
    id: 2,
    name: 'Aayush Solanki',
    role: 'Admin',
    email: 'aayush@example.com',
    status: 'approved',
    profileImage: 'https://api.dicebear.com/9.x/pixel-art/svg',
  },
]

const statusColors = {
  approved: 'text-green-600',
  pending: 'text-yellow-600',
  rejected: 'text-red-600',
  blocked: 'text-gray-600',
}

const statusBgColors = {
  approved: 'bg-green-100',
  pending: 'bg-yellow-100',
  rejected: 'bg-red-100',
  blocked: 'bg-gray-100',
}

const getStatusTag = (status: keyof typeof statusColors) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]} ${statusBgColors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default function TeamsPage() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')

  const handleDeleteMember = (id: number) => {
    setMemberToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const preview = URL.createObjectURL(file)
      setImagePreview(preview)
    }
  }

  const handleBlockMember = (id: number) => {
    setTeamMembers(
      teamMembers.map((member) =>
        member.id === id
          ? {
              ...member,
              status: member.status === 'blocked' ? 'approved' : 'blocked',
            }
          : member,
      ),
    )
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
    <div className="container xl:max-w-[2560px] mx-auto space-y-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Team Members</h1>
        <Button
          className="bg-primary-blue hover:bg-secondary-blue transition-colors"
          onClick={() => setIsAddEditDialogOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Invite New Member
        </Button>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Avatar</TableHead>
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
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.profileImage} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{getStatusTag(member.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-blue-100 hover:text-blue-600 transition-colors"
                      >
                        <Link href={`/teams/edit/${member.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-yellow-100 hover:text-yellow-600 transition-colors"
                        onClick={() => handleBlockMember(member.id)}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-100 hover:text-red-600 transition-colors"
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

      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Team Member Details</DialogTitle>
            <DialogDescription>
              Add member's all required details. Click invite when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form className="space-y-4">
              {/* Profile Image Upload */}
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={imagePreview} />
                  <AvatarFallback>
                    <User className="w-12 h-12 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center">
                  <Label
                    htmlFor="picture"
                    className="cursor-pointer text-sm text-primary-blue hover:text-secondary-blue"
                  >
                    Upload Picture
                  </Label>
                  <Input
                    id="picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddEditDialogOpen(false)
                setImagePreview('')
                setSelectedImage(null)
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-primary-blue hover:bg-secondary-blue transition-colors"
              type="submit"
            >
              Invite
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="hover:bg-red-700 transition-colors"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
