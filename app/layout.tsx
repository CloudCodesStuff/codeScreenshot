import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Slab',
  description: 'Make your code wonderful.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body> <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >{children}<Analytics></Analytics>
      </ThemeProvider></body>

    </html>
  )
}
