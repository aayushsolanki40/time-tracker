'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users,
  Clock,
  Bell,
  AppWindow,
  Plus,
  Minus,
  File,
  HelpCircle,
  Folder,
  FolderClock,
  CalendarIcon,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useState } from 'react'
import { cn } from '@/lib/utils'

// Color Theme
const colors = {
  primary: {
    bg: 'bg-blue-50',
    text: 'text-secondary-blue  ',
    hover: 'hover:bg-blue-100',
    border: 'border-blue-200',
  },
  secondary: {
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    hover: 'hover:bg-gray-100',
    border: 'border-gray-200',
  },
  sprint: {
    active: 'text-emerald-600',
    completed: 'text-gray-400',
    planned: 'text-blue-600',
  },
}

interface Sprint {
  id: string
  name: string
  status: 'active' | 'completed' | 'planned'
  startDate: string
  endDate: string
  tasks: number
}

interface Project {
  id: string
  name: string
  href: string
  sprints: Sprint[]
  isExpanded?: boolean
}

const navItems = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Projects', href: '/projects', icon: FolderClock },
  { name: 'Teams', href: '/teams', icon: Users },
  { name: 'Docs', href: '/docs', icon: File },
  { name: 'Timesheet', href: '/timesheet', icon: Clock },
  { name: 'Integrations', href: '/integrations', icon: AppWindow },
]

