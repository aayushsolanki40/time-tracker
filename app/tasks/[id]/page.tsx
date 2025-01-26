'use client'
import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
  ViewIcon,
  ListIcon,
  X,
  Check,
  ChevronsUpDown,
  Users,
} from 'lucide-react'
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { TaskTypes, Task } from '@/types/todo'

const TaskArea = dynamic(() => import('@/components/tasks/TaskArea'), {
  ssr: false,
})

interface User {
  id: string
  name: string
  profileImage?: string
}

export default function TasksPage() {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedPriority, setSelectedPriority] = useState<string>('all')
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const taskTypes = useSelector((state: RootState) => state.tasks.taskTypes)

  const users: User[] = [
    {
      id: 'aayushsolanki40',
      name: 'Aayush S.',
      profileImage:
        'https://yt3.ggpht.com/ytc/APkrFKaERKeBTY6Z-ktDAHmsZ38tbAi2M84InFei9RtiPmQ=s800-c-k-c0x00ffffff-no-rj',
    },
    {
      id: 'dev1',
      name: 'Dev One',
      profileImage:
        'https://yt3.ggpht.com/ytc/APkrFKaERKeBTY6Z-ktDAHmsZ38tbAi2M84InFei9RtiPmQ=s800-c-k-c0x00ffffff-no-rj',
    },
    {
      id: 'dev2',
      name: 'Dev Two',
      profileImage:
        'https://yt3.ggpht.com/ytc/APkrFKaERKeBTY6Z-ktDAHmsZ38tbAi2M84InFei9RtiPmQ=s800-c-k-c0x00ffffff-no-rj',
    },
    {
      id: 'dev3',
      name: 'Dev Three',
      profileImage:
        'https://yt3.ggpht.com/ytc/APkrFKaERKeBTY6Z-ktDAHmsZ38tbAi2M84InFei9RtiPmQ=s800-c-k-c0x00ffffff-no-rj',
    },
  ]

  const filteredTasks = useMemo(() => {
    let filtered: { [key: string]: Task[] } = {}

    Object.entries(taskTypes).forEach(([status, { title, color, tasks }]) => {
      filtered[status] = tasks.filter((task) => {
        const matchesUsers =
          selectedUsers.length === 0 ||
          task.assignees.some((assignee) => selectedUsers.includes(assignee))
        const matchesPriority =
          selectedPriority === 'all' || task.priority === selectedPriority
        return matchesUsers && matchesPriority
      })
    })

    return filtered
  }, [taskTypes, selectedUsers, selectedPriority])

  const renderUserAvatars = (userIds: string[]) => {
    const taskUsers = users.filter((user) => userIds.includes(user.id))
    return (
      <AvatarGroup
        images={taskUsers.map((user) => user.profileImage || '')}
        maxVisible={3}
      />
    )
  }

  const getPriorityBadgeStyle = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800 hover:bg-red-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
      case 'low':
        return 'bg-green-100 text-green-800 hover:bg-green-200'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }
  }

  return (
    <div className="container xl:max-w-[2560px] mx-auto space-y-8 p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>

        <div className="flex items-center gap-4">
          {/* Multi-select User Filter */}
          <Popover open={userDropdownOpen} onOpenChange={setUserDropdownOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={userDropdownOpen}
                className="min-w-[200px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {selectedUsers.length === 0
                    ? 'Select users'
                    : `${selectedUsers.length} selected`}
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search users..." />
                <CommandEmpty>No user found.</CommandEmpty>
                <CommandGroup>
                  {users.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.id}
                      onSelect={() => {
                        setSelectedUsers((prev) =>
                          prev.includes(user.id)
                            ? prev.filter((id) => id !== user.id)
                            : [...prev, user.id],
                        )
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={user.profileImage}
                            alt={user.name}
                          />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{user.name}</span>
                        <Check
                          className={cn(
                            'ml-auto h-4 w-4',
                            selectedUsers.includes(user.id)
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          {/* Priority Filter */}
          <Select value={selectedPriority} onValueChange={setSelectedPriority}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Priority</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex items-center rounded-md border bg-muted p-1">
            <Button
              variant={viewMode === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('kanban')}
              className={cn(
                'transition-all',
                viewMode === 'kanban'
                  ? 'bg-primary-blue shadow-sm'
                  : 'hover:bg-white/50',
              )}
            >
              <ViewIcon className="h-4 w-4 mr-1" />
              Kanban
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={cn(
                'transition-all',
                viewMode === 'list'
                  ? 'bg-primary-blue shadow-sm'
                  : 'hover:bg-white/50',
              )}
            >
              <ListIcon className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <TaskArea
          className="min-h-[600px]"
          taskTypes={taskTypes}
          filteredTasks={filteredTasks}
        />
      ) : (
        <div className="space-y-6">
          {Object.entries(taskTypes).map(([id, { title, color, tasks }]) => (
            <Card key={id} className="overflow-hidden">
              <CardHeader className="bg-gray-50/80">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                  {title}
                  <Badge variant="secondary" className="ml-2">
                    {filteredTasks[id]?.length || 0}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50%]">Task</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Assignees</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTasks[id]?.map((task) => (
                      <TableRow
                        key={task.id}
                        className="group hover:bg-gray-50/50 transition-colors"
                      >
                        <TableCell className="font-medium">
                          <div>
                            <p className="text-gray-900">{task.content}</p>
                            {task.description && (
                              <p className="text-sm text-gray-500 mt-1">
                                {task.description}
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getPriorityBadgeStyle(task.priority)}
                          >
                            {task.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {renderUserAvatars(task.assignees)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-blue-50 hover:text-blue-600"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-red-50 hover:text-red-600"
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(!filteredTasks[id] || filteredTasks[id].length === 0) && (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center text-gray-500 py-8"
                        >
                          No tasks found in this category
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
