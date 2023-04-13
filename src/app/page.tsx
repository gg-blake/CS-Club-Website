'use client';
import { Inter } from 'next/font/google';
import React, { useState , useRef } from 'react'
import Splash from './sections/splash';
import GenericSection from './components/generic-section';
import useEventListener from '@/hooks/useEventListener';
import ProfileCard from './components/profile-card';
import About from './sections/about';
import Events from './components/events';
import UserContext from './context/user-context';
import Announcements from './sections/announcements';
import Timeline from './components/timeline';
import Officers from './sections/officers';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const aboutSectionRef = useRef<HTMLHeadingElement>(null);
  const [user, setUser] = useState({
    username: "test_user123",
    password: "password123",
    email: "john.doe001@umb.edu",
    sessionStartDate: new Date(Date.now()),
  })
  const value = { user, setUser };

  useEventListener('scroll', (e: Event) => {
    if (!aboutSectionRef.current) return;
    const treeElement = document.getElementById('tree');
    if (treeElement) {
      treeElement.style.transform = `translateY(${aboutSectionRef.current.getBoundingClientRect().top + window.scrollY}px)`;
      
      treeElement.style.height = `calc(${window.scrollY}px - 10vh)`;
    }
  }, window);

  return (
    <UserContext.Provider value={value}>
      <div className='bg-secondary-900 overflow-x-hidden'>
        <Splash />
        <Timeline className='w-screen h-auto min-h-screen bg-gradient-to-t from-black to-transparent z-20' titles={["About Us", "Announcements",  "Events", "Officers"]}>
          <About />
          <Announcements />
          <Events />
          <Officers />
        </Timeline>
      </div>
    </UserContext.Provider>
    
  )
}
