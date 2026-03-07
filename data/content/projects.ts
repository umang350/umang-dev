export type Project = {
    title: string;
    role: string;
    description: string;
    impact: string[];
    skills: string[];
    year: string;
}

export const projects: Project[] = [
    {
        title: "Global Supply Chain Platform",
        role: "Product Manager",
        description: "Led the product strategy for a global supply chain management platform serving multiple markets. Defined product roadmap, prioritized features based on user research and business impact, and coordinated cross-functional teams across engineering, design, and operations.",
        impact: [
            "Streamlined supply chain operations across global markets",
            "Reduced manual processes through automation and system integration",
            "Improved visibility and tracking for stakeholders across the organization"
        ],
        skills: ["Product Roadmapping", "Stakeholder Management", "Agile/Scrum", "Data Analytics"],
        year: "2024-Present"
    },
    {
        title: "IT SCM Product Development",
        role: "Product Development Manager",
        description: "Transitioned from SDE to Product Development Manager, owning the end-to-end product lifecycle for IT supply chain management tools. Conducted user research, wrote PRDs, and drove feature prioritization through data-driven decision making.",
        impact: [
            "Successfully transitioned from engineering to product ownership",
            "Delivered key features that improved operational efficiency",
            "Built and maintained stakeholder relationships across business units"
        ],
        skills: ["PRDs & Specs", "User Research", "Cross-functional Leadership", "Technical Architecture"],
        year: "2022-2024"
    },
    {
        title: "Enterprise Software Development",
        role: "Software Development Engineer",
        description: "Built and maintained enterprise-grade applications for retail operations. Developed deep understanding of the business domain, user needs, and technical constraints that later informed product decisions.",
        impact: [
            "Developed scalable backend services and APIs",
            "Gained deep domain expertise in retail technology",
            "Contributed to system design and architecture decisions"
        ],
        skills: ["Spring Boot", "React", "AWS", "CI/CD", "System Design"],
        year: "2020-2022"
    },
    {
        title: "Content Creation & Personal Brand",
        role: "Creator & Strategist",
        description: "Built a YouTube channel and personal brand from scratch, applying product thinking to content strategy. Analyzed viewer data, ran experiments on content formats, and optimized for growth through data-driven insights.",
        impact: [
            "Applied product management principles to content strategy",
            "Used analytics and A/B testing to optimize engagement",
            "Built a community through consistent value delivery"
        ],
        skills: ["Growth Strategy", "Analytics", "A/B Testing", "Community Building"],
        year: "2020-Present"
    }
];

export const projectsJA: Project[] = [
    {
        title: "グローバルサプライチェーンプラットフォーム",
        role: "プロダクトマネージャー",
        description: "複数の市場にサービスを提供するグローバルサプライチェーン管理プラットフォームのプロダクト戦略をリード。プロダクトロードマップを定義し、ユーザーリサーチとビジネスインパクトに基づいて機能を優先順位付けし、エンジニアリング、デザイン、オペレーション全体でクロスファンクショナルチームを調整。",
        impact: [
            "グローバル市場全体のサプライチェーン業務を効率化",
            "自動化とシステム統合による手動プロセスの削減",
            "組織全体のステークホルダーへの可視性とトラッキングの改善"
        ],
        skills: ["プロダクトロードマップ", "ステークホルダー管理", "アジャイル/スクラム", "データ分析"],
        year: "2024-現在"
    },
    {
        title: "IT SCMプロダクト開発",
        role: "プロダクト開発マネージャー",
        description: "SDEからプロダクト開発マネージャーに転身し、ITサプライチェーン管理ツールのエンドツーエンドのプロダクトライフサイクルを担当。ユーザーリサーチを実施し、PRDを作成し、データドリブンな意思決定を通じて機能の優先順位付けを推進。",
        impact: [
            "エンジニアリングからプロダクトオーナーシップへの転身に成功",
            "業務効率を向上させる主要機能を提供",
            "ビジネスユニット全体でステークホルダー関係を構築・維持"
        ],
        skills: ["PRD＆仕様書", "ユーザーリサーチ", "クロスファンクショナルリーダーシップ", "技術アーキテクチャ"],
        year: "2022-2024"
    },
    {
        title: "エンタープライズソフトウェア開発",
        role: "ソフトウェア開発エンジニア",
        description: "リテール業務向けのエンタープライズグレードアプリケーションを構築・保守。ビジネスドメイン、ユーザーニーズ、技術的制約について深い理解を獲得し、後のプロダクト判断に活用。",
        impact: [
            "スケーラブルなバックエンドサービスとAPIを開発",
            "リテールテクノロジーにおける深いドメイン専門知識を獲得",
            "システム設計とアーキテクチャの意思決定に貢献"
        ],
        skills: ["Spring Boot", "React", "AWS", "CI/CD", "システム設計"],
        year: "2020-2022"
    },
    {
        title: "コンテンツ制作＆パーソナルブランド",
        role: "クリエイター＆ストラテジスト",
        description: "YouTubeチャンネルとパーソナルブランドをゼロから構築し、コンテンツ戦略にプロダクト思考を適用。視聴者データを分析し、コンテンツフォーマットの実験を実施し、データドリブンなインサイトを通じて成長を最適化。",
        impact: [
            "コンテンツ戦略にプロダクトマネジメントの原則を適用",
            "分析とA/Bテストを活用してエンゲージメントを最適化",
            "一貫した価値提供を通じてコミュニティを構築"
        ],
        skills: ["成長戦略", "分析", "A/Bテスト", "コミュニティ構築"],
        year: "2020-現在"
    }
];
