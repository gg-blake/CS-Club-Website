import GenericParagraph from "../components/generic-paragraph";
import ImageCarousel from "../components/image-carousel";
import Image0 from '../images/mm_food.jpg';
import Image1 from '../images/good_kid_maad_city.jpg';
import Image2 from '../images/good_kid_maad_city_deluxe.jpg';
import Image3 from '../images/good_kid_maad_city_deluxe_2.png';
import Image4 from '../images/ambitionz_az_a_ridah.jpg';
import GlitchText from "../components/glitch-text";

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
            <div className="flex-grow h-full flex justify-center ">
            <ImageCarousel 
            className={"flex-grow max-w-[150px] mt-[70px]"} 
            items={["/cover1.jpg", "/cover2.png", "/cover3.jpg", "/cover4.jpg", "/cover5.jpg"]} 
            scale={8} 
            offsetY={30}
            />
            </div>
        </div>
    )
}