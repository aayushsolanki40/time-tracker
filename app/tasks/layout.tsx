'use client'
import { store } from '@/store'
import { Provider } from 'react-redux'

import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {/* No need to wrap with <html> and <body>, Next.js does that automatically */}
      <main>{children}</main>
    </Provider>
  )
}
