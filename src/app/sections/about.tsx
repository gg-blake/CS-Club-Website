import GenericParagraph from "../components/generic-paragraph";
import ImageCarousel from "../components/image-carousel";
import Image0 from 'C:/Users/Blake/Music/More Life/cover.png';
import Image1 from 'C:/Users/Blake/Music/Kanye West - The Life Of Pablo (June Update) [FLAC]/Cover.jpg';
import Image2 from 'C:/Users/Blake/Music/Nothing Was the Same/cover.png';
import Image3 from 'C:/Users/Blake/Music/Give Or Take/Giveon - Give Or Take.jpg';
import Image4 from 'C:/Users/Blake/Music/[2021] Nurture [CD FLAC]/cover.jpg';

export default function About() {
    return (
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
    )
}