'use client';
import { Inter } from 'next/font/google';
import React, { useState , useRef, useEffect } from 'react'
import Splash from './sections/splash';
import GenericSection from './components/generic-section';
import useEventListener from '@/hooks/useEventListener';
import ProfileCard from './components/profile-card';
import About from './sections/about';
import Events from './components/events';
import Announcements from './components/announcements';
import Timeline from './components/timeline';
import Officers from './sections/officers';
import NavBar from './components/navbar';
import { AuthContextProvider } from './components/authcontext';


const inter = Inter({ subsets: ['latin'] })
const SECTION_TITLES = ["About", "Announcements",  "Events", "Officers"];

export default function Home() {
  const [touchingTop, setTouchingTop] = useState(true);

  useEventListener('scroll', (e: Event) => {
    setTouchingTop(window.scrollY < window.innerHeight);
  }, window);

  return (
    <AuthContextProvider>
      <div className={`bg-secondary-900 overflow-x-hidden w-screen  ${inter.className}`}>
        <NavBar className={`text-lg fixed top-0 bg-secondary-900 gap-3 justify-center md:justify-start p-2 md:pl-6 md:py-1 ${touchingTop ? "bg-opacity-0" : " border-b-[1px] border-secondary-700 bg-opacity-50 backdrop-blur-lg shadow-lg"}`} ids={SECTION_TITLES} />
        <Splash />
        <Timeline className='w-full h-auto min-h-screen bg-gradient-to-t from-black to-transparent z-20' titles={SECTION_TITLES}>
          <About />
          <Announcements />
          <Events />
          <Officers />
        </Timeline>
      </div>
    </AuthContextProvider>
    
  )
}
