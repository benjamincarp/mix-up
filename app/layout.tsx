import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { draftMode } from 'next/headers'
import ExitDraftModeLink from './components/ExitDraftModeLink'
import Link from 'next/link'
// import GlassIcon from './components/GlassIcon'

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
            Home
          </Link>
        </div>
      </body>
    </html>
  )
}

function GlassIcon (){
  const width = 35
  const height = 35

  //thanks https://www.svgrepo.com/svg/209886/whiskey?edit=true
  return (<svg height={`${height}px`} width={`${width}px`} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M509.425,9.499c-1.936-2.177-4.71-3.423-7.624-3.423H10.199c-2.913,0-5.688,1.246-7.623,3.423 c-1.936,2.178-2.848,5.078-2.506,7.972l56.617,479.45c0.607,5.134,4.959,9.003,10.129,9.003h378.367 c5.17,0,9.523-3.869,10.129-9.003l56.618-479.45C512.271,14.577,511.36,11.676,509.425,9.499z M436.118,485.525H75.882 L50.243,268.408h411.514L436.118,485.525z M464.166,248.009H47.834L21.674,26.474h468.653L464.166,248.009z"></path> </g> </g> <g> <g> <path d="M252.931,381.738l-71.085-71.085c-1.912-1.912-4.507-2.987-7.212-2.987c-2.705,0-5.299,1.075-7.212,2.987l-71.085,71.085 c-1.912,1.913-2.987,4.507-2.987,7.212s1.075,5.298,2.987,7.212l71.085,71.084c1.991,1.991,4.602,2.987,7.212,2.987 s5.221-0.996,7.212-2.987l71.085-71.084c1.912-1.913,2.987-4.507,2.987-7.212S254.844,383.652,252.931,381.738z M174.634,445.612 l-56.662-56.662l56.662-56.662l56.662,56.662L174.634,445.612z"></path> </g> </g> <g> <g> <path d="M428.919,356.328l-71.084-71.084c-3.983-3.98-10.439-3.982-14.425,0l-71.085,71.084c-1.912,1.913-2.987,4.507-2.987,7.212 s1.075,5.298,2.987,7.212l71.086,71.086c1.913,1.912,4.507,2.987,7.212,2.987s5.298-1.075,7.212-2.987l71.084-71.085 C432.902,366.77,432.902,360.312,428.919,356.328z M350.624,420.203l-56.662-56.662l56.662-56.662l56.661,56.662L350.624,420.203z "></path> </g> </g> <g> <g> <path d="M205.183,42.531H52.731c-5.633,0-10.199,4.567-10.199,10.199S47.098,62.93,52.731,62.93h152.452 c5.633,0,10.199-4.567,10.199-10.199S210.816,42.531,205.183,42.531z"></path> </g> </g> <g> <g> <path d="M249.373,42.531h-5.524c-5.633,0-10.199,4.567-10.199,10.199s4.566,10.199,10.199,10.199h5.524 c5.633,0,10.199-4.567,10.199-10.199S255.006,42.531,249.373,42.531z"></path> </g> </g> </g></svg>)
}
