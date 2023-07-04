import { useContext } from "react";
import ProfileCard from "@/app/components/core/profile-card";
import GenericParagraph from "@/app/components/core/generic-paragraph";
import { LangContext } from "@/app/components/context/lang-context";

export default function Officers() {
    const { lang } = useContext(LangContext);

    return (
        <div className='w-screen grid auto-cols-max flex-shrink h-auto min-h-[60vh] gap-[75px] px-5 pb-[200px] mt-[50px]'>
            <ProfileCard name={{"en": "John O'Neil", "ja": "ジョン・オーニール"}[lang]} title={{"en": "President", "ja": "社長"}[lang]} src={"/profile_jon.jpg"} links={[
              { name: {"en":"LinkedIn", "ja":"リンクテン"}[lang]!, href: "https://www.linkedin.com/in/jon-carlos-o-neil-b66a83168" },
              { name: {"en":"Instagram", "ja":"インスタグラム"}[lang]!, href: "https://instagram.com/jon.oneil.169?igshid=OGQ5ZDc2ODk2ZA==" },
            ]}>
              <GenericParagraph className='text-secondary-500 text-base font-light'>
              {{
                "en": "Hi, I’m Jon. I started the Computer Science Club in my Sophomore year because I wanted a place for CS people to socialize. Seeing the club grow and develop has been the highlight of my undergrad. You should stop by and get involved :)",
                "ja": "こんにちは、私はジョンです。私は2ねんせいのときにこんぴゅーたーさいえんすくらぶをたちあげました。くらぶがせいちょうしはってんするのをみるのはわたしのだいがくせいかつのはいらいとでした。ぜひたちよってさんかしてください :)",
              }[lang]}
              </GenericParagraph>
            </ProfileCard>
            <ProfileCard name={{"en": "Thomas Coffey", "ja": "トマス・コフィー"}[lang]} title={{"en": "Treasurer", "ja": "会計"}[lang]} src={"/thomas_coffey_profile.jpg"} links={[
              { name: {"en":"LinkedIn", "ja":"リンクテン"}[lang]!, href: "https:www.linkedin.com/in/dennis-fuentes-063164209" },
              { name: {"en":"Instagram", "ja":"インスタグラム"}[lang]!, href: "https://www.instagram.com/dennisfuentes_/" },
            ]}>
              <GenericParagraph className='text-secondary-500 text-base font-light'>
              {{
                "en": "Hello, I’m Thomas Coffey, I helped Jon start this club in order to give members of the cs community at UMB, as well as those interested in cs too, a place to connect and collaborate with their fellow students. I hope to see our revival of this club continue to grow and expand long after we leave UMB.",
                "ja": "こんにちは、私はトーマス コフィーです。私は、UMB の CS コミュニティのメンバーや、CS に興味のある人たちに、他の学生とつながり、協力する場所を提供するために、ジョンのこのクラブの立ち上げを手伝いました。私たちがUMBを去った後も、このクラブの復活がさらに成長し、拡大し続けることを願っています。"
              }[lang]}
              </GenericParagraph>
            </ProfileCard>
            <ProfileCard name={{"en": "Dennis Fuentes", "ja": "デニス"}[lang]} title={{"en": "Event Coordinator", "ja": "イベントコーディネーター"}[lang]} src={"/dennis_profile.jpg"} links={[
              { name: {"en":"LinkedIn", "ja":"リンクテン"}[lang]!, href: "https:www.linkedin.com/in/dennis-fuentes-063164209" },
              { name: {"en":"Instagram", "ja":"インスタグラム"}[lang]!, href: "https://www.instagram.com/dennisfuentes_/" },
            ]}>
              <GenericParagraph className='text-secondary-500 text-base font-light'>
              {{
                "en": "Hey, my name is Dennis and I am the current Computer Science Club event coordinator. Come check out some of our events and introduce yourself to the club! My personal interests in Computer Science lie in Cyber Defense.",
                "ja": "こんにちは、私の名前はデニスです。現在コンピューター サイエンス クラブのイベント コーディネーターを務めています。私たちのイベントをいくつかチェックして、クラブについて自己紹介してください!コンピューターサイエンスにおける私の個人的な興味はサイバー防御にあります。"
              }[lang]}
              </GenericParagraph>
            </ProfileCard>
        </div>
    )
}