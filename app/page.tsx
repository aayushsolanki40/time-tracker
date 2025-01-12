import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Activity, CheckCircle, Clock, Users } from 'lucide-react'

export default function Dashboard() {
  const recentActivities = [
    {
      image:
        'https://pixabay.com/get/gd48ecbac2360e4c7fc2733f7199e9579f23a668a923423a6474f0e20e214c1e42dc57e830c319cf05f5db0bd4f44fdff02102f313fd5f96585b8b81a4d40abe1f8c95aef9a209595dadf78abffb4fdfe_640.jpg',
      activity: 'Code Preview',
      time: '10:00 AM',
      percentage: 41,
    },
    {
      image:
        'https://pixabay.com/get/gd48ecbac2360e4c7fc2733f7199e9579f23a668a923423a6474f0e20e214c1e42dc57e830c319cf05f5db0bd4f44fdff02102f313fd5f96585b8b81a4d40abe1f8c95aef9a209595dadf78abffb4fdfe_640.jpg',
      activity: 'Code Review',
      time: '11:00 AM',
      percentage: 33,
    },
    {
      image:
        'https://pixabay.com/get/gd48ecbac2360e4c7fc2733f7199e9579f23a668a923423a6474f0e20e214c1e42dc57e830c319cf05f5db0bd4f44fdff02102f313fd5f96585b8b81a4d40abe1f8c95aef9a209595dadf78abffb4fdfe_640.jpg',
      activity: 'Bug Fixing',
      time: '12:00 PM',
      percentage: 26,
    },
    {
      image:
        'https://pixabay.com/get/gd48ecbac2360e4c7fc2733f7199e9579f23a668a923423a6474f0e20e214c1e42dc57e830c319cf05f5db0bd4f44fdff02102f313fd5f96585b8b81a4d40abe1f8c95aef9a209595dadf78abffb4fdfe_640.jpg',
      activity: 'Feature Development',
      time: '1:00 PM',
      percentage: 51,
    },
    {
      image:
        'https://pixabay.com/get/gd48ecbac2360e4c7fc2733f7199e9579f23a668a923423a6474f0e20e214c1e42dc57e830c319cf05f5db0bd4f44fdff02102f313fd5f96585b8b81a4d40abe1f8c95aef9a209595dadf78abffb4fdfe_640.jpg',
      activity: 'Testing',
      time: '2:00 PM',
      percentage: 28,
    },
    {
      image:
        'https://pixabay.com/get/gd48ecbac2360e4c7fc2733f7199e9579f23a668a923423a6474f0e20e214c1e42dc57e830c319cf05f5db0bd4f44fdff02102f313fd5f96585b8b81a4d40abe1f8c95aef9a209595dadf78abffb4fdfe_640.jpg',
      activity: 'Deployment',
      time: '3:00 PM',
      percentage: 62,
    },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hours Tracked</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">164</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+4 new this week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center border p-2 rounded-md"
                >
                  <img
                    src={activity.image}
                    alt={`Activity ${index + 1}`}
                    className="h-auto w-full rounded-md"
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
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Efficiency</CardTitle>
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
            <div className="text-xs text-muted-foreground mt-1">Time Tracked: 40 hours</div>
          </div>
              </div>
              <div className="flex items-center">
          <div className="w-full">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Project B</span>
              <span className="text-sm font-medium">72%</span>
            </div>
            <Progress value={72} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">Time Tracked: 35 hours</div>
          </div>
              </div>
              <div className="flex items-center">
          <div className="w-full">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Project C</span>
              <span className="text-sm font-medium">63%</span>
            </div>
            <Progress value={63} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">Time Tracked: 28 hours</div>
          </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* You would typically fetch this data from an API */}
    </div>
  )
}
