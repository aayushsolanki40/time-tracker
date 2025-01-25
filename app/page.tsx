'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Activity, CheckCircle, Clock, Users } from 'lucide-react'
import { Bar, BarChart, XAxis, YAxis } from 'recharts'
import { type ChartConfig } from '@/components/ui/chart'
import ReAreaChart from '@/components/recharts/area-chart'

export default function Dashboard() {
  const recentActivities = [
    {
      image:
        'https://images.pexels.com/photos/792199/pexels-photo-792199.jpeg?cs=srgb&dl=pexels-natri-792199.jpg&fm=jpg&w=5973&h=3987',
      activity: 'Code Preview',
      time: '10:00 AM',
      percentage: 41,
    },
    {
      image:
        'https://images.pexels.com/photos/792199/pexels-photo-792199.jpeg?cs=srgb&dl=pexels-natri-792199.jpg&fm=jpg&w=5973&h=3987',
      activity: 'Code Review',
      time: '11:00 AM',
      percentage: 33,
    },
    {
      image:
        'https://images.pexels.com/photos/792199/pexels-photo-792199.jpeg?cs=srgb&dl=pexels-natri-792199.jpg&fm=jpg&w=5973&h=3987',
      activity: 'Bug Fixing',
      time: '12:00 PM',
      percentage: 26,
    },
    {
      image:
        'https://images.pexels.com/photos/792199/pexels-photo-792199.jpeg?cs=srgb&dl=pexels-natri-792199.jpg&fm=jpg&w=5973&h=3987',
      activity: 'Feature Development',
      time: '1:00 PM',
      percentage: 51,
    },
    {
      image:
        'https://images.pexels.com/photos/792199/pexels-photo-792199.jpeg?cs=srgb&dl=pexels-natri-792199.jpg&fm=jpg&w=5973&h=3987',
      activity: 'Testing',
      time: '2:00 PM',
      percentage: 28,
    },
    {
      image:
        'https://images.pexels.com/photos/792199/pexels-photo-792199.jpeg?cs=srgb&dl=pexels-natri-792199.jpg&fm=jpg&w=5973&h=3987',
      activity: 'Deployment',
      time: '3:00 PM',
      percentage: 62,
    },
  ]

  const appsAndUrls = [
    {
      app: 'Google Chrome',
      url: 'https://www.google.com',
      timeSpent: '2h 30m',
    },
    {
      app: 'Visual Studio Code',
      url: 'https://code.visualstudio.com',
      timeSpent: '1h 15m',
    },
    { app: 'Slack', url: 'https://slack.com', timeSpent: '45m' },
    { app: 'Trello', url: 'https://trello.com', timeSpent: '30m' },
  ]

  const chartData = [
    { day: 'Mon', tracked: 186 },
    { day: 'Tue', tracked: 305 },
    { day: 'Wed', tracked: 237 },
    { day: 'Thu', tracked: 73 },
    { day: 'Fri', tracked: 209 },
    { day: 'Sat', tracked: 214 },
    { day: 'Sun', tracked: 214 },
  ]

  const chartConfig = {
    day: {
      label: 'Days',
      color: '#2563eb',
    },
    tracked: {
      label: 'Time Tracked',
      color: '#60a5fa',
    },
  } satisfies ChartConfig

  return (
    <div className="container xl:max-w-[2560px] mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-between">
            <div>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">
                +20% from last month
              </p>
            </div>
            <div className="w-28 h-16">
              <ReAreaChart />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Tracked</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-between">
            <div>
              <div className="text-2xl font-bold">164</div>
              <p className="text-xs text-muted-foreground">
                +12% from last week
              </p>
            </div>
            <div className="w-28 h-16">
              <ReAreaChart />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-between">
            <div>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 new this month</p>
            </div>
            <div className="w-28 h-16">
              <ReAreaChart />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-row items-center justify-between">
            <div>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+4 new this week</p>
            </div>
            <div className="w-28 h-16">
              <ReAreaChart />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 auto-rows-min">
        <Card className="col-span-4 row-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-5">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center border p-2 rounded-md"
                >
                  <img
                    src={activity.image}
                    alt={`Activity ${index + 1}`}
                    className="h-auto w-full rounded-md"
                    draggable={false}
                  />
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium">
                      {activity.activity}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {activity.time} - {activity.percentage}% Activity
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3 row-span-2">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Project A</span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    Time Tracked: 40 hours
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Project B</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    Time Tracked: 35 hours
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Project C</span>
                    <span className="text-sm font-medium">63%</span>
                  </div>
                  <Progress value={63} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    Time Tracked: 28 hours
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 auto-rows-min">
        <Card className="col-span-4 row-span-2">
          <CardHeader>
            <CardTitle>Apps & URLs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <thead>
                <TableRow>
                  <TableCell>App</TableCell>
                  <TableCell>Time Spent</TableCell>
                </TableRow>
              </thead>
              <TableBody>
                {appsAndUrls.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.app}
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{item.timeSpent}</span>
                        <Progress
                          value={parseInt(item.timeSpent)}
                          className="h-2 mt-1"
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="col-span-3 row-span-2">
          <CardHeader>
            <CardTitle>This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="h-[300px] min-h-[100px] w-full"
            >
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
              >
                <XAxis
                  dataKey="day"
                  label={{
                    value: 'Days',
                    position: 'insideBottom',
                    offset: -5,
                  }}
                  axisLine={false}
                />
                <YAxis
                  label={{
                    value: 'Time Tracked (hours)',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                  axisLine={false}
                />
                <Bar
                  dataKey="tracked"
                  fill="var(--color-desktop)"
                  strokeWidth={2}
                  barSize={10}
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
