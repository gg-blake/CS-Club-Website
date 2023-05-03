import { FC, useContext } from "react";
import GenericParagraph from "@/app/components/core/generic-paragraph";
import {Carousel, CarouselIndexContext, CarouselElement} from "@/app/components/core/generic-carousel";
import { LangContext } from "@/app/components/context/lang-context";


interface ImageData {
    filename: string;
    alt: {
        [langKey: string]: string;
    };
}

interface AboutProps {
    images: ImageData[];
}

const AboutImage: FC<{image: ImageData, index: number}> = ({ image, index }) => {
    const { carouselIndex } = useContext(CarouselIndexContext);
    const { lang } = useContext(LangContext);

    return (
        <>
            <img src={image.filename} alt={`${carouselIndex} index`} style={{width: "300px", height: "300px"}} className={`rounded-md object-cover transition-all ${carouselIndex !== index ? "brightness-[25%] shadow-lg" : ""}`} />
            <p style={{opacity: carouselIndex === index ? 1 : 0}} className="absolute bottom--[20px] text-sm text-secondary-600 font-normal transition-opacity">{image.alt[lang]}</p>
        </>
        
    )
}

const About: FC<AboutProps> = ({ images }) => {
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
            <div className="flex-grow h-full flex justify-center lg:justify-center pl-[35%] pr-[45%] md:pl-[15%] md:pr-[75%] lg:px-[45%]">
                <div className="w-auto h-auto pr-[100px]">
                    <Carousel interval={2000} duration={500} containerWidth={100} containerHeight={200} containerAngle={-45} childWidth={300} childHeight={300}>
                        { images.map((image, index) => (<AboutImage key={`carousel-item-${index}`} image={image} index={index} />)) as CarouselElement[] }
                    </Carousel>
                </div>
            </div>
            
        </div>
    )
}

export default About;