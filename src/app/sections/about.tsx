import GenericParagraph from "../components/generic-paragraph";
import ImageCarousel from "../components/image-carousel";

import GlitchText from "../components/glitch-text";

const ABOUT_IMAGE_CAROUSEL_CAPTIONS = {
    "/cover1.jpg": {
        "en": "Cover 1",
        "jp": "表紙1"
    },
    "/cover2.png": {
        "en": "Cover 2",
        "jp": "表紙2"
    },
    "/cover3.jpg": {
        "en": "Cover 3",
        "jp": "表紙3"
    },
    "/cover4.jpg": {
        "en": "Cover 4",
        "jp": "表紙4"
    },
    "/cover5.jpg": {
        "en": "Cover 5",
        "jp": "表紙5"
    },
}

/*
ウマッスボストンのコンピューター科学のサクルのウェブページよこうそ！
*/

export default function About() {
    return (
        <div className='min-h-[150vh] sm:min-h-[130vh] flex flex-col lg:grid lg:grid-cols-2 gap-[200px] lg:gap-4 mt-4'>
            
            <div>
              <GenericParagraph className='text-secondary-200 text-lg'>
              Welcome to the Computer Science Club section of the UMass Boston club webpage! Here, you can find information about our club and what we do. Our club is dedicated to fostering a community of computer science enthusiasts, and we welcome students of all levels of experience. We offer opportunities for members to network, learn, and grow their skills.
              </GenericParagraph>
              <br />
              <GenericParagraph className='text-secondary-200 text-lg'>
              On this section of the webpage, you can find information about our upcoming events, meetings, and workshops. We also provide resources for members, such as coding tutorials, job and internship postings, and information about industry trends. If you're interested in joining our club or attending one of our events, please feel free to reach out to us through the contact information provided. We look forward to meeting you and sharing our passion for computer science!
              </GenericParagraph>
            </div>
            <div className="flex-grow h-full flex justify-start lg:justify-center pl-[35%] pr-[45%] md:pl-[15%] md:pr-[75%] lg:px-[45%]">
                <ImageCarousel 
                className={"flex-grow mt-[70px]"} 
                items={ABOUT_IMAGE_CAROUSEL_CAPTIONS} 
                offsetY={20}
                />
            </div>
        </div>
    )
}