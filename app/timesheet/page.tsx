'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CalendarIcon, Download, Filter, Clock, Settings2 } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { cn } from '@/lib/utils'

const initialTimeEntries = [
  {
    id: 1,
    app: 'VS Code',
    url: 'github.com',
    duration: '2h 30m',
    date: '2025-02-13',
    activity: 85,
    idle: '15m',
    manual: '0m',
    project: 'Frontend Development',
  },
  {
    id: 2,
    app: 'Chrome',
    url: 'stackoverflow.com',
    duration: '1h 15m',
    date: '2025-02-13',
    activity: 92,
    idle: '5m',
    manual: '10m',
    project: 'Research',
  },
  {
    id: 3,
    app: 'Slack',
    url: 'mycompany.slack.com',
    duration: '45m',
    date: '2025-02-13',
    activity: 78,
    idle: '10m',
    manual: '0m',
    project: 'Communication',
  },
  {
    id: 4,
    app: 'Figma',
    url: 'figma.com',
    duration: '3h',
    date: '2025-02-13',
    activity: 95,
    idle: '8m',
    manual: '5m',
    project: 'Design',
  },
]

const users = ['John Smith', 'Sarah Johnson', 'Mike Chen']
const projects = [
  'All Projects',
  'Frontend Development',
  'Research',
  'Communication',
  'Design',
]

const getActivityColor = (activity: number) => {
  if (activity >= 90) return 'bg-green-500'
  if (activity >= 70) return 'bg-blue-500'
  if (activity >= 50) return 'bg-yellow-500'
  return 'bg-red-500'
}

const getProjectColor = (project: string) => {
  const colors: { [key: string]: string } = {
    'Frontend Development': 'text-blue-600 bg-blue-100',
    Research: 'text-purple-600 bg-purple-100',
    Communication: 'text-green-600 bg-green-100',
    Design: 'text-orange-600 bg-orange-100',
  }
  return colors[project] || 'text-gray-600 bg-gray-100'
}

export default function TimeTrackingPage() {
  const [timeEntries, setTimeEntries] = useState(initialTimeEntries)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: new Date(),
    to: undefined,
  })
  const [selectedUser, setSelectedUser] = useState(users[0])
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const [timezone, setTimezone] = useState('UTC')

  const filteredEntries = timeEntries.filter((entry) => {
    const entryDate = new Date(entry.date)
    const projectMatch =
      selectedProject === 'All Projects' || entry.project === selectedProject
    return (
      dateRange.from &&
      entryDate >= dateRange.from &&
      (!dateRange.to || entryDate <= (dateRange.to ?? new Date())) &&
      projectMatch
    )
  })

  const totalHours = filteredEntries.reduce((total, entry) => {
    const [hours, minutes] = entry.duration.split('h ')
    return total + parseInt(hours) + (minutes ? parseInt(minutes) / 60 : 0)
  }, 0)

  const targetHours = 40 // Weekly target hours
  const progress = (totalHours / targetHours) * 100

  return (
    <div className="container xl:max-w-[2560px] mx-auto space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Time Tracking Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your team's time efficiently
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Settings2 className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Download as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export to Excel</DropdownMenuItem>
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {totalHours.toFixed(1)}h
            </div>
            <Progress
              value={progress}
              className="mt-4"
              indicatorClassName={cn(
                progress >= 100
                  ? 'bg-green-500'
                  : progress >= 75
                    ? 'bg-blue-500'
                    : progress >= 50
                      ? 'bg-yellow-500'
                      : 'bg-red-500',
              )}
            />
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
              {progress.toFixed(1)}% of {targetHours}h target
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user} value={user}>
                {user}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedProject} onValueChange={setSelectedProject}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select project" />
          </SelectTrigger>
          <SelectContent>
            {projects.map((project) => (
              <SelectItem key={project} value={project}>
                {project}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={timezone} onValueChange={setTimezone}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="UTC">UTC</SelectItem>
            <SelectItem value="PST">PST (UTC-8)</SelectItem>
            <SelectItem value="EST">EST (UTC-5)</SelectItem>
            <SelectItem value="GMT">GMT</SelectItem>
            <SelectItem value="IST">IST (UTC+5:30)</SelectItem>
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[300px]">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'LLL dd, y')} -{' '}
                    {format(dateRange.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(dateRange.from, 'LLL dd, y')
                )
              ) : (
                <span>Select date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={(range) =>
                setDateRange({
                  from: range?.from ?? new Date(),
                  to: range?.to ?? undefined,
                })
              }
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Time Entries</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <CardDescription>
            A detailed breakdown of time spent on different applications and
            projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredEntries.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Idle Time</TableHead>
                  <TableHead>Manual Time</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        {entry.app}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          'px-2 py-1 rounded-full text-xs font-medium',
                          getProjectColor(entry.project),
                        )}
                      >
                        {entry.project}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {entry.url}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {entry.duration}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Progress
                          value={entry.activity}
                          className="w-[60px]"
                          indicatorClassName={getActivityColor(entry.activity)}
                        />
                        <span
                          className={cn(
                            'text-sm',
                            entry.activity >= 90
                              ? 'text-green-600'
                              : entry.activity >= 70
                                ? 'text-blue-600'
                                : entry.activity >= 50
                                  ? 'text-yellow-600'
                                  : 'text-red-600',
                          )}
                        >
                          {entry.activity}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {entry.idle}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {entry.manual}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-red-100 hover:text-red-600 transition-colors"
                        onClick={() => {
                          setTimeEntries(
                            timeEntries.filter((t) => t.id !== entry.id),
                          )
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Alert>
              <AlertDescription>
                No time entries found for the selected filters.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
