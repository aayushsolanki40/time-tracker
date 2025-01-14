export default function LoadingPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-32 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="w-64">
            <div className="h-5 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <div className="space-y-3 w-full max-w-[80%]">
                <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-32 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-16 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 w-36 bg-gray-200 animate-pulse rounded"></div>
                  <div className="h-4 w-44 bg-gray-200 animate-pulse rounded"></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="h-9 w-9 bg-gray-200 animate-pulse rounded"></div>
                <div className="h-9 w-9 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
