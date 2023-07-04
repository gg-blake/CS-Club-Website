'use client';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import React, { useState , useRef, useEffect } from 'react'
import Splash from '@/app/components/sections/splash';
import About from '@/app/components/sections/about';
import Events from '@/app/components/sections/events';
import Announcements from '@/app/components/sections/announcements';
import Timeline from '@/app/components/core/timeline';
import Officers from '@/app/components/sections/officers';
import NavBar from '@/app/components/core/nav-bar';
import { AuthContextProvider } from '@/app/components/context/auth-context';
import { LangContextProvider } from '@/app/components/context/lang-context';
import { ViewportProvider } from './components/context/viewport-context';


const SECTION_TITLES_EN = ["About", "Announcements",  "Events", "Officers"];
const SPLASH_TITLE_EN = "CS CLUB";
const SPLASH_DESC_EN = "UMass Boston's official center for technology-driven students!";
const SECTION_TITLES_JP = ["サークルニツイテ", "オシラセ", "イベント", "ヤクイン"];
const SPLASH_TITLE_JP = "「シ・エス」のサークル";
const SPLASH_DESC_JP = "テクノロジーが好きなマサチューセッツ大学ボストン校のガクセイが会うところ！";
const SECTION_TITLES_ES = ["AcercaDe", "Anuncios", "Eventos", "Oficiales"];
const SPLASH_TITLE_ES = "CLUB de INFORMÁTICA";
const SPLASH_DESC_ES = "El centro oficial de UMass Boston para estudiantes impulsados por la tecnología";

const ABOUT_IMAGE_CAROUSEL_DATA = [
  {
    filename: "/carousel2.jpg",
    alt: {
      "en": "Celebrating the finale of our first group project competition",
      "ja": "さいしょ の グループ プロジェクト コンテスト の フィナーレ を いわう",
      "es": "Celebrando el final de nuestra primera competencia de proyectos de grupo"
    }
  },
  {
    filename: "/carousel1.jpg",
    alt: {
      "en": "Our first ever club selfie!",
      "ja": " はじめて の クラブ セル フィー！",
      "es": "¡Nuestro primer selfie del grupo!"
    }
  },
  {
    filename: "/carousel3.jpg",
    alt: {
      "en": "Club members collaborating on our latest LeetCode competition problem!",
      "ja": "さいしん の LeetCode コンテスト の もんだい に とりくむ クラブ メンバー！",
      "es": "¡Los miembros del club colaborando en nuestro último competencia de LeetCode!"
    }
  },
  {
    filename: "/carousel4.jpg",
    alt: {
      "en": "Don't worry, the marker came off!",
      "ja": " しんぱい しないで、 マーカー は とれました！",
      "es": "¡No te preocupes, el marcador se borró!"
    }
  },
]

function BackgroundProvider({ backgroundImage }: { backgroundImage: number }) {
  return (
    <>
    <img style={{ opacity: backgroundImage === 0 ? 1 : 0 }} className="w-screen h-screen object-cover fixed top-0 z-0 saturate-0 brightness-[15%] transition-opacity duration-300" src="/umass-uhall-outside.svg" />
    <img style={{ opacity: backgroundImage === 1 ? 1 : 0 }} className="w-screen h-screen object-cover fixed top-0 z-0 saturate-0 brightness-[15%] transition-opacity duration-300" src="/umass-uhall-inside.svg" />
    <img style={{ opacity: backgroundImage === 2 ? 1 : 0 }} className="w-screen h-screen object-cover fixed top-0 z-0 saturate-0 brightness-[15%] transition-opacity duration-300" src="/umass-isc-outside.svg" />
    </>
  )
}

export default function Home() {
  const [touchingTop, setTouchingTop] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState<number>(-1);


  

  useEffect(() => {
    addEventListener('scroll', (e: Event) => {
      setTouchingTop(window.scrollY < window.innerHeight);
      if (window.scrollY > (window.innerHeight / 2) && window.scrollY < window.innerHeight * 2.0) {
        setBackgroundImage(0);
      } else if (window.scrollY > window.innerHeight * 2.0 && window.scrollY < window.innerHeight * 3.5) {
        setBackgroundImage(1);
      } else if (window.scrollY > window.innerHeight * 3.5 && window.scrollY < window.innerHeight * 5.5) {
        const r = document.querySelector(':root');
        

        setBackgroundImage(2);
      } else {
        setBackgroundImage(-1);
      }
    });
    return () => {
      removeEventListener('scroll', (e: Event) => {});
    }
  }, []);

  return (
    <LangContextProvider>
      <AuthContextProvider>
        <ViewportProvider>
          <NavBar className={`text-lg fixed top-0 bg-secondary-900 p-2 md:pl-6 md:py-1 ${touchingTop ? "bg-opacity-0" : " border-b-[1px] border-secondary-700 bg-opacity-50 backdrop-blur-lg shadow-lg"}`} ids={{"en": SECTION_TITLES_EN, "ja": SECTION_TITLES_JP, "es": SECTION_TITLES_ES}} />
          <Splash title={{'en': SPLASH_TITLE_EN, 'ja': SPLASH_TITLE_JP, 'es': SPLASH_TITLE_ES}} desc={{'en': SPLASH_DESC_EN, 'ja': SPLASH_DESC_JP, 'es': SPLASH_TITLE_ES}} />
          <BackgroundProvider backgroundImage={backgroundImage} />
          <Timeline className='w-full max-w-[calc(100vw)] h-auto min-h-screen bg-transparent' titles={{ "en": SECTION_TITLES_EN, "ja": SECTION_TITLES_JP, "es": SECTION_TITLES_ES }}>
            <About images={ABOUT_IMAGE_CAROUSEL_DATA} />
            <Announcements />
            <Events />
            <Officers />
          </Timeline>
        </ViewportProvider>
      </AuthContextProvider>
    </LangContextProvider>
  )
}
