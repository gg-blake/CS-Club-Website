'use client';

import { Inter } from 'next/font/google'
import { useEffect , useState } from 'react'
import Splash from './sections/splash' 
import styles from './page.module.css'
import About from './sections/about';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [scroll, setScroll] = useState<number>(0);
  // create a an event listener for scroll distance from top
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleScroll() {
    setScroll(window.scrollY);
  }

  useEffect(() => {
    console.log(scroll);
  }, [scroll])

  return (
    <div className="w-screen h-auto min-h-screen bg-gradient-to-r from-eerie-black to-jet-black">
      <Splash scroll={scroll} />
      <About />
    </div>
  )
}
