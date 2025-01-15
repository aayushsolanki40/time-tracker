'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import {
  Slack,
  MessageSquare,
  Video,
  Calendar,
  CheckCircle2,
} from 'lucide-react'
import { ConfigureIntegrationDialog } from '@/components/integrations/ConfigureIntegrationDialog'
import { toast } from '@/components/ui/use-toast'

interface Integration {
  id: string
  name: string
  description: string
  icon: React.ElementType
  isConnected: boolean
  isConfigured: boolean
}

const initialIntegrations: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    description:
      'Connect with Slack to sync status updates and receive notifications.',
    icon: Slack,
    isConnected: false,
    isConfigured: false,
  },
  {
    id: 'teams',
    name: 'Microsoft Teams',
    description:
      'Integrate with Microsoft Teams for seamless communication and status sharing.',
    icon: MessageSquare,
    isConnected: false,
    isConfigured: false,
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Track time spent in Zoom meetings automatically.',
    icon: Video,
    isConnected: false,
    isConfigured: false,
  },
  {
    id: 'gcal',
    name: 'Google Calendar',
    description:
      'Sync with Google Calendar to track meeting times and availability.',
    icon: Calendar,
    isConnected: false,
    isConfigured: false,
  },
]

export default function IntegrationsPage() {
  const [integrations, setIntegrations] =
    useState<Integration[]>(initialIntegrations)
  const [selectedIntegration, setSelectedIntegration] =
    useState<Integration | null>(null)
  const [isConfigureOpen, setIsConfigureOpen] = useState(false)

  const handleToggleIntegration = (integration: Integration) => {
    if (!integration.isConnected && !integration.isConfigured) {
      setSelectedIntegration(integration)
      setIsConfigureOpen(true)
      return
    }

    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === integration.id
          ? { ...item, isConnected: !item.isConnected }
          : item,
      ),
    )

    toast({
      title: `${integration.name} ${!integration.isConnected ? 'Connected' : 'Disconnected'}`,
      description: `Successfully ${!integration.isConnected ? 'connected to' : 'disconnected from'} ${integration.name}`,
      variant: !integration.isConnected ? 'default' : 'destructive',
    })
  }

  const handleSaveConfig = async (config: any) => {
    // Here you would typically save the configuration to your backend
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulated API call

    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === selectedIntegration?.id
          ? { ...item, isConfigured: true, isConnected: true }
          : item,
      ),
    )

    toast({
      title: 'Integration Configured',
      description: `Successfully configured ${selectedIntegration?.name}`,
    })

    setIsConfigureOpen(false)
    setSelectedIntegration(null)
  }

  return (
    <div className="container xl:max-w-[2560px] mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Integrations</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-lg ${
                      integration.isConnected ? 'bg-green-50' : 'bg-gray-100'
                    }`}
                  >
                    <integration.icon
                      className={`h-6 w-6 ${
                        integration.isConnected
                          ? 'text-green-600'
                          : 'text-gray-600'
                      }`}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      {integration.name}
                      {integration.isConfigured && (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      )}
                    </CardTitle>
                  </div>
                </div>
                <Switch
                  checked={integration.isConnected}
                  onCheckedChange={() => handleToggleIntegration(integration)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{integration.description}</p>
              {integration.isConfigured && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setSelectedIntegration(integration)
                      setIsConfigureOpen(true)
                    }}
                  >
                    Reconfigure
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedIntegration && (
        <ConfigureIntegrationDialog
          integration={selectedIntegration}
          isOpen={isConfigureOpen}
          onClose={() => {
            setIsConfigureOpen(false)
            setSelectedIntegration(null)
          }}
          onSave={handleSaveConfig}
        />
      )}
    </div>
  )
}
