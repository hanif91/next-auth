import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1 className="">
        NextAuth.js</h1>  

      <Link 
        href="/register">Register Page</Link>
      <Link 
        href="/login">Login</Link>
    </main>
  )
}
