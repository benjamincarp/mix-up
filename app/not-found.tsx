import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main>
      <h1>Sorry, I don't know that one.</h1>
      <Link href="/">Return Home</Link>
    </main>
  )
}