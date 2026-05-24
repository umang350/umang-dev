export type Project = {
    slug: string;
    title: string;
    role: string;
    description: string;
    impact: string[];
    skills: string[];
    year: string;
}

export const projects: Project[] = [
    {
        slug: "global-supply-chain",
        title: "Global Retail Supply Chain Platform",
        role: "Product Manager",
        description: "Own the product roadmap for UNIQLO's supply chain systems across US, Europe, and Southeast Asia. Drive feature prioritization by synthesizing warehouse ops feedback, logistics data, and executive strategy into quarterly release plans. Partner with 3 engineering squads and ops teams across 5 regions.",
        impact: [
            "Defined and shipped inventory allocation engine serving 50+ global stores",
            "Cut order-to-ship cycle time by partnering with logistics to redesign fulfillment workflows",
            "Launched real-time shipment tracking dashboard adopted by regional ops teams"
        ],
        skills: ["Product Roadmapping", "Stakeholder Management", "Agile/Scrum", "Data Analytics"],
        year: "2024-Present"
    },
    {
        slug: "scm-modernization",
        title: "SCM Platform Modernization",
        role: "Product Development Manager",
        description: "Transitioned from hands-on engineering to owning the product vision for legacy SCM tool migration. Ran discovery interviews with warehouse managers and planners, wrote PRDs, and prioritized a 40+ item backlog. Managed the full lifecycle from problem framing through launch and iteration.",
        impact: [
            "Migrated 3 legacy tools into a unified platform, reducing context-switching for planners",
            "Introduced data-driven prioritization using usage analytics and NPS surveys",
            "Shipped demand forecasting feature that improved seasonal stock planning accuracy"
        ],
        skills: ["PRDs & Specs", "User Research", "Cross-functional Leadership", "Technical Architecture"],
        year: "2022-2024"
    },
    {
        slug: "retail-backend",
        title: "Retail Operations Backend Systems",
        role: "Software Development Engineer",
        description: "Built core backend services powering store and warehouse operations at UNIQLO. Designed APIs, implemented CI/CD pipelines, and owned production reliability. This hands-on engineering work gave me deep domain knowledge that now informs my product judgment.",
        impact: [
            "Built RESTful APIs handling 10K+ daily transactions across store systems",
            "Designed event-driven architecture for real-time inventory sync",
            "Reduced deployment time by automating CI/CD pipeline setup"
        ],
        skills: ["Spring Boot", "React", "AWS", "CI/CD", "System Design"],
        year: "2020-2022"
    },
    {
        slug: "youtube-channel",
        title: "YouTube Channel & Content Strategy",
        role: "Creator & Strategist",
        description: "Built a tech-focused YouTube channel as a side project, treating it like a product. Defined content pillars, analyzed retention curves and CTR data to iterate on formats, and grew an engaged subscriber base through systematic experimentation.",
        impact: [
            "Grew channel through data-driven content iteration and SEO optimization",
            "Ran format experiments (shorts vs. long-form, thumbnails) to maximize watch time",
            "Built a niche community helping aspiring developers break into tech in Japan"
        ],
        skills: ["Growth Strategy", "Analytics", "A/B Testing", "Community Building"],
        year: "2020-Present"
    }
];

export const projectsJA: Project[] = [
    {
        slug: "global-supply-chain",
        title: "グローバルリテールサプライチェーンプラットフォーム",
        role: "プロダクトマネージャー",
        description: "ユニクロの米国・欧州・東南アジアにおけるサプライチェーンシステムのプロダクトロードマップを担当。倉庫オペレーションのフィードバック、物流データ、経営戦略を統合し、四半期リリース計画の機能優先順位付けを推進。5地域にまたがる3つのエンジニアリングチームとオペレーションチームと連携。",
        impact: [
            "50以上のグローバル店舗にサービスを提供する在庫配分エンジンを定義・リリース",
            "物流チームと連携しフルフィルメントワークフローを再設計、受注から出荷までのサイクルタイムを短縮",
            "地域オペレーションチームに採用されたリアルタイム出荷トラッキングダッシュボードをローンチ"
        ],
        skills: ["プロダクトロードマップ", "ステークホルダー管理", "アジャイル/スクラム", "データ分析"],
        year: "2024-現在"
    },
    {
        slug: "scm-modernization",
        title: "SCMプラットフォーム近代化",
        role: "プロダクト開発マネージャー",
        description: "ハンズオンエンジニアリングからレガシーSCMツール移行のプロダクトビジョンオーナーに転身。倉庫マネージャーやプランナーへのディスカバリーインタビューを実施し、PRDを作成、40以上のバックログアイテムの優先順位付けを管理。問題定義からローンチ・イテレーションまでフルライフサイクルを管理。",
        impact: [
            "3つのレガシーツールを統合プラットフォームに移行、プランナーのコンテキストスイッチングを削減",
            "利用分析とNPSサーベイを活用したデータドリブンな優先順位付けを導入",
            "季節在庫計画の精度を向上させる需要予測機能をリリース"
        ],
        skills: ["PRD＆仕様書", "ユーザーリサーチ", "クロスファンクショナルリーダーシップ", "技術アーキテクチャ"],
        year: "2022-2024"
    },
    {
        slug: "retail-backend",
        title: "リテールオペレーションバックエンドシステム",
        role: "ソフトウェア開発エンジニア",
        description: "ユニクロの店舗・倉庫オペレーションを支えるコアバックエンドサービスを構築。API設計、CI/CDパイプライン実装、本番環境の信頼性を担当。このハンズオンエンジニアリング経験が、現在のプロダクト判断の基盤となるドメイン知識を形成。",
        impact: [
            "店舗システム全体で日次10K以上のトランザクションを処理するRESTful APIを構築",
            "リアルタイム在庫同期のためのイベントドリブンアーキテクチャを設計",
            "CI/CDパイプラインセットアップの自動化によりデプロイ時間を短縮"
        ],
        skills: ["Spring Boot", "React", "AWS", "CI/CD", "システム設計"],
        year: "2020-2022"
    },
    {
        slug: "youtube-channel",
        title: "YouTubeチャンネル＆コンテンツ戦略",
        role: "クリエイター＆ストラテジスト",
        description: "テック系YouTubeチャンネルをサイドプロジェクトとして立ち上げ、プロダクトのように運営。コンテンツの柱を定義し、リテンションカーブやCTRデータを分析してフォーマットを反復改善、体系的な実験を通じてエンゲージドな登録者基盤を構築。",
        impact: [
            "データドリブンなコンテンツイテレーションとSEO最適化でチャンネルを成長",
            "フォーマット実験（ショート vs ロングフォーム、サムネイル）を実施し視聴時間を最大化",
            "日本でテック業界を目指す開発者を支援するニッチコミュニティを構築"
        ],
        skills: ["成長戦略", "分析", "A/Bテスト", "コミュニティ構築"],
        year: "2020-現在"
    }
];
