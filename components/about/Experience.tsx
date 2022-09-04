import { experience, experienceJA } from "@/data/content/about";
import { useRouter } from "next/router";

export const Experience = () => {

    const { locale } = useRouter();
    var experienceData = (locale === "ja" ? experienceJA : experience).sort((item1, item2) => {
        return (Number(item2.key) - Number(item1.key));
    });

    return (
        <>
            {
                experienceData.map((item, index) => {
                    return (<><ExperienceCard
                        key={index}
                        title={item.title}
                        desc={item.desc}
                        year={item.year}
                        company={item.company}
                        companyLink={item.companyLink}
                    />
                        {
                            index != experienceData.length - 1 ?
                                (<div key={index + "arrow"} className="divider-container flex flex-col items-center -mt-2">
                                    <div className="w-4 h-4 bg-green-500 rounded-full relative z-10">
                                        <div className="w-4 h-4 bg-green-500 rounded-full relative z-10 animate-ping"></div>
                                    </div>
                                    <div className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"></div>
                                </div>) : null
                        }
                    </>)
                })
            }
        </>
    )
}

const ExperienceCard = ({ title, desc, year, company, companyLink }) => {
    return (
        <div className="relative experience-card border p-4 rounded-md shadow-xl bg-white dark:bg-gray-800 z-10 mx-4">
            <h1 className="absolute -top-10 -left-14 md:-left-10 md:-top-10 text-4xl text-gray-400 font-bold dark:text-gray-500">
                {year}
            </h1>
            <h1 className="font-semibold text-xl text-gray-600 dark:text-gray-400">{title}</h1>
            <a href={companyLink} className="text-gray-500">
                {company}
            </a>
            <p className="text-gray-600 dark:text-gray-400 my-2">{desc}</p>
        </div>
    );
};
