'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const initialTimeEntries = [
  {
    id: 1,
    app: 'VS Code',
    url: 'github.com',
    duration: '2h 30m',
    date: '2025-02-13',
  },
  {
    id: 2,
    app: 'Chrome',
    url: 'stackoverflow.com',
    duration: '1h 15m',
    date: '2025-02-13',
  },
  {
    id: 3,
    app: 'Slack',
    url: 'mycompany.slack.com',
    duration: '45m',
    date: '2025-02-13',
  },
  { id: 4, app: 'Figma', url: 'figma.com', duration: '3h', date: '2025-02-13' },
]

export default function TimeTrackingPage() {
  const [timeEntries, setTimeEntries] = useState(initialTimeEntries)
  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date | undefined
  }>({
    from: new Date(),
    to: undefined,
  })

  const filteredEntries = timeEntries.filter((entry) => {
    const entryDate = new Date(entry.date)
    return (
      entryDate >= dateRange.from &&
      (!dateRange.to || entryDate <= dateRange.to)
    )
  })

  const totalHours = filteredEntries.reduce((total, entry) => {
    const [hours, minutes] = entry.duration.split('h ')
    return total + parseInt(hours) + (minutes ? parseInt(minutes) / 60 : 0)
  }, 0)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Time Tracking</h1>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
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
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={(range) =>
                setDateRange(range as { from: Date; to: Date | undefined })
              }
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Time Tracked: {totalHours.toFixed(2)} hours</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Application</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.app}</TableCell>
                  <TableCell>{entry.url}</TableCell>
                  <TableCell>{entry.duration}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
