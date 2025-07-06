import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'trafficAz',
  description: 'TrafficAZ is an intelligent, voice-activated traffic monitoring and reporting application designed for drivers',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
