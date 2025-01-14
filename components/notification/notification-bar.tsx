import React from 'react'

function NotificationBar() {
  return (
    <div className="h-10 bg-notification-blue flex items-center justify-between px-4 text-white text-sm">
      <span>App needs your permission to send notifications</span>
      <div className="flex gap-2">
        <button className="text-white bg-white/20 px-3 py-1 rounded-md hover:bg-white/30">
          Enable
        </button>
        <button className="text-white bg-white/20 px-3 py-1 rounded-md hover:bg-white/30">
          Remind me
        </button>
        <button className="text-white hover:text-gray-300">✕</button>
      </div>
    </div>
  )
}

export default NotificationBar
