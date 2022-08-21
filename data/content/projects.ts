import { kebabCase, kebabArray } from "../../utils/utils";

export type Project = {
  id: number;
  title: string;
  desc: string;
  img: string;
  link?: string;
  github?: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: 0,
    title: "Learn.TheYEI",
    desc: "All the resources you will need to get a boost into economics.",
    img: "/static/projects/yei-learn.png",
    link: "https://learn.com",
    github: "https://github.com/",
    tags: ["React", "NextJS", "TailwindCSS", "CSS", "Firebase"],
  },
];

export const allTags : string[] = []

projects.forEach((project) => {
  project.tags.forEach((tag) => !allTags.includes(tag) && allTags.push(tag))
});

export const allKebabTags = allTags.map(tag => (
  kebabCase(tag)
))

export default projects