import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function LoadingPage() {
  return (
    <div className="container xl:max-w-[2560px] mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div className="h-8 w-32 bg-gray-200 animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-gray-200 animate-pulse rounded-lg" />
                  <div className="h-6 w-32 bg-gray-200 animate-pulse rounded" />
                </div>
                <div className="h-6 w-12 bg-gray-200 animate-pulse rounded-full" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
