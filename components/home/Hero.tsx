import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function Hero() {

  const { locale } = useRouter();

  return (
    <div
      className="heroElem w-full pt-20 m-auto flex justify-center text-center flex-col items-center z-50 sticky dark:text-white text-black">
      {
        locale === "ja" && (<><p className="text-xl mb-5">こんにちは、<span className="font-bold">ウマング</span> です。</p>
          <h1 className="heroTitle inline-block max-w-2xl lg:max-w-4xl  w-auto relative text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-10 font-bold heroShinyBg">
            プロダクト <span className="heroShiny1 text-fun-pink">マネージャー.</span>{" "} <br />
            <span className="heroShiny2 text-fun-pink">ストラテジー.</span> ビルダー.</h1>
        </>)
      }
      {
        locale === "en" && (<><p className="text-xl mb-5">Hey, I&apos;m <span className="font-bold">Umang</span>.</p>
          <h1 className="heroTitle inline-block max-w-2xl lg:max-w-4xl  w-auto relative text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-10 font-bold heroShinyBg">
            Product <span className="heroShiny1 text-fun-pink">Manager.</span>{" "} <br />
            <span className="heroShiny2 text-fun-pink">Strategy.</span> Builder.
          </h1></>)
      }

      <p className="max-w-xl text-lg text-gray-500 dark:text-gray-400 mb-10 leading-relaxed">
        {locale === "ja"
          ? "テクノロジーとリテールの交差点でユーザー中心のプロダクトを構築し、グローバルスケールでインパクトを与えています。"
          : "Building user-centric products at the intersection of technology and retail, driving impact at global scale."}
      </p>

      <Image
        className="sqD"
        src="/sq.png"
        alt="image"
        height={914.95}
        width={1041.2}
      />
    </div>
  );
}

export default Hero;
