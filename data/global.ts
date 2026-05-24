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
    description: "Umang Chauhan - Product Manager building user-centric products at the intersection of technology and retail."
  },
  {
    title: "About Me",
    path: "/about",
    description: "Learn about my journey from Software Engineer to Product Manager."
  },
  {
    title: "Projects",
    path: "/projects",
    description: "Product case studies and projects I've led."
  },
  {
    title: "Impact",
    path: "/stats",
    description: "PM metrics: site analytics, community, and reach."
  },
  {
    title: "Videos",
    path: "/videos",
    description: "YouTube videos and content."
  },
];

export const routesJA: Route[] = [
  {
    title: "ホーム",
    path: "/",
    description: "ウマング・チャウハン - テクノロジーとリテールの交差点でユーザー中心のプロダクトを構築するプロダクトマネージャー。"
  },
  {
    title: "私について",
    path: "/about",
    description: "ソフトウェアエンジニアからプロダクトマネージャーへの道のり。"
  },
  {
    title: "プロジェクト",
    path: "/projects",
    description: "プロダクトケーススタディとリードしたプロジェクト。"
  },
  {
    title: "インパクト",
    path: "/stats",
    description: "PMメトリクス：サイト分析、コミュニティ、リーチ。"
  },
  {
    title: "Videos",
    path: "/videos",
    description: "YouTubeの動画とコンテンツ。"
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
          name: "プロジェクト",
          link: "/projects",
          leavesWebsite: false,
        },
        {
          name: "インパクト",
          link: "/stats",
          leavesWebsite: false,
        },
      ],
    },
    {
      title: "SNS",
      link: "https://link.umang.dev",
      links: [
        {
          name: "リンクトイン",
          link: "https://www.linkedin.com/in/thisumang/",
          icon: "/icons/linkedin-f.svg",
          leavesWebsite: true,
        },
        {
          name: "ツイッター",
          link: "https://twitter.com/thisumang",
          icon: "/icons/twitter.svg",
          leavesWebsite: true,
        },
        {
          name: "インスタグラム",
          link: "https://instagram.com/thisumang",
          icon: "/icons/instagram.svg",
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
    message: "これを読んだだけでも応援よろしくお願いします！",
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
          name: "Projects",
          link: "/projects",
          leavesWebsite: false,
        },
        {
          name: "Impact",
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
          name: "LinkedIn",
          link: "https://www.linkedin.com/in/thisumang/",
          icon: "/icons/linkedin-f.svg",
          leavesWebsite: true,
        },
        {
          name: "Twitter",
          link: "https://twitter.com/thisumang",
          icon: "/icons/twitter.svg",
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
    title: "Let's Connect",
    message: "Open to product roles and collaboration opportunities.",
  },
  make: {
    maker: "Umang Chauhan",
    madewith: "Made with",
    dislaimer: "All rights reserved.",
  },
  language: {
    title: "Language",
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
