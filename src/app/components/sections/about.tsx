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
            "jp": "キャリア の 開発",
        },
        desc: {
            "en": "Whether you are a freshman computer science major or you are a senior on your way out, the CS Club provides a multitude of resources to get your foot in the door of the industry. We plan on hosting networking events and workshops where you can chat with highly skilled professionals in the field. We also hold events called Resume Roasts, in which fellow club members are tasked with constructively critiquing students' resumes (with some healthy comedic input, of course) to better prepare students for internships and job searching. Workshops, Resume Roasts, and more are coming in the future so if you are interested, be sure to check out our live event listings.",
            "jp": "コンピュータサイエンス学科の新入生でも卒業間近の4年生でも、「シ・エス」サークルは産業界への足がかりになる多くのリソースを提供しています。また、リレキショ・ローストというイベントでは、サークルメンバー同士が学生たちの履歴書を建設的に制限します。 興味がある方は、さまざまなイベントをらいぶで確認することができますので、ぜひ参加してみてください。",
        }
    },
    {
        title: {
            "en": "Experience Building",
            "jp": "エクスピアリアンス の 構築",
        },
        desc: {
            "en": "The other aspect of our club centers around coding experience. Whether you’re a beginner programmer or a seasoned veteran, there is always something new to learn in the field of computer science! Anyone is free to learn here, no matter the major! All you need is a computer and passion! We regularly host LeetCode competitions for undergraduate and graduate students to compete with one another to improve students' critical thinking and process-related skills. And there are prizes too! Riches, fame, and glory, what else could one need? We plan to host LeetCode competitions at least twice a month. These competitions can also be found in the live event listings down below.",
            "jp": "当クラブには、もう一つの側面が存在します。それはコーディングの経験にフォーカスを当てたものです。初心者のプログラマーであろうと、熟練のベテランであろうと、常にコンピュータサイエンスの分野で新しいことを学ぶことができます！専攻に関係なく、誰でも自由に学ぶことができ、必要なのはコンピュータと情熱だけです！当クラブでは、定期的にLeetCode競技大会を開催し、学部生や大学院生が互いに競い合い、学生の批判的思考力やプロセスに関連するスキルを向上させることができます。また、豪華な賞品も用意されています。富、名声、栄誉、他に何が必要でしょうか？LeetCode競技大会は、月に少なくとも2回開催する予定です。これらの競技大会については、下のライブイベントのリストでも確認できます。",
        }
    },
    {
        title: {
            "en": "Future Plans",
            "jp": "コンド の 予定",
        },
        desc: {
            "en": "As for our future plans, we have our sites set to host Hackathons. Hackathons provide the best of both worlds, enabling students of all skill sets and experience to collaborate on projects, and meet professionals. To be kept in the loop on new activities and opportunities like these, feel free to join our discord and other socials.            ",
            "jp": "将来の計画として、私たちはハッカソンを開催することを予定しています。ハッカソンは、すべてのスキルセットと経験を持つ学生がプロジェクトに協力し、専門家と出会える両方の利点を提供します。このような新しい活動や機会について最新情報を知りたい場合は、私たちのディスコードや他のソーシャルメディアに参加してください。",
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
            { carouselIndex === index && <GenericParagraph className="absolute bottom--[20px] text-sm font-light text-secondary-400 transition-opacity">{image.alt[lang]}</GenericParagraph>}
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
                    "jp": "マサチューセッツ大学ボストン校の「シ・エス」サークルへようこそ。私たちはテクノロジーなどに興味を持っている学生向けのサークルです。ここでは、新興技術やイノベーションに関する議論を促進するために、健全かつ包括的な空間を作りたいと考えています。また、コンピュータサイエンスの専攻でない方も大歓迎です。パソコンと情熱を持ちながら是非ご参加してください。このサークルは、コンピュータサイエンスのキャリアと経験の2つの側面を中心に展開しています。",
                }[lang]}
                </GenericParagraph>
                <br />
                <div className="grid grid-cols-3 gap-x-[15px]">
                    {SUBSECTION_CONTENT.map((content, index) => <AboutSubsection key={`about-subsection-${index}`} title={content.title} desc={content.desc} className={index !== 2 ? "border-r-2 border-r-secondary-700 pr-[15px]" : ""} />)}
                </div>
            </div>
            <div className="flex-grow-1 h-full flex justify-center">
                <div className="w-auto h-auto pr-[100px]">
                    <ThoughtBubble>{{
                        "en": "Right now we don't have many members, but we're growing!",
                        "jp": "いま、わたしたちはおおくのめんばーをもっていませんが、ふえています！",
                    }[lang] as string}</ThoughtBubble>
                    <Carousel interval={8000} duration={500} containerWidth={100} containerHeight={200} containerAngle={-45} childWidth={300} childHeight={300}>
                        { images.map((image, index) => (<AboutImage key={`carousel-item-${index}`} image={image} index={index} />)) as CarouselElement[] }
                    </Carousel>
                </div>
            </div>
            
        </div>
    )
}

export default About;