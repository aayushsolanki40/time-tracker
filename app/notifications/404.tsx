import React from 'react'
import { Bell, InboxIcon } from 'lucide-react'

export default function EmptyState() {
  return (
    <div className="min-h-full bg-white border rounded-lg shadow-sm">
      {/* Header Section - keeping it for consistency */}
      <div className="px-6 py-2.5 bg-gray-50 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-600">Today</h2>
      </div>

      {/* Empty State Content */}
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative mb-6">
          {/* Large inbox icon with notification bell overlay */}
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <InboxIcon className="w-8 h-8 text-gray-400" />
          </div>
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
            <Bell className="w-3 h-3 text-gray-400" />
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Notifications Yet
        </h3>

        <p className="text-sm text-gray-500 text-center max-w-sm">
          When you receive notifications about your tasks and projects, they'll
          show up here
        </p>
      </div>
    </div>
  )
}
