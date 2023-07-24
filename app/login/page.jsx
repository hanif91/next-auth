'use client'

import Link from 'next/link'
import styles from '../../styles/Form.module.css';
import Image from 'next/image'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"


function LoginPage() {
  
  const [show, setShow] = useState(false)
  console.log(process.env.callbackurlgoogle)

  const handleGoogleSignin = async (e) => {
    e.preventDefault()
    await signIn('google',{
        callbackUrl : process.env.callbackurlgoogle
    })
  } 

  const handleGithubSignin = async (e) => {
    e.preventDefault()
    await signIn('github',{
        callbackUrl : process.env.callbackurlgoogle
    })
  } 
  


  return (
    <>
<section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className='text-gray-800 text-4xl font-bold py-4'>Explore</h1>
                <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, officia?</p>
            </div>

            {/* form */}
            <form className='flex flex-col gap-5'>
                <div className={styles.input_group}>
                    <input 
                    type="email"
                    name='email'
                    placeholder='Email'
                    className={styles.input_text}
                    />
                    <span className='icon flex items-center px-4'>
                        <HiAtSymbol size={25} />
                    </span>
                </div>
                <div className={styles.input_group}>
                    <input 
                    type={`${show ? "text" : "password"}`}
                    name='password'
                    placeholder='password'
                    className={styles.input_text}
                    />
                     <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                        <HiFingerPrint size={25} />
                    </span>
                </div>

                {/* login buttons */}
                <div className="input-button">
                    <button type='submit' className={styles.button}>
                        Login
                    </button>
                </div>
                <div className="input-button">
                    <button type='button' onClick={handleGoogleSignin} className={styles.button_custom}>
                        Sign In with Google <Image 
                                    src={'/assets/google.svg'} width="20" alt="btngoogle" height={20} ></Image>
                    </button>
                </div>
                <div className="input-button">
                    <button type='button' onClick={handleGithubSignin} className={styles.button_custom}>
                        Sign In  <Image src={'/assets/github.svg'} alt="btngithub" width={25} height={25}></Image>with Github
                    </button>
                </div>
            </form>

            {/* bottom */}
            <p className='text-center text-gray-400 '>
                don't have an account yet? 
                <Link href={'/register'}
                   className='text-blue-700'>Sign Up</Link>
            </p>
        </section>

    </>
  )
}

export default LoginPage