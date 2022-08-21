type Route = {
  title: string,
  path: string
}

type FooterCol = {
  title: string,
  links: {
    name: string,
    link: string,
    icon?: string,
    leavesWebsite: boolean
  }[]
}

type Footer = {
  columns: FooterCol[]
  support: {
    buymeacoffee: string
    paypal: string
    message: string
  }
};

export const routes: Route[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About Me",
    path: "/about",
  },
  {
    title: "Blog",
    path: "/blog",
  },
  {
    title: "Creations",
    path: "/creations",
  },
  {
    title: "Statistics",
    path: "/stats",
  },
];


export const footer: Footer = {
  columns: [
    {
      title: "Pages",
      links: [
        {
          name: "Home",
          link: "/",
          leavesWebsite: false,
        },
        // {
        //   name: "Blog",
        //   link: "/blog",
        //   leavesWebsite: false,
        // },
        {
          name: "Projects",
          link: "/projects",
          leavesWebsite: false,
        },
        {
          name: "Designs",
          link: "/designs",
          leavesWebsite: false,
        },
      ],
    },
    {
      title: "Social",
      links: [
        {
          name: "GitHub",
          link: "https://github.com/umang350",
          icon: "/icons/github-f.svg",
          leavesWebsite: true,
        },
        {
          name: "LinkedIn",
          link: "https://www.linkedin.com/in/umang350/",
          icon: "/icons/linkedin-f.svg",
          leavesWebsite: true,
        },
        {
          name: "Instagram",
          link: "https://instagram.com/thisumang",
          icon: "/icons/instagram.svg",
          leavesWebsite: true,
        },
        {
          name: "Email",
          link: "mailto:contact@umang.dev",
          icon: "/icons/mail-f.svg",
          leavesWebsite: true,
        },
      ],
    },
  ],
  support: {
    buymeacoffee: "umang350",
    paypal: "umang350",
    message: "I appreciate your support very much! 💙",
  },
};
