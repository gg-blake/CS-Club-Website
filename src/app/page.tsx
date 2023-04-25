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
import { LangContext, LangContextProvider } from './components/langcontext';


const inter = Inter({ subsets: ['latin'] });
const SECTION_TITLES_EN = ["About", "Announcements",  "Events", "Officers"];
const SECTION_TITLES_JP = ["サクルについて", "お知らせ", "イベント", "役員"];
const SPLASH_TITLE_EN = "CS CLUB";
const SPLASH_TITLE_JP = "コンピューターサイエンスのサクル";
const SPLASH_DESC_EN = "UMass Boston's official center for technology-driven students!";
const SPLASH_DESC_JP = "テクノロジーが好きなウマッスボストンの学生が会うところ！";

export default function Home() {
  const [touchingTop, setTouchingTop] = useState(true);

  useEventListener('scroll', (e: Event) => {
    setTouchingTop(window.scrollY < window.innerHeight);
  }, window);

  return (
    <LangContextProvider>
      <AuthContextProvider>
        <div className={`bg-secondary-900 overflow-x-hidden w-screen  ${inter.className}`}>
          <NavBar className={`text-lg fixed top-0 bg-secondary-900 p-2 md:pl-6 md:py-1 ${touchingTop ? "bg-opacity-0" : " border-b-[1px] border-secondary-700 bg-opacity-50 backdrop-blur-lg shadow-lg"}`} ids={{"en": SECTION_TITLES_EN, "jp": SECTION_TITLES_JP}} />
          <Splash title={{'en': SPLASH_TITLE_EN, 'jp': SPLASH_TITLE_JP}} desc={{'en': SPLASH_DESC_EN, 'jp': SPLASH_DESC_JP}} />
          <Timeline className='w-full h-auto min-h-screen bg-secondary-900' titles={{"en": SECTION_TITLES_EN, "jp": SECTION_TITLES_JP}}>
            <About />
            <Announcements />
            <Events />
            <Officers />
          </Timeline>
        </div>
      </AuthContextProvider>
    </LangContextProvider>
  )
}
