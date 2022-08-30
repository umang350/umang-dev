import Link from "next/link";
import React from "react";
import { footer, footerJA, Footer } from "@/data/global";
import Image from "next/image";
import { useRouter } from "next/router";

function Footer() {

  const { locales, locale, pathname, query, asPath } = useRouter();
  var footerData: Footer;

  if (locale === "ja") {
    footerData = footerJA
  } else {
    footerData = footer
  }

  return (
    <footer>
      <div className="w-full max-w-4xl m-auto grid grid-cols-2 sm:grid-cols-3 justify-between items-start">
        {footerData.columns.map((item, index) => {
          return (
            <div key={index} className="text-left mb-5 sm:mb-0">
              <h4 className="uppercase text-fun-gray text-sm font-bold ">
                <Link href={item.link}>{item.title}</Link>
              </h4>
              <div>
                {item.links.map((item, index) => {
                  return (
                    <div key={index} className="my-4 dark:text-white text-black">
                      {item.leavesWebsite ? (
                        <a
                          href={item.link}
                          target="_blank"
                          className="items-center flex" rel="noreferrer"
                        >
                          {item.icon && (
                            <span className="pr-2 -mb-1">
                              <Image src={item.icon} width={20} height={20} alt="" />
                            </span>
                          )}
                          {item.name}
                        </a>
                      ) : (
                        <Link className="dark:text-white text-black" href={item.link}>{item.name}</Link>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        <div className="text-center col-span-2 sm:col-auto sm:text-left pt-8 sm:mt-0 sm:pt-0 text-fun-gray border-t border-fun-pink-dark sm:border-0">
          <h4 className="uppercase text-fun-gray text-sm font-bold">
            {footerData.support.title}
          </h4>
          <div className="space-y-2 mt-4 w-full flex items-center sm:items-start flex-col">
            <p className="text-fun-gray text-xs pt-1">
              {footerData.support.message}
            </p>
          </div>
          <h4 className="uppercase text-fun-gray text-sm font-bold pt-8">
            {footerData.language.title}
          </h4>
          <div>
            {footerData.language.languages.map((item, index) => {
              return (
                <div key={index} className={`my-4 ${locale === item.locale ? "dark:text-white text-black" : "dark:text-white dark:text-opacity-50 text-opacity-50 text-black"}`}>
                  <Link key={locale}
                    href={item.locale === "en" ? pathname : item.locale + pathname}
                    locale={false} className="dark:text-white text-black" >{item.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="max-w-4xl w-full m-auto mb-6 mt-8 pt-8 sm:mt-4 sm:pt-4 text-center text-fun-gray border-t border-fun-pink-dark">
        <div className="flex flex-col items-center justify-center ">
          <div className="inline-flex items-center uppercase text-xs font-bold tracking-widest">
            Made with{" "}
            <div className="space-x-2 inline-flex items-center -mt-1 ml-3">
              <span>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  width="26"
                  height="26"
                  alt="React"
                />
                <span className="sr-only">React</span>
              </span>
              <span>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg"
                  width="40"
                  height="40"
                  className="dark:invert"
                  alt="NextJS"
                />
                <span className="sr-only">NextJS</span>
              </span>
              <span>
                <Image
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg"
                  width="26"
                  height="26"
                  alt="TailwindCSS"
                />
                <span className="sr-only">TailwindCSS</span>
              </span>
            </div>
          </div>
          <div className="mt-2 text-xs ">
            Made by{" "}
            <a
              href="mailto:contact@umang.dev"
              className="text-fun-gray-light font-medium"
            >
              {footerData.make.maker}
            </a>
            . {footerData.make.dislaimer}.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
