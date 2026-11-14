// Japanese titles, descriptions and SEO text for the guides under
// /ja/anaplan/guides. Slugs, hero art, dates and reading times stay in
// guides.ts; the article bodies are in components/anaplan/posts.ja.tsx.

export type GuideJa = {
    title: string;
    seoTitle: string;
    keywords: string;
    desc: string;
    category: string;
};

export const guidesJa: Record<string, GuideJa> = {
    "improve-anaplan-model-and-usage": {
        title: "Anaplanモデルの改善方法と、チームでの使われ方の見直し",
        seoTitle: "Anaplanモデルの改善方法とチームの使われ方 | Anaplan Toolkit",
        keywords: "Anaplan モデル 改善, Anaplan モデル ヘルスチェック, Anaplan ベストプラクティス, Anaplan Planual, Anaplan モデル 監査, Anaplan 未使用 ラインアイテム, Anaplan CoE",
        desc: "モデルビルダーとCoEリード向けの実践的な手順。構造上の問題を見つけ、誰も使っていないものを整理し、数式を読みやすく保ち、モデルの健全性チェックを毎月の習慣にします。",
        category: "モデルの健全性",
    },
    "reduce-anaplan-model-size": {
        title: "Anaplanモデルのサイズを小さくする方法",
        seoTitle: "Anaplanモデルのサイズ削減：実践ガイド | Anaplan Toolkit",
        keywords: "Anaplan モデル サイズ 削減, Anaplan モデル サイズ, Anaplan ワークスペース 容量, Anaplan セル数, Anaplan スパース性, Anaplan ラインアイテム 削除, Anaplan 最適化",
        desc: "Anaplanモデルのサイズがどこから生まれるのか、最もサイズを使っているモジュール、ディメンション、ラインアイテムをどう見つけるか、そして安全に取り除く方法。",
        category: "モデルの健全性",
    },
    "anaplan-disco-model-architecture": {
        title: "AnaplanのDISCOとは：モデルを速く保つアーキテクチャ",
        seoTitle: "AnaplanのDISCOとは：モデルアーキテクチャガイド | Anaplan Toolkit",
        keywords: "Anaplan DISCO, DISCO Anaplan 解説, Anaplan モデル アーキテクチャ, Anaplan モジュール 設計, Anaplan Data Inputs System Calculations Outputs, Anaplan ベストプラクティス",
        desc: "DISCOはモデルをData、Inputs、System、Calculations、Outputsの5つに分けます。各層が持つもの、層の間でデータをどう流すべきか、パターンが崩れたモデルの見つけ方を解説します。",
        category: "アーキテクチャ",
    },
    "anaplan-sparsity-and-dimensionality": {
        title: "Anaplanのスパース性とディメンション：本当のコストはセル数",
        seoTitle: "Anaplanのスパース性とディメンション：セル数の考え方 | Anaplan Toolkit",
        keywords: "Anaplan スパース性, Anaplan ディメンション, Anaplan セル数, Anaplan モデル サイズ, Anaplan 密 疎, Anaplan パフォーマンス, Anaplan リスト ディメンション",
        desc: "ディメンションを1つ足すたびに、ラインアイテムが持てるセルは掛け算で増えます。その計算、スパースなモジュールがメモリーと計算時間を無駄にする理由、小さくする定番の方法を見ていきます。",
        category: "パフォーマンス",
    },
    "anaplan-formula-performance": {
        title: "Anaplanの数式パフォーマンス：モデルを遅くする原因と直し方",
        seoTitle: "Anaplanの数式パフォーマンス：遅い数式の見つけ方と改善 | Anaplan Toolkit",
        keywords: "Anaplan 数式 パフォーマンス, Anaplan 計算 負荷, Anaplan 遅い モデル, Anaplan SUM LOOKUP 高速化, Anaplan 数式 最適化, Anaplan モデル 速度, Anaplan ブループリント Calculation Effort",
        desc: "計算コストが最も大きいラインアイテムの見つけ方、コストを押し上げやすい数式のパターン、そして変更の効果を繰り返し測定する方法。",
        category: "パフォーマンス",
    },
    "anaplan-data-hub": {
        title: "Anaplanのデータハブ：作るべきタイミングと設計の考え方",
        seoTitle: "Anaplanのデータハブ：設計ガイドと必要になるタイミング | Anaplan Toolkit",
        keywords: "Anaplan データハブ, Anaplan データハブ 設計, Anaplan データハブ スポーク, Anaplan 連携 アーキテクチャ, Anaplan インポート, Anaplan モデル アーキテクチャ",
        desc: "データハブは、元データとクレンジング済みデータを1つのモデルに集め、スリムな計画モデルへ渡します。効果が出る場面、中に置くもの、避けたい失敗を整理します。",
        category: "アーキテクチャ",
    },
    "anaplan-api-action-ids-and-process-ids": {
        title: "Anaplan API：アクション、インポート、エクスポート、プロセスのIDを調べる方法",
        seoTitle: "Anaplan API：アクション・インポート・エクスポート・プロセスのID | Anaplan Toolkit",
        keywords: "Anaplan API, Anaplan プロセスID, Anaplan アクションID, Anaplan インポートID, Anaplan エクスポートID, Anaplan Integration API v2, Anaplan プロセス 実行 API, Anaplan ワークスペースID モデルID",
        desc: "Anaplan Integration APIの呼び出しに必要な5種類のID、それぞれの調べ方、そして自分のトークンでスクリプトからプロセスを実行する方法。",
        category: "連携",
    },
    "anaplan-planual-best-practices": {
        title: "実践のAnaplan Planual：重要なルールと確認の仕方",
        seoTitle: "Anaplan Planualのベストプラクティス：実践チェックリスト | Anaplan Toolkit",
        keywords: "Anaplan Planual, Anaplan Planual チェックリスト, Anaplan ベストプラクティス, Anaplan モデル レビュー, Anaplan Lint, Anaplan モデル 標準, Anaplan 数式 標準",
        desc: "Planualは長大です。これを、変更レビュー、引き継ぎ、毎月のヘルスチェックで使える短いチェックリストにする方法と、自動チェックにできることとできないこと。",
        category: "標準",
    },
    "anaplan-alm-revision-tags": {
        title: "AnaplanのALMとリビジョンタグ：開発から本番への安全な道筋",
        seoTitle: "AnaplanのALMとリビジョンタグ：開発から本番へのガイド | Anaplan Toolkit",
        keywords: "Anaplan ALM, Anaplan リビジョンタグ, Anaplan アプリケーション ライフサイクル 管理, Anaplan 開発 テスト 本番, Anaplan 同期, Anaplan リリース プロセス, Anaplan デプロイ",
        desc: "AnaplanのALM（アプリケーションライフサイクル管理）が、開発、テスト、本番のモデルの間で構造の変更をどう動かすのか。リリースを平穏に保つための習慣。",
        category: "リリース管理",
    },
    "anaplan-model-documentation": {
        title: "Anaplanのモデルドキュメント：何を書き、どう最新に保つか",
        seoTitle: "Anaplanのモデルドキュメント：テンプレートと自動化 | Anaplan Toolkit",
        keywords: "Anaplan モデル ドキュメント, Anaplan ドキュメント テンプレート, Anaplan モデル 引き継ぎ, Anaplan モデル 文書化, Anaplan ブループリント ドキュメント, Anaplan モデル 一覧",
        desc: "役に立つAnaplanモデルドキュメントに含めるべきもの、手書きの文書が古くなる理由、事実にあたる部分をモデル自身から生成する方法。",
        category: "ガバナンス",
    },
    "excel-to-anaplan-migration": {
        title: "ExcelからAnaplanへ：スプレッドシートをコピーせず、考え直す",
        seoTitle: "ExcelからAnaplanへの移行：コピーせず考え直す | Anaplan Toolkit",
        keywords: "Excel Anaplan 移行, Excel Anaplan 違い, Excel から Anaplan, Anaplan 経理 財務, Anaplan 多次元, Anaplan ラインアイテム 数式, Excel 計画 モデル Anaplan",
        desc: "Excelの数式はセルに、Anaplanの数式はラインアイテムに置かれます。計画モデルを移すときに何が変わるのか、具体例と、そのまま移し替えるときの落とし穴。",
        category: "はじめに",
    },
    "anaplan-lists-subsets-and-liss": {
        title: "Anaplanのリスト、サブセット、ラインアイテムサブセット：計算対象を絞る",
        seoTitle: "Anaplanのリスト・サブセット・LISSの解説 | Anaplan Toolkit",
        keywords: "Anaplan サブセット, Anaplan ラインアイテムサブセット, Anaplan LISS, Anaplan リスト, Anaplan ナンバードリスト, Anaplan リスト プロパティ, Anaplan ディメンション 設計",
        desc: "リストはモジュールが保持できる範囲を決めます。サブセットとラインアイテムサブセット（LISS）で持つセルを減らす方法を、具体例と使い分けのルールとともに解説します。",
        category: "パフォーマンス",
    },
};
