export default function LoadingPage() {
  return (
    <div className="container xl:max-w-[2560px] mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Documents</h1>
        <div className="flex items-center gap-4">
          {/* Project Selector Loading State */}
          <div className="w-[200px] h-10 bg-gray-200 animate-pulse rounded" />
          {/* Add Document Button Loading State */}
          <div className="w-[120px] h-10 bg-gray-200 animate-pulse rounded" />
        </div>
      </div>

      {/* Document List Loading State */}
      <div className="bg-white rounded-lg shadow">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                {/* Document Title */}
                <div className="h-6 w-48 bg-gray-200 animate-pulse rounded" />

                {/* File Name */}
                <div className="flex items-center gap-2">
                  <div className="h-5 w-32 bg-gray-200 animate-pulse rounded" />
                </div>

                {/* Description */}
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />

                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {/* Project Name */}
                  <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  {/* Upload Info */}
                  <div className="h-4 w-36 bg-gray-200 animate-pulse rounded" />
                  {/* Assigned To */}
                  <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 bg-gray-200 animate-pulse rounded" />
                <div className="h-9 w-9 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Document Count Loading State */}
      <div className="flex items-end mt-3">
        <div className="h-4 w-32 bg-gray-200 animate-pulse rounded" />
      </div>
    </div>
  )
}
