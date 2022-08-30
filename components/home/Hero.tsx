/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";

function Hero() {

  const { locale } = useRouter();

  return (
    <div
      className="relative heroElem w-full pt-20 m-auto flex justify-center text-center flex-col items-center z-1 dark:text-white text-black">
      {
        locale === "ja" && (<><p className="text-xl mb-5">こんにちは、<span className="font-bold">ウマング</span> です。</p>
          <h1 className="heroTitle inline-block max-w-2xl lg:max-w-4xl  w-auto relative text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-10 font-bold heroShinyBg">
            デベロッパー. <span className="heroShiny1 text-fun-pink">クリエイター.</span>{" "} <br />
            <span className="heroShiny2 text-fun-pink">ストラテジー.</span> 思想家</h1>
        </>)
      }
      {
        locale === "en" && (<><p className="text-xl mb-5">Hey, I&apos;m Umang.</p>
          <h1 className="heroTitle inline-block max-w-2xl lg:max-w-4xl  w-auto relative text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-10 font-bold heroShinyBg">
            Developer. <span className="heroShiny1 text-fun-pink">Creator.</span>{" "} <br />
            <span className="heroShiny2 text-fun-pink">Strategy.</span> Thinker.
          </h1></>)
      }

      <img
        className="sqD"
        src="/sq.png"
        alt="image"
      />
    </div>
  );
}

export default Hero;
