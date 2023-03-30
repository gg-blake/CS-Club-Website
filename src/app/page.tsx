'use client';

import { Inter } from 'next/font/google'
import { useEffect , useState } from 'react'
import Splash from './sections/splash' 
import styles from './page.module.css'
import About from './sections/about';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const handleScroll = () => {
    const treeElement = document.getElementById('tree');
    if (treeElement) {
      treeElement.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      treeElement.style.height = `${window.scrollY * 0.5}px`;
    }
    
  }

  return (
    <>
    <div className='bg-black'>
      <div id="tree" className='w-3 h-0 z-50 absolute left-5 top-[calc(50vh_+_100px)] rounded-md bg-steel-pink'></div>
      <div className='z-0 relative h-screen overflow-clip bg-[#000000]'>
        <Splash />
      </div>
      <div className="w-screen h-auto min-h-screen bg-gradient-to-t from-black to-transparent z-20">
        <About />
      </div>
    </div>
    
    </>
    
  )
}
