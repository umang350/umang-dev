import Image from "next/image";
import { Experience } from "./about/Experience";

export const AboutMe = () => {
  return (
    <section>
      <div className="max-w-6xl mx-auto h-48">
        <h1 className=" text-5xl md:text-9xl font-bold py-20 text-center md:text-left dark:text-white text-black">
          About Me.
        </h1>
      </div>
      <div className="flex">
        <div className="pt-20 flex-1 max-w-6xl mx-auto gap-y-20 gap-x-20 text-left">
          <div className="inline-flex flex-col">
            <div>
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Contact
              </h1>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                For any sort help / enquiry, shoot a{" "}
                <a
                  href={`mailto:job@umang.dev`}
                  className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
                >
                  mail
                </a>{" "}
                and I&apos;ll get back. I swear.
              </p>
            </div>
            <div className="mt-8">
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Job Opportunities
              </h1>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                I&apos;m looking for a challenge currently, If you see me as a good fit,
                check my{" "}
                <a
                  href="/UmangResume.pdf"
                  target="__blank"
                  className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
                >
                  CV
                </a>{" "}
                and I&apos;d love to work with you.
              </p>
            </div>
            </div>
        </div>
        <div className="m-10 p-10 flex-3">
          <Experience/>
        </div>
      </div>
    </section>)
}