const demoProjects: Project[] = [
  {
    id: 'proj1',
    name: 'Project Alpha',
    href: '/tasks/alpha',
    sprints: [
      {
        id: 'sp1',
        name: 'Sprint 1',
        status: 'completed',
        startDate: '2022-01-25',
        endDate: '2022-09-05',
        tasks: 35,
      },
      {
        id: 'sp2',
        name: 'Sprint 2',
        status: 'active',
        startDate: '2022-01-25',
        endDate: '2022-09-05',
        tasks: 35,
      },
      {
        id: 'sp3',
        name: 'Sprint 3',
        status: 'planned',
        startDate: '2022-01-25',
        endDate: '2022-05-05',
        tasks: 35,
      },
    ],
  },
  {
    id: 'proj2',
    name: 'Project Beta',
    href: '/tasks/beta',
    sprints: [
      {
        id: 'sp4',
        name: 'Sprint 1',
        status: 'completed',
        startDate: '2022-01-25',
        endDate: '2022-02-05',
        tasks: 35,
      },
      {
        id: 'sp5',
        name: 'Sprint 2',
        status: 'active',
        startDate: '2022-01-25',
        endDate: '2022-02-05',
        tasks: 35,
      },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [expandedProjects, setExpandedProjects] = useState<
    Record<string, boolean>
  >({})
  const [projectsExpanded, setProjectsExpanded] = useState(true)
  const [sprintDisplayCounts, setSprintDisplayCounts] = useState<
    Record<string, number>
  >(
    demoProjects.reduce(
      (acc, project) => {
        acc[project.id] = 2 // Initial display of 3 sprints
        return acc
      },
      {} as Record<string, number>,
    ),
  )

  const toggleProject = (projectId: string) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [projectId]: !prev[projectId],
    }))
  }

  const toggleProjectsSection = () => {
    setProjectsExpanded(!projectsExpanded)
  }

  const loadMoreSprints = (projectId: string) => {
    setSprintDisplayCounts((prev) => ({
      ...prev,
      [projectId]: (prev[projectId] || 3) + 3, // Load 3 more sprints each time
    }))
  }

  const ExpandIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <div
      className={cn(
        'flex items-center justify-center w-4 h-4 rounded',
        'border text-xs font-medium transition-colors duration-200',
        isExpanded ? colors.primary.text : colors.secondary.text,
        isExpanded ? colors.primary.border : colors.secondary.border,
        isExpanded ? colors.primary.bg : colors.secondary.bg,
        'hover:bg-opacity-75',
      )}
    >
      {isExpanded ? (
        <Minus className="w-3 h-3" />
      ) : (
        <Plus className="w-3 h-3" />
      )}
    </div>
  )

  return (
    <div className="flex flex-col w-64 bg-white border-r text-sm">
      {/* Top Section */}
      <div className="flex items-center gap-3 h-16 px-4 border-b bg-gradient-to-r from-blue-50 to-white">
        <Avatar className="h-8 w-8 rounded-none">
          <AvatarImage
            className="rounded-md"
            src="/api/placeholder/32/32"
            alt="Aayush S."
          />
          <AvatarFallback className="rounded-md font-[600] text-blue-800">
            AS
          </AvatarFallback>
        </Avatar>
        <span className="text-lg font-semibold text-gray-800">Aayush S.</span>
      </div>
      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto">
        {/* Main Section */}
        <ul className="px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center p-2 rounded-md transition-colors duration-200',
                  pathname === item.href
                    ? `${colors.primary.bg} ${colors.primary.text}`
                    : `${colors.secondary.text} ${colors.secondary.hover}`,
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
          Favorites
        </div>

        {/* Projects Section */}
        <div className="px-4 py-2 space-y-1">
          <div
            className={cn(
              'flex items-center justify-between p-2 cursor-pointer rounded-md',
              'transition-colors duration-200',
              projectsExpanded ? colors.primary.bg : colors.secondary.hover,
            )}
            onClick={toggleProjectsSection}
          >
            <div className="flex items-center">
              <Folder
                className={cn(
                  'w-5 h-5 mr-3',
                  projectsExpanded
                    ? colors.primary.text
                    : colors.secondary.text,
                )}
              />
              <span
                className={cn(
                  'font-medium',
                  projectsExpanded
                    ? colors.primary.text
                    : colors.secondary.text,
                )}
              >
                Projects
              </span>
            </div>
            <ExpandIcon isExpanded={projectsExpanded} />
          </div>

          {projectsExpanded && (
            <div className="ml-1 space-y-1">
              {demoProjects.map((project) => (
                <div key={project.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ExpandIcon isExpanded={expandedProjects[project.id]} />
                    <Link
                      href={project.href}
                      className={cn(
                        'flex-1 p-2 rounded-md text-sm',
                        'transition-colors duration-200',
                        pathname === project.href
                          ? `${colors.primary.bg} ${colors.primary.text}`
                          : `${colors.secondary.text} ${colors.secondary.hover}`,
                      )}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleProject(project.id)
                      }}
                    >
                      {project.name}
                    </Link>
                  </div>

                  {expandedProjects[project.id] && (
                    <div
                      className={cn(
                        'ml-6 space-y-1 pl-1 ',
                        'border-l-2 border-b   border-gray-400 border-dashed last:border-b-0',
                      )}
                    >
                      {project.sprints.map((sprint) => (
                        <Link
                          key={sprint.id}
                          href={`${project.href}/sprints/${sprint.id}`}
                          className={cn(
                            'flex items-center py-1 px-2 text-sm rounded-md',
                            'transition-colors duration-200',
                            pathname === `${project.href}/sprints/${sprint.id}`
                              ? colors.primary.bg
                              : colors.secondary.hover,
                          )}
                        >
                          <div
                            className={`
                              w-full
                              last:border-b-0
                              hover:bg-sidebar-accent/5
                              transition-colors duration-200
                              border-gray-500
                            `}
                          >
                            {/* Sprint Title */}
                            <div className="text-sidebar-foreground font-medium text-sm flex justify-between w-full">
                              <span className="text-[12px]">{sprint.name}</span>
                              <span className="flex items-center text-[10px] text-gray-500 space-x-1">
                                <File className="w-3 h-3 mr-1" />
                                {sprint.tasks}
                                <span>tasks</span>
                              </span>
                            </div>

                            {/* Sprint Details */}
                            <div className="flex items-center space-x-3 text-[10px] text-sidebar-foreground/70 mt-1">
                              <span className="flex items-center">
                                <CalendarIcon className="w-3 h-3 mr-1" />
                                {new Date(sprint.startDate).toLocaleDateString(
                                  'en-US',
                                  {
                                    month: 'short',
                                    day: 'numeric',
                                  },
                                )}{' '}
                                -{' '}
                                {new Date(sprint.endDate).toLocaleDateString(
                                  'en-US',
                                  {
                                    month: 'short',
                                    day: 'numeric',
                                  },
                                )}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}

                      {sprintDisplayCounts[project.id] <
                        project.sprints.length && (
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            loadMoreSprints(project.id)
                          }}
                          className={cn(
                            'w-full text-center py-1 text-xs text-gray-500',
                            'hover:bg-gray-100 rounded-md',
                            'transition-colors duration-200',
                          )}
                        >
                          Load More Sprints
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Add Space Button */}
        <div className="px-4 mt-4">
          <button className="flex items-center w-full px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200">
            <Plus className="w-5 h-5 mr-2" />
            Add New Project
          </button>
        </div>
      </nav>
      {/* Bottom Help Section */}
      <div className="px-4 py-4 border-t">
        <button className="flex text-gray-600 hover:underline">
          <HelpCircle className="w-5 h-5 mr-2" />
          Help
        </button>
      </div>
    </div>
  )
}
