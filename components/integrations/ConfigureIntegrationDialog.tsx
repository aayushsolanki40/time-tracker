'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface ConfigureIntegrationDialogProps {
  integration: {
    id: string
    name: string
    icon: React.ElementType
  }
  isOpen: boolean
  onClose: () => void
  onSave: (config: IntegrationConfig) => Promise<void>
}

interface IntegrationConfig {
  id: string
  apiKey?: string
  workspaceUrl?: string
  clientId?: string
  clientSecret?: string
}

const INTEGRATION_FIELDS = {
  slack: [
    {
      key: 'workspaceUrl',
      label: 'Workspace URL',
      placeholder: 'https://your-workspace.slack.com',
    },
    {
      key: 'clientId',
      label: 'Client ID',
      placeholder: 'Enter your Slack client ID',
    },
    {
      key: 'clientSecret',
      label: 'Client Secret',
      placeholder: 'Enter your Slack client secret',
    },
  ],
  teams: [
    {
      key: 'clientId',
      label: 'Application ID',
      placeholder: 'Enter your Microsoft Teams app ID',
    },
    {
      key: 'clientSecret',
      label: 'Client Secret',
      placeholder: 'Enter your client secret',
    },
  ],
  zoom: [
    { key: 'apiKey', label: 'API Key', placeholder: 'Enter your Zoom API key' },
    {
      key: 'clientSecret',
      label: 'API Secret',
      placeholder: 'Enter your Zoom API secret',
    },
  ],
  gcal: [
    {
      key: 'clientId',
      label: 'Client ID',
      placeholder: 'Enter your Google Calendar client ID',
    },
    {
      key: 'clientSecret',
      label: 'Client Secret',
      placeholder: 'Enter your client secret',
    },
  ],
}

export function ConfigureIntegrationDialog({
  integration,
  isOpen,
  onClose,
  onSave,
}: ConfigureIntegrationDialogProps) {
  const [config, setConfig] = useState<IntegrationConfig>({
    id: integration.id,
  })
  const [status, setStatus] = useState<
    'idle' | 'verifying' | 'success' | 'error'
  >('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const fields =
    INTEGRATION_FIELDS[integration.id as keyof typeof INTEGRATION_FIELDS] || []

  const handleInputChange = (key: string, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
    setStatus('idle')
    setErrorMessage('')
  }

  const handleVerify = async () => {
    setStatus('verifying')
    try {
      // Here you would typically make an API call to verify the credentials
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulated API call

      // Simulate verification
      const isValid = Object.values(config).every(
        (value) => value && value.length > 0,
      )
      if (!isValid) {
        throw new Error('Invalid configuration. Please check all fields.')
      }

      setStatus('success')
      await onSave(config)
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Failed to verify configuration',
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configure {integration.name}</DialogTitle>
          <DialogDescription>
            Enter your {integration.name} credentials to enable integration.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {fields.map(({ key, label, placeholder }) => (
            <div className="space-y-2" key={key}>
              <Label htmlFor={key}>{label}</Label>
              <Input
                id={key}
                type={
                  key.toLowerCase().includes('secret') ? 'password' : 'text'
                }
                placeholder={placeholder}
                value={config[key as keyof IntegrationConfig] || ''}
                onChange={(e) => handleInputChange(key, e.target.value)}
              />
            </div>
          ))}

          {status === 'error' && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {status === 'success' && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Success</AlertTitle>
              <AlertDescription className="text-green-600">
                Integration configured successfully
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleVerify}
            disabled={status === 'verifying' || status === 'success'}
          >
            {status === 'verifying' && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {status === 'success' ? 'Configured' : 'Verify & Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
