type Route = {
  title: string,
  path: string
}

type FooterCol = {
  title: string,
  link: string,
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
      link: "",
      links: [
        {
          name: "Home",
          link: "/",
          leavesWebsite: false,
        },
        {
          name: "About Me",
          link: "/about",
          leavesWebsite: false,
        },
        {
          name: "Blog",
          link: "/blog",
          leavesWebsite: false,
        },
        {
          name: "Creations",
          link: "/creations",
          leavesWebsite: false,
        },
        {
          name: "Statistics",
          link: "/stats",
          leavesWebsite: false,
        },
      ],
    },
    {
      title: "Social",
      link: "https://link.umang.dev",
      links: [
        {
          name: "YouTube",
          link: "https://youtube.com/getsaged",
          icon: "/icons/youtube.svg",
          leavesWebsite: true,
        },
        {
          name: "Instagram",
          link: "https://instagram.com/thisumang",
          icon: "/icons/instagram.svg",
          leavesWebsite: true,
        },
        {
          name: "Twitter",
          link: "https://twitter.com/thisumang",
          icon: "/icons/twitter.svg",
          leavesWebsite: true,
        },
        {
          name: "LinkedIn",
          link: "https://www.linkedin.com/in/umang350/",
          icon: "/icons/linkedin-f.svg",
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
    buymeacoffee: "",
    paypal: "",
    message: "I appreciate your support just by reading this! 💙",
  },
};
