export const Experience = () => {
    return (
        <>
            <ExperienceCard
                key="2"
                title="Working"
                desc="Software Developer - IT Planning"
                year="2020-Now"
                company="Fast Retailing (UNIQLO)"
                companyLink="https://www.fastretailing.com/eng/"
            />
            <div className="divider-container flex flex-col items-center -mt-2">
                <div className="w-4 h-4 bg-green-500 rounded-full relative z-10">
                    <div className="w-4 h-4 bg-green-500 rounded-full relative z-10 animate-ping"></div>
                </div>
                <div className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"></div>
            </div>
            <ExperienceCard
                key="1"
                title="Internship"
                desc="Global Internship Program – Technology Intern"
                year="2019"
                company="Tata Communications Ltd."
                companyLink="https://tatacommunications.com"
            />
            <div className="divider-container flex flex-col items-center -mt-2">
                <div className="w-4 h-4 bg-green-500 rounded-full relative z-10">
                    <div className="w-4 h-4 bg-green-500 rounded-full relative z-10 animate-ping"></div>
                </div>
                <div className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"></div>
            </div>
            <ExperienceCard
                key="0"
                title="University"
                desc="Bachelor of Technology (CS &amp; Math)"
                year="2016-20"
                company="Delhi Technological University (formerly D.C.E.)"
                companyLink="https://dtu.ac.in"
            />
        </>
    )
}

const ExperienceCard = ({ title, desc, year, company, companyLink }) => {
    return (
        <div className="relative experience-card border p-4 rounded-md shadow-xl bg-white dark:bg-gray-800 z-10 mx-4">
            <h1 className="absolute -top-10 -left-14 md:-left-10 md:-top-10 text-4xl text-gray-400 font-bold dark:text-gray-800">
                {year}
            </h1>
            <h1 className="font-semibold text-xl">{title}</h1>
            <a href={companyLink} className="text-gray-500">
                {company}
            </a>
            <p className="text-gray-600 dark:text-gray-400 my-2">{desc}</p>
        </div>
    );
};
