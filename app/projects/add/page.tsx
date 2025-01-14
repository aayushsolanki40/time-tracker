'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import { X, Plus } from 'lucide-react'

const teamMembers = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Bob Johnson' },
  { id: 4, name: 'Alice Williams' },
]

const accessRights = [
  { value: 'viewer', label: 'Viewer' },
  { value: 'editor', label: 'Editor' },
  { value: 'admin', label: 'Admin' },
]

type AssignedMember = {
  id: string
  role: string
}

export default function AddProjectPage() {
  const [assignedMembers, setAssignedMembers] = useState<AssignedMember[]>([])
  const [selectedMember, setSelectedMember] = useState<string>('')
  const [selectedRole, setSelectedRole] = useState<string>('')

  const addMember = () => {
    if (
      selectedMember &&
      selectedRole &&
      !assignedMembers.some((m) => m.id === selectedMember)
    ) {
      setAssignedMembers([
        ...assignedMembers,
        { id: selectedMember, role: selectedRole },
      ])
      setSelectedMember('')
      setSelectedRole('')
    }
  }

  const removeMember = (memberId: string) => {
    setAssignedMembers(assignedMembers.filter((m) => m.id !== memberId))
  }

  return (
    <div className="container xl:max-w-[2560px] mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Create New Project</h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="Enter project name"
                className="transition-all focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter project description"
                className="transition-all focus:ring-2 focus:ring-blue-500"
                onResize={(height) => console.log(height)}
              />
            </div>
            <div className="space-y-2">
              <Label>Assign Team Members</Label>
              <div className="flex space-x-2">
                <Select
                  value={selectedMember}
                  onValueChange={setSelectedMember}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {accessRights.map((right) => (
                      <SelectItem key={right.value} value={right.value}>
                        {right.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={addMember}
                  disabled={!selectedMember || !selectedRole}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {assignedMembers.map((assigned) => {
                  const member = teamMembers.find(
                    (m) => m.id.toString() === assigned.id,
                  )
                  return (
                    <Badge
                      key={assigned.id}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {member?.name} ({assigned.role})
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-auto p-0 text-gray-500 hover:text-gray-700"
                        onClick={() => removeMember(assigned.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  )
                })}
              </div>
            </div>
            <Button
              type="submit"
              className="w-full transition-all bg-primary-blue hover:bg-secondary-blue"
            >
              Create Project
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
