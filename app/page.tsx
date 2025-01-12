import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, CheckCircle, Clock, Users } from "lucide-react";

export default function Dashboard() {
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
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Here you would typically use a chart library like recharts */}
            <div className="h-[200px] bg-muted rounded-md"></div>
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
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Project B</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Project C</span>
                    <span className="text-sm font-medium">63%</span>
                  </div>
                  <Progress value={63} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Time Sheet would go here */}
      {/* You would typically fetch this data from an API */}
    </div>
  );
}
