export type Route = {
  title: string,
  path: string,
  description?: string
}

export type Post = {
  _id: string;
  slug: string;
  content: any;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  readingTime: string;
};

export type video = {
	title: string;
	description: string;
	thumbnail: string;
	videoId: string;
	publishedAt: string;
  statistics?: videoStat;
}

export type videoStat = {
  viewCount: string;
  likeCount: string;
  dislikeCount: string;
  commentCount: string;
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

export type Footer = {
  columns: FooterCol[]
  support: {
    title: string,
    message: string
  },
  make: {
    maker: string,
    madewith: string,
    dislaimer: string
  },
  language: {
    title: string,
    languages:
    {
      name: string,
      link: string,
      locale: string
    }[]
  }
};

export const routes: Route[] = [
  {
    title: "Home",
    path: "/",
    description: "UMANG.DEV, one stop to all things Umang Chauhan. Find out insights from the statistics tab or know more about me from the About Me page. Whatever you do stay away from the 404 Page."
  },
  {
    title: "About Me",
    path: "/about",
    description: "Find out more about me!"
  },
  {
    title: "Videos",
    path: "/videos",
  },
  {
    title: "Creations",
    path: "/creations",
  },
  {
    title: "Statistics",
    path: "/stats",
    description: "Deep dive into statistics"
  },
];

export const routesJA: Route[] = [
  {
    title: "ホーム",
    path: "/",
    description: "UMANG.DEV, one stop to all things Umang Chauhan. Find out insights from the statistics tab or know more about me from the About Me page. Whatever you do stay away from the 404 Page."
  },
  {
    title: "私について",
    path: "/about",
    description: "Find out more about me!"
  },
  {
    title: "動画",
    path: "/videos",
  },
  {
    title: "創作物",
    path: "/creations",
  },
  {
    title: "統計学",
    path: "/stats",
    description: "Deep dive into statistics"
  },
];

export const footerJA: Footer = {
  columns: [
    {
      title: "ページ",
      link: "",
      links: [
        {
          name: "ホーム",
          link: "/",
          leavesWebsite: false,
        },
        {
          name: "私について",
          link: "/about",
          leavesWebsite: false,
        },
        {
          name: "動画",
          link: "/videos",
          leavesWebsite: false,
        },
        {
          name: "創作物",
          link: "/creations",
          leavesWebsite: false,
        },
        {
          name: "統計学",
          link: "/stats",
          leavesWebsite: false,
        },
        {
          name: "Anaplan Toolkit",
          link: "/anaplan",
          leavesWebsite: false,
        },
      ],
    },
    {
      title: "SNS",
      link: "https://link.umang.dev",
      links: [
        {
          name: "ユーチューブ",
          link: "https://youtube.com/getsaged",
          icon: "/icons/youtube.svg",
          leavesWebsite: true,
        },
        {
          name: "インスタグラム",
          link: "https://instagram.com/thisumang",
          icon: "/icons/instagram.svg",
          leavesWebsite: true,
        },
        {
          name: "ツイッター",
          link: "https://twitter.com/thisumang",
          icon: "/icons/twitter.svg",
          leavesWebsite: true,
        },
        {
          name: "リンクトイン",
          link: "https://www.linkedin.com/in/thisumang/",
          icon: "/icons/linkedin-f.svg",
          leavesWebsite: true,
        },
        {
          name: "Eメール",
          link: "mailto:contact@umang.dev",
          icon: "/icons/mail-f.svg",
          leavesWebsite: true,
        },
      ],
    },
  ],
  support: {
    title: "私の仕事をサポート",
    message: "これを読んだだけでも応援よろしくお願いします！💙",
  },
  make: {
    maker: "ウマング・チャウハン",
    madewith: "で作った",
    dislaimer: "全著作権所有.",
  },
  language: {
    title: "言語",
    languages: [
      {
        name: "英語 - English",
        link: "/",
        locale: "en"
      },

      {
        name: "日本語 - Japanese",
        link: "/",
        locale: "ja"
      }
    ]
  }
};



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
          name: "Videos",
          link: "/videos",
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
        {
          name: "Anaplan Toolkit",
          link: "/anaplan",
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
          link: "https://www.linkedin.com/in/thisumang/",
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
    title: "Support My Work",
    message: "I appreciate your support just by reading this! 💙",
  },
  make: {
    maker: "Umang Chauhan",
    madewith: "Made with",
    dislaimer: "All rights reserved.",
  },
  language: {
    title: "Langauge",
    languages: [
      {
        name: "English",
        link: "/",
        locale: "en"
      },

      {
        name: "日本語",
        link: "/",
        locale: "ja"
      }
    ]
  }
};
