'use client';

import { Inter } from 'next/font/google'
import { useEffect , useState , useRef } from 'react'
import Splash from './sections/splash' 
import styles from './page.module.css'
import GenericSection from './components/generic-section';
import useEventListener from '@/hooks/useEventListener';
import ImageCarousel from './components/image-carousel';
//import Image0 from 'src/app/sections/umb.png';
import Image0 from 'C:/Users/Blake/Music/More Life/cover.png';
import Image1 from 'C:/Users/Blake/Music/Kanye West - The Life Of Pablo (June Update) [FLAC]/Cover.jpg';
import Image2 from 'C:/Users/Blake/Music/Nothing Was the Same/cover.png';
import Image3 from 'C:/Users/Blake/Music/Give Or Take/Giveon - Give Or Take.jpg';
import Image4 from 'C:/Users/Blake/Music/[2021] Nurture [CD FLAC]/cover.jpg';
import CardCarousel from './components/gpt-carousel';
import GenericParagraph from './components/generic-paragraph';
import GenericSubsection from './components/generic-subsection';
import ProfileCard from './components/profile-card';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const aboutSectionRef = useRef<HTMLHeadingElement>(null);

  useEventListener('scroll', (e: Event) => {
    if (!aboutSectionRef.current) return;
    const treeElement = document.getElementById('tree');
    if (treeElement) {
      treeElement.style.transform = `translateY(${aboutSectionRef.current.getBoundingClientRect().top + window.scrollY}px)`;
      
      treeElement.style.height = `calc(${window.scrollY}px - 10vh)`;
    }
  }, window);

  return (
    <>
    <div className='bg-secondary-900'>
      <div id="tree" className='w-[5px] h-0 z-50 absolute left-5 rounded-md bg-primary-500'>
        <div className='absolute bottom-0 w-full max-h-full h-5 bg-gradient-to-b from-primary-500 to-secondary-900'></div>
      </div>
      <div className='z-0 relative h-screen overflow-clip '>
        <Splash />
      </div>
      <div className="w-screen h-auto min-h-screen bg-gradient-to-t from-black to-transparent z-20">
        <GenericSection ref={aboutSectionRef} title="About Us">
          <div className='px-4 flex flex-col md:grid md:grid-cols-2 gap-4 mt-4'>
            <div>
              <GenericParagraph className='text-secondary-200 text-lg'>
              Welcome to the Computer Science Club section of the UMass Boston club webpage! Here, you can find information about our club and what we do. Our club is dedicated to fostering a community of computer science enthusiasts, and we welcome students of all levels of experience. We offer opportunities for members to network, learn, and grow their skills.
              </GenericParagraph>
              <br />
              <GenericParagraph className='text-secondary-200 text-lg'>
              On this section of the webpage, you can find information about our upcoming events, meetings, and workshops. We also provide resources for members, such as coding tutorials, job and internship postings, and information about industry trends. If you're interested in joining our club or attending one of our events, please feel free to reach out to us through the contact information provided. We look forward to meeting you and sharing our passion for computer science!
              </GenericParagraph>
              
            </div>
            <div className="w-full h-full flex justify-center ">
            <ImageCarousel 
            className={"w-[150px] mt-[70px]"} 
            images={[Image0, Image1, Image2, Image3, Image4]} 
            scale={10} 
            offsetY={30}
            />
            </div>
          </div>
        </GenericSection>
        <GenericSubsection title="Members">
          <div className='w-full flex-shrink h-auto min-h-[40vh] flex flex-row gap-5 px-5'>
            <ProfileCard name="Sleepy Joe" title="President">
              <GenericParagraph className='text-secondary-200 text-lg'>
              Online YouTube Gaming personality recognized as a skilled player of Call of Duty Zombies, with a particular affinity for the game mode.
              In Sleepy Joe's online gaming circles, he is known for his strategic thinking and calm demeanor under pressure, which he developed during his decades-long career in politics. He is also recognized for his ability to work well with others, often serving as the de facto team leader during co-op matches.
              One notable feature of Sleepy Joe's online gaming persona is his penchant for political humor. He enjoys making quips about current events and political figures, often referencing his former political rivals such as Donald Trump and Barack Obama in his in-game banter.
              Despite his busy schedule as the President of the United States, Sleepy Joe finds time to unwind by playing video games, and he is known for his dedication to the hobby. His fellow gamers respect him not only for his skills but also for his ability to balance his responsibilities as a world leader with his personal interests.
              </GenericParagraph>
            </ProfileCard>
            <ProfileCard name="Jordan Peterson" title="Vice President">
              <GenericParagraph className='text-secondary-200 text-lg'>
              Canadian psychologist, author, and media commentator. He began to receive widespread attention in the late 2010s for his views on cultural and political issues, often described as conservative. Peterson has described himself as a classic British liberal and a traditionalist.
              </GenericParagraph>
            </ProfileCard>
            <div className='w-2 h-full bg-secondary-500'></div>
            <ProfileCard name="Elon Musk" title="Treasurer">
              <GenericParagraph className='text-secondary-200 text-lg'>
              a business magnate and investor. He is the founder, CEO and chief engineer of SpaceX; angel investor, CEO and product architect of Tesla, Inc.; owner and CEO of Twitter, Inc.; founder of the Boring Company; co-founder of Neuralink and OpenAI; and president of the philanthropic Musk Foundation. With an estimated net worth of around $192 billion as of March 27, 2023, primarily from his ownership stakes in Tesla and SpaceX, Musk is the second-wealthiest person in the world, according to both the Bloomberg Billionaires Index and Forbes's real-time billionaires list.
              </GenericParagraph>
            </ProfileCard>
            
          </div>
        </GenericSubsection>
        <GenericSection title="Upcoming Events"></GenericSection>
        <GenericSection title="Competitions"></GenericSection>
        <GenericSection title="Developer Insights"></GenericSection>
      </div>
    </div>
    
    </>
    
  )
}
