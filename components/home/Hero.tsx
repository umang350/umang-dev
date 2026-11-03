import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { hero, links } from "@/data/content/home";

function Hero() {

  const { locale } = useRouter();

  return (
    <div
      className="heroElem w-full pt-16 m-auto flex justify-center text-center flex-col items-center z-50 sticky dark:text-white text-black">
      {
        locale === "ja" && (<><p className="text-xl mb-5">こんにちは、<span className="font-bold">ウマング</span> です。</p>
          <h1 className="heroTitle inline-block max-w-2xl lg:max-w-4xl  w-auto relative text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-10 font-bold heroShinyBg">
            プロダクト. <span className="heroShiny1 text-fun-pink">クリエイター.</span>{" "} <br />
            <span className="heroShiny2 text-fun-pink">ストラテジー.</span> 思想家</h1>
        </>)
      }
      {
        locale === "en" && (<>
          <p className="text-xl mb-5">{hero.kicker}</p>
          <h1 className="heroTitle inline-block max-w-2xl lg:max-w-4xl w-auto relative text-4xl md:text-5xl lg:text-6xl tracking-tighter mb-6 font-bold heroShinyBg">
            I build global <span className="heroShiny1 text-fun-pink">planning products</span> in Tokyo, and <span className="heroShiny2 text-fun-pink">AI tools</span> people actually use.
          </h1>
          <p className="max-w-2xl text-lg opacity-80 mb-8 px-4">{hero.sub}</p>
        </>)
      }

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <a href="#projects" className="px-6 py-3 rounded-lg font-bold bg-fun-pink text-black hover:opacity-90 transition-opacity">
          {locale === "ja" ? "プロジェクトを見る" : "View Projects"}
        </a>
        <a href={links.cv} download className="px-6 py-3 rounded-lg font-bold border border-fun-pink text-fun-pink hover:bg-fun-pink hover:text-black transition-colors">
          {locale === "ja" ? "履歴書をダウンロード" : "Download CV"}
        </a>
      </div>

      <Image
        className="sqD"
        src="/sq.png"
        alt=""
        height={320}
        width={364}
      />
    </div>
  );
}

export default Hero;
