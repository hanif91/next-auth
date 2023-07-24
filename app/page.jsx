'use client'

import Link from 'next/link'
import { useState } from 'react'
import Guest from '@components/guest'
import Profile from '@components/profile'
import { useRouter } from 'next/router'
import { getSession, useSession,signOut } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'

export default function Home() {
  const { data: session} = useSession();

  function handleSignOut(){
    signOut()
  }

  return (
    <main>
      {session ? <Profile
                  session={session}
                  handleSignOut={handleSignOut}/> : <Guest/>}
    </main>
  )
}


export async function getServerSideProps({req}){

  const session = await getSession({req})
 
  if(!session) {
    return {
      redirect : {
        destination : "/login",
        permanent :false
      }
    }
  }

  return {
    props : {session}
  }
}
