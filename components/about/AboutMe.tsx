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
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 pt-10">
        <div className="flex-1 text-left flex flex-col gap-8">
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
            <div>
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Job Opportunities
              </h1>
              <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                I&apos;m currently a Product Manager at Fast Retailing (Uniqlo) in Tokyo. Always open to
                interesting conversations — reach out for my{" "}
                <a
                  href="mailto:umang350@gmail.com"
                  target="__blank"
                  className="text-gray-800 border-b-2 border-gray-800 dark:border-gray-300 font-bold dark:text-gray-300"
                >
                  CV
                </a>{" "}
                and I&apos;d love to connect.
              </p>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                Skills
              </h1>
              <div className="mt-4 flex flex-col gap-4">
                {[
                  { label: "Product Management", tags: ["Roadmapping", "PRDs", "Backlog Prioritization", "Metrics/KPIs", "User Research", "Tech Architecture"] },
                  { label: "Data & Analytics", tags: ["SQL", "Anaplan", "Tableau", "Python", "Excel", "BigQuery", "PowerBI", "Google Analytics"] },
                  { label: "Platforms", tags: ["JavaScript", "Java", "React", "Git", "Jenkins", "Docker", "AWS", "GCP", "REST APIs", "Microservices"] },
                ].map(({ label, tags }) => (
                  <div key={label}>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{label}</p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <span key={tag} className="px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
        <div className="flex-1 pt-6">
          <Experience />
        </div>
      </div>
    </section>)
}
