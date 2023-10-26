import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { draftMode } from 'next/headers'
import ExitDraftModeLink from './components/ExitDraftModeLink'
import Link from 'next/link'
import GlassIcon from './components/GlassIcon'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MixUp',
  description: 'Cocktails Curated',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {draftMode().isEnabled && (
            <p className="bg-orange-200 py-4 px-[6vw]">
              Draft mode is currently on! <ExitDraftModeLink className="underline" />
            </p>
          )}
        {children}
        <div className='flex flex-row justify-center mt-3'>
          <Link href={"/"}>
            <GlassIcon />
          </Link>
        </div>
      </body>
    </html>
  )
}
