import { useContext } from "react";
import ProfileCard from "@/app/components/core/profile-card";
import GenericParagraph from "@/app/components/core/generic-paragraph";
import { LangContext } from "@/app/components/context/lang-context";

export default function Officers() {
    const { lang } = useContext(LangContext);

    return (
        <div className='w-auto flex flex-row flex-shrink h-auto min-h-[60vh] gap-[75px] px-5 pb-[200px] mt-[50px]'>
            <ProfileCard name={{"en": "John O'Neil", "ja": "ジョン・オーニール"}[lang]} title={{"en": "President", "ja": "社長"}[lang]} src={"/profile_jon.jpg"} links={[
              { name: {"en":"Twitter", "ja":"ツイッター"}[lang]!, href: "https://twitter.com/" },
              { name: {"en":"Twitch", "ja":"トーリチュ"}[lang]!, href: "https://www.twitch.tv/" },
              { name: {"en":"YouTube", "ja":"ユーチューブ"}[lang]!, href: "https://www.youtube.com/" },
            ]}>
              <GenericParagraph className='text-secondary-500 text-base font-light'>
              {{
                "en": "Hi, I’m Jon. I started the Computer Science Club in my Sophomore year because I wanted a place for CS people to socialize. Seeing the club grow and develop has been the highlight of my undergrad. You should stop by and get involved :)",
                "ja": "こんにちは、私はジョンです。私は2ねんせいのときにこんぴゅーたーさいえんすくらぶをたちあげました。くらぶがせいちょうしはってんするのをみるのはわたしのだいがくせいかつのはいらいとでした。ぜひたちよってさんかしてください :)",
              }[lang]}
              </GenericParagraph>
            </ProfileCard>
            <ProfileCard name={{"en": "Jordan Peterson", "ja": "ジョーダン・ピータソン"}[lang]} title={{"en": "Vice President", "ja": "副社長"}[lang]} src={"/jordan.jpg"} links={[
              { name: {"en":"Twitter", "ja":"ツイッター"}[lang]!, href: "https://twitter.com/" },
              { name: {"en":"Twitch", "ja":"トーリチュ"}[lang]!, href: "https://www.twitch.tv/" },
              { name: {"en":"YouTube", "ja":"ユーチューブ"}[lang]!, href: "https://www.youtube.com/" },
            ]}>
              <GenericParagraph className='text-secondary-500 text-base font-light'>
              {{
                "en": "Canadian psychologist, author, and media commentator. He began to receive widespread attention in the late 2010s for his views on cultural and political issues, often described as conservative. Peterson has described himself as a classic British liberal and a traditionalist.",
                "ja": "カナダの心理学者、作家、そしてメディアコメンテーターです。文化や政治の問題に対する意見で、しばしば保守的と表現されることで、2010年代後半に広く注目を集め始めました。ペトソンは、自分自身をクラシックなイギリス・リベラルと伝統主義者と呼んでいます。"
              }[lang]}
              </GenericParagraph>
            </ProfileCard>
            <ProfileCard name={{"en": "Elon Musk", "ja": "イロン・マスク"}[lang]} title={{"en": "Treasurer", "ja": "会計"}[lang]} src={"/elon.jpg"} links={[
              { name: {"en":"Twitter", "ja":"ツイッター"}[lang]!, href: "https://twitter.com/" },
              { name: {"en":"Twitch", "ja":"トーリチュ"}[lang]!, href: "https://www.twitch.tv/" },
              { name: {"en":"YouTube", "ja":"ユーチューブ"}[lang]!, href: "https://www.youtube.com/" },
            ]}>
              <GenericParagraph className='text-secondary-500 text-base font-light'>
              
              {{
                "en": "a business magnate and investor. He is the founder, CEO and chief engineer of SpaceX; angel investor, CEO and product architect of Tesla, Inc.; owner and CEO of Twitter, Inc.; founder of the Boring Company; co-founder of Neuralink and OpenAI; and president of the philanthropic Musk Foundation. With an estimated net worth of around $192 billion as of March 27, 2023, primarily from his ownership stakes in Tesla and SpaceX, Musk is the second-wealthiest person in the world, according to both the Bloomberg Billionaires Index and Forbes's real-time billionaires list.",
                "ja": "ビジネスマグネートおよび投資家であり、スペースXの創設者、CEO、主任エンジニア；テスラ社のエンジェル投資家、CEO、製品アーキテクト；Twitter社のオーナー兼CEO；Boring Companyの創設者；NeuralinkおよびOpenAIの共同創設者；そして、慈善団体Musk Foundationの社長です。2023年3月27日時点で約1920億ドルの純資産を持ち、主にテスラとスペースXの株式所有から得たもので、ブルームバーグの「ビリオネア指数」とフォーブスの「リアルタイムのビリオネアリスト」の両方によれば、マスクは世界で2番目に裕福な人物です。"
              }[lang]}
              </GenericParagraph>
            </ProfileCard>
        </div>
    )
}