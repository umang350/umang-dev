import { Experience } from "./Experience";
import { information, informationJA } from "@/data/content/about"
import { useRouter } from "next/router";

export const AboutMe = () => {

  const { locale } = useRouter();
  var informationData;

  if (locale === "ja") {
    informationData = informationJA
  } else {
    informationData = information
  }

  return (
    <section>
      <div className="max-w-6xl mx-auto h-48">
        <h1 className=" text-5xl md:text-9xl font-bold pt-7 md:py-20 text-center md:text-left dark:text-white text-black">
          {informationData.title}
        </h1>
      </div>
      <div className="md:-mt-10 -mt-36">
        <div className="text-container max-w-6xl mx-auto pt-20 text-left">
          <p
            className="leading-loose text-2xl md:text-4xl font-semibold  text-left"
            style={{ lineHeight: "3rem" }}
          >
            {" "}
            <a
              className="bg-blue-500 rounded-md px-2 py-1 text-white text-left"
              style={{ display: "table-cell" }}
            >
              {informationData.subheading}
            </a>
          </p>
          <div className="text-left text-xl text-gray-700 mb-4 mt-4 dark:text-gray-200">
            {informationData.desc}
            <br />
            <p className="leading-loose text-left">
              {
                informationData.descPoints.map((item, index) => {
                  if (index === 0) {
                    return item
                  }
                  return (<span key={index}><br />{item}</span>)
                })
              }
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="pt-10 flex-1 max-w-6xl mx-auto gap-y-20 gap-x-20 text-left">
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
            <div className="mt-8">
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Skills
              </h1>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                Development: Spring Boot, React, Node.Js, Angular, Flask, Oracle, Firebase, AWS, CI CD Pipelines
                <br />
                Languages Syntaxed: Java, JavaScript, SQL, Excel Macro VBA, C++, Python, R, MATLAB, Shell Scripting
                <br />
                Add-ons: Video Editing, Graphic Design, Seminar/Public Speaker, Project Management, Game Development
              </p>
            </div>
          </div>
        </div>
        <div className="m-10 p-10 flex-3">
          <Experience />
        </div>
      </div>
    </section>)
}
