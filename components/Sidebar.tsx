'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation' // Update this import
import { Home, Users, Briefcase, Clock, Plus, Bell } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Teams', href: '/teams', icon: Users },
  { name: 'Docs', href: '/docs', icon: Briefcase },
  // { name: 'Clips', href: '/clips', icon: CheckSquare },
  { name: 'Timesheets', href: '/time-tracking', icon: Clock },
]

const spaces = [
  { name: 'Everything', href: '/everything', icon: Home },
  { name: 'Team Space', href: '/team-space', icon: Users },
  {
    name: 'Projects',
    href: '/projects',
    icon: Briefcase,
    subItems: [
      { name: 'Project 1', href: '/tasks' },
      { name: 'Project 2', href: '/tasks' },
      { name: 'Project Notes', href: '/tasks' },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname() // This will now work correctly

  return (
    <div className="flex flex-col w-64 bg-white border-r text-sm">
      {/* Top Section */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <span className="text-lg font-semibold text-gray-800">Aayush S.</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto">
        {/* Main Section */}
        <ul className="px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded hover:bg-gray-100 ${
                  pathname === item.href
                    ? 'bg-gray-100 text-gray-800'
                    : 'text-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Favorites
        </div>

        {/* Favorites Section */}
        <ul className="px-4 space-y-2">
          {spaces.map((space) => (
            <li key={space.name}>
              <div className="group">
                <Link
                  href={space.href}
                  className={`flex items-center p-2 rounded hover:bg-gray-100 ${
                    pathname === space.href
                      ? 'bg-gray-200 text-gray-800'
                      : 'text-gray-700'
                  }`}
                >
                  <space.icon className="w-5 h-5 mr-3" />
                  {space.name}
                </Link>
                {/* Nested Subitems */}
                {space.subItems && (
                  <ul className="ml-8 mt-1 space-y-1">
                    {space.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          href={subItem.href}
                          className={`block p-2 rounded hover:bg-gray-100 ${
                            pathname === subItem.href
                              ? 'bg-gray-200 text-gray-800'
                              : 'text-gray-500'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Add Space Button */}
        <div className="px-4 mt-4">
          <button className="flex items-center w-full px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
            <Plus className="w-5 h-5 mr-2" />
            Create Space
          </button>
        </div>
      </nav>

      {/* Bottom Help Section */}
      <div className="px-4 py-4 border-t">
        <button className="text-gray-600 hover:underline">Help</button>
      </div>
    </div>
  )
}
