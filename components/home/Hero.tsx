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
            プロダクト. <span className="heroShiny1 text-fun-pink">クリエイター.</span>{" "} <br />
            <span className="heroShiny2 text-fun-pink">ストラテジー.</span> 思想家</h1>
        </>)
      }
      {
        locale === "en" && (<><p className="text-xl mb-5">Hey, I&apos;m Umang.</p>
          <h1 className="heroTitle inline-block max-w-2xl lg:max-w-4xl  w-auto relative text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-10 font-bold heroShinyBg">
            Products. <span className="heroShiny1 text-fun-pink">Creator.</span>{" "} <br />
            <span className="heroShiny2 text-fun-pink">Strategy.</span> Thinker.
          </h1></>)
      }

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
