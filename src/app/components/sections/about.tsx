import { FC, useContext } from "react";
import GenericParagraph from "@/app/components/core/generic-paragraph";
import {Carousel, CarouselIndexContext, CarouselElement} from "@/app/components/core/generic-carousel";
import { LangContext } from "@/app/components/context/lang-context";
import LangContent from "../types/lang-content";
import ThoughtBubble from "../core/thought-bubble";


const SUBSECTION_CONTENT = [
    {
        title: {
            "en": "Career Development",
            "jp": "Career Development",
        },
        desc: {
            "en": "Whether you are a freshman computer science major or you are a senior on your way out, the CS Club provides a multitude of resources to get your foot in the door of the industry. We plan on hosting networking events and workshops where you can chat with highly skilled professionals in the field. We also hold events called Resume Roasts, in which fellow club members are tasked with constructively critiquing students' resumes (with some healthy comedic input, of course) to better prepare students for internships and job searching. Workshops, Resume Roasts, and more are coming in the future so if you are interested, be sure to check out our live event listings.",
            "jp": "コンピュータサイエンス学科の新入生であろうと、卒業を目前に控えたシニアであろうと、CSクラブは産業界で足を踏み入れるための多くのリソースを提供しています。ネットワーキングイベントやワークショップを主催し、その場で業界の高度な専門家と話をする機会を提供します。また、リジューム・ローストというイベントも開催しており、その場でクラブメンバー同士が学生たちの履歴書を建設的に批評します（もちろん、健康的なコメディックなアプローチを取り入れます）。ワークショップやリジューム・ローストなど、これからもさまざまなイベントを予定していますので、興味がある方は、ライブイベントのリストを確認してください。",
        }
    },
    {
        title: {
            "en": "Experience Building",
            "jp": "Experience Building",
        },
        desc: {
            "en": "The other aspect of our club centers around coding experience. Whether you’re a beginner programmer or a seasoned veteran, there is always something new to learn in the field of computer science! Anyone is free to learn here, no matter the major! All you need is a computer and passion! We regularly host LeetCode competitions for undergraduate and graduate students to compete with one another to improve students' critical thinking and process-related skills. And there are prizes too! Riches, fame, and glory, what else could one need? We plan to host LeetCode competitions at least twice a month. These competitions can also be found in the live event listings down below.",
            "jp": "クラブのもう一つの側面は、コーディング経験に焦点を当てています。初心者のプログラマーであろうと、熟練のベテランであろうと、コンピュータサイエンスの分野で常に新しいことを学ぶことができます！専攻に関わらず、誰でも自由に学ぶことができます。必要なのは、コンピュータと情熱だけです！定期的にLeetCode競技大会を開催し、学部生や大学院生が互いに競い合い、学生の批判的思考力やプロセスに関連するスキルを向上させることができます。さらに、賞品もあります！富、名声、栄誉、他に何が必要ですか？LeetCode競技大会は、少なくとも月に2回開催する予定です。これらの競技大会については、下のライブイベントのリストでも確認できます。",
        }
    },
    {
        title: {
            "en": "Future Plans",
            "jp": "Future Plans",
        },
        desc: {
            "en": "As for our future plans, we have our sites set to host Hackathons. Hackathons provide the best of both worlds, enabling students of all skill sets and experience to collaborate on projects, and meet professionals. To be kept in the loop on new activities and opportunities like these, feel free to join our discord and other socials.            ",
            "jp": "将来の計画として、私たちはハッカソンを開催することを予定しています。ハッカソンは、すべてのスキルセットと経験を持つ学生がプロジェクトに協力し、専門家と出会える両方の利点を提供します。このような新しい活動や機会について最新情報を知りたい場合は、私たちのDiscordや他のソーシャルメディアに参加してください。",
        }
    },

]

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

const AboutSubsection: FC<{title: LangContent, desc: LangContent, className?: string }> = ({ title, desc, className }) => {
    const { lang } = useContext(LangContext);
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <h2 className="text-secondary-200 text-lg font-bold w-auto">
                {title[lang]}
            </h2>
            <GenericParagraph className='text-secondary-400 text-sm font-light leading-snug'>
                {desc[lang]}
            </GenericParagraph>
        </div>
    )
}

const About: FC<AboutProps> = ({ images }) => {
    const { lang } = useContext(LangContext);

    return (
        <div className='h-auto flex flex-col lg:grid lg:grid-cols-2 gap-[200px] lg:gap-4 mt-4'>
            <div>
                <GenericParagraph className='text-secondary-400 text-lg font-light leading-snug'>
                {{
                    "en": "Welcome to the UMass Boston Computer Science Club! We are a club dedicated to connecting students interested in all things technology! Here, we want to create a healthy, inclusive space to foster discussion on emerging technologies and innovation. Non-computer science majors are welcome as well. Please bring your computer and your passion. Our club centers around two aspects of computer science: career and experience.",
                    "jp": "ウマッスボストンのCSのサクルへようこそ！私たちは、テクノロジーに興味を持つ学生たちをつなぐことに専念するクラブです！ここでは、新興技術やイノベーションに関する議論を促進するための健全で包括的な空間を作りたいと考えています。コンピュータサイエンスの専攻でない方々も歓迎します。あなたのコンピュータと情熱を持って、ぜひ参加してください。私たちのクラブは、コンピュータサイエンスのキャリアと経験の2つの側面を中心に展開しています。",
                }[lang]}
                </GenericParagraph>
                <br />
                <div className="grid grid-cols-3 gap-x-[15px]">
                    {SUBSECTION_CONTENT.map((content, index) => <AboutSubsection key={`about-subsection-${index}`} title={content.title} desc={content.desc} className={index !== 2 ? "border-r-2 border-r-secondary-700 pr-[15px]" : ""} />)}
                </div>
            </div>
            <div className="flex-grow h-full flex justify-center lg:justify-center pl-[35%] pr-[45%] md:pl-[15%] md:pr-[75%] lg:px-[45%]">
                <div className="w-auto h-auto pr-[100px]">
                    <ThoughtBubble>{{
                        "en": "Right now we don't have many members, but we're growing!",
                        "jp": "いま、わたしたちはおおくのめんばーをもっていませんが、ふえています！",
                    }[lang] as string}</ThoughtBubble>
                    <Carousel interval={2000} duration={500} containerWidth={100} containerHeight={200} containerAngle={-45} childWidth={300} childHeight={300}>
                        { images.map((image, index) => (<AboutImage key={`carousel-item-${index}`} image={image} index={index} />)) as CarouselElement[] }
                    </Carousel>
                </div>
            </div>
            
        </div>
    )
}

export default About;