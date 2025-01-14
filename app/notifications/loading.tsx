export default function Loading() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="min-h-full bg-white border rounded-lg shadow-sm">
        {/* Yesterday Section */}
        <div className="border-b border-gray-100">
          <div className="px-6 py-2.5 bg-gray-50 border-b border-gray-100">
            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
          </div>

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center py-3.5 px-6 border-b border-gray-100 last:border-b-0"
            >
              {/* Checkbox */}
              <div className="flex-shrink-0 w-8">
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
              </div>

              {/* Title */}
              <div className="flex-[2] min-w-0">
                <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Assignee */}
              <div className="flex-[3] flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              {/* Count and Date/Button */}
              <div className="flex items-center gap-6 ml-auto">
                <div className="w-12 h-7 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Last 7 days Section */}
        <div className="border-b border-gray-100">
          <div className="px-6 py-2.5 bg-gray-50 border-b border-gray-100">
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex items-center py-3.5 px-6 border-b border-gray-100 last:border-b-0"
            >
              {/* Checkbox */}
              <div className="flex-shrink-0 w-8">
                <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
              </div>

              {/* Title */}
              <div className="flex-[2] min-w-0">
                <div className="h-5 w-64 bg-gray-200 rounded animate-pulse" />
              </div>

              {/* Assignee */}
              <div className="flex-[3] flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-5 w-28 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>

              {/* Count and Date/Button */}
              <div className="flex items-center gap-6 ml-auto">
                <div className="w-12 h-7 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-20 h-8 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
