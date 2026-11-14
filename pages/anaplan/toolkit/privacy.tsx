import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import ToolkitShell from "@/components/anaplan/ToolkitShell";

// Privacy policy for the Anaplan Toolkit extension. The Chrome Web Store and
// Firefox Add-ons listings point here; /privacy/anaplan-toolkit redirects to
// this page (see next.config.js), so keep both working if it ever moves.

const pageTitle = "Privacy Policy — Anaplan Toolkit";
const pageDesc = "Privacy policy for the Anaplan Toolkit browser extension for Chrome and Firefox.";
const lastUpdated = "October 4, 2026";

const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mt-12 text-xl font-semibold tracking-tight text-gray-900">{children}</h2>
);

const UL = ({ children }: { children: React.ReactNode }) => (
    <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700 marker:text-red-600">{children}</ul>
);

const Code = ({ children }: { children: React.ReactNode }) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.85em] text-gray-800">{children}</code>
);

const P = ({ children }: { children: React.ReactNode }) => (
    <p className="mt-4 leading-relaxed text-gray-700">{children}</p>
);

// Japanese translation of the policy below. Keep the two in step; the English
// text is the authoritative one, which the page says.
const PolicyJa = () => (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
        <nav className="text-sm text-gray-500" aria-label="パンくずリスト">
            <Link href="/anaplan" className="hover:text-gray-800">Anaplan Toolkit</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">プライバシーポリシー</span>
        </nav>
        <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-red-600">プライバシー</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Anaplan Toolkit プライバシーポリシー</h1>
        <p className="mt-3 text-sm text-gray-500">最終更新日：2026年10月4日</p>
        <p className="mt-3 text-sm text-gray-500">
            このページは英語版の翻訳です。内容に相違がある場合は、
            <Link href="/anaplan/toolkit/privacy" locale="en" className="underline underline-offset-2 hover:text-gray-800">英語版</Link>
            が優先されます。
        </p>

        <P>
            Anaplan Toolkit は、Chrome と Firefox 向けのブラウザー拡張機能です。すでに開いている Anaplan のタブについて、
            モデルの構造（アクション、プロセスのステップ、ページ、モジュール、ラインアイテム、リスト、フィルター、保存済みビュー、
            リビジョンタグ、ワークスペースの容量、モデルのロック状態）をレポートします。このポリシーでは、拡張機能がお客様の
            データについて行うことと行わないことを説明します。
        </P>

        <H2>拡張機能がアクセスするもの</H2>
        <P>
            Anaplan Toolkit は <Code>*.anaplan.com</Code> 配下のページでのみ動作します。お客様が訪れるほかのウェブサイトには
            一切アクセスできません。ビューを要求すると、次のものを読み取ります。
        </P>
        <UL>
            <li>Anaplan のページ内にあるモデルのメタデータ（Anaplan 自身がページに読み込み済みのモデルキャッシュ）。</li>
            <li>Anaplan 自身の API（springboard definition サービス、platform gateway サービス、<Code>/jsonrpc</Code> エンドポイント）。お客様の既存の認証済み Anaplan セッションを使用します。拡張機能が Anaplan の認証情報や API トークンを求めたり保存したりすることはなく、独自のセッションを作成することもありません。</li>
            <li>Lock Monitor のみ、かつ Anaplan のセッション状態の確認に応答がない場合に限り、Anaplan Integration API（<Code>api.anaplan.com</Code>）のモデル状態エンドポイント。お客様の Anaplan タブから、そのタブの既存のログインを使って送信されます。</li>
        </UL>

        <H2>拡張機能が行わないこと</H2>
        <UL>
            <li>Anaplan 自身のサーバー（お客様の Anaplan テナントと、Lock Monitor の場合は <Code>api.anaplan.com</Code>）以外のサーバーには接続しません。</li>
            <li>すべてのレポートは読み取りのみです。モデル内の何かを作成、変更、削除、実行することはなく、「Copy API call」ボタンはリクエストをクリップボードにコピーするだけです。唯一の例外は、お客様自身が開始する Delete Line Items と Delete Modules のビューです。アップロードされた CSV をモデルと照合し、削除する件数をお客様が入力した後にのみ削除します。CSV は保存されません。</li>
            <li>アクセス解析、テレメトリー、クラッシュレポート、広告 SDK の類は一切含まれません。</li>
            <li>データを第三者に販売、貸与、共有することはありません。データが、お客様のブラウザーと、すでに通信している Anaplan のサーバーの外に出ることがないためです。</li>
            <li>Anaplan 以外での閲覧行動を追跡しません。</li>
        </UL>

        <H2>データの保存場所</H2>
        <P>
            結果は、標準の拡張機能ストレージ API（<Code>chrome.storage.session</Code> / <Code>browser.storage.session</Code>）と
            メモリー内キャッシュを使って、お客様のブラウザー内にのみキャッシュされます。キャッシュは Anaplan の顧客とモデルごとに
            分けられ、6時間後に自動的に失効するか、モデルを切り替えたときに消去されます。どこかに送信されることはありません。
            リモートのデータベースには何も書き込まれず、ブラウザーのセッションが終了するとレポートは残りません。
            それ以外に保持される設定は、Lock Monitor の確認間隔、実行時間、「Notify me」の選択だけで、
            お客様の端末上にある拡張機能自身のローカルストレージに保存されます。
        </P>

        <H2>権限</H2>
        <P>
            拡張機能は、動作に必要な最小限の権限だけを要求します。<Code>*.anaplan.com</Code> へのホストアクセス、
            UI を表示するためのサイドパネル API、結果をキャッシュするためのローカルストレージです。
            <Code>notifications</Code> 権限は任意です。Lock Monitor で「Notify me」にチェックを入れた場合にだけ要求され、
            モデルがビジーになったときと再び空いたときにお知らせする目的にのみ使用されます。Firefox では、データを収集しないため、
            掲載情報で <Code>data_collection_permissions: none</Code> と申告しています。
        </P>

        <H2>このポリシーの変更</H2>
        <P>
            拡張機能のデータの取り扱いが変わる場合（たとえば、ある機能が新しいサーバーへの接続を必要とする場合）は、
            まずこのページを更新し、上記の更新日を変更します。
        </P>

        <H2>お問い合わせ</H2>
        <P>
            このポリシーや拡張機能に関するご質問は、
            <a href="mailto:contact@umang.dev?subject=Anaplan%20Toolkit" className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">contact@umang.dev</a>
            までお送りください。
        </P>

        <P>
            Anaplan Toolkit は独立した非公式のツールであり、Anaplan, Inc. との提携、同社による承認や後援を受けたものではありません。
        </P>
    </article>
);

const AnaplanToolkitPrivacy = () => {
    const ja = useRouter().locale === "ja";
    if (ja) {
        return (
            <ToolkitShell title="プライバシーポリシー — Anaplan Toolkit" desc="Chrome・Firefox向けブラウザー拡張機能 Anaplan Toolkit のプライバシーポリシー。" path="/anaplan/toolkit/privacy">
                <PolicyJa />
            </ToolkitShell>
        );
    }
    return (
        <ToolkitShell title={pageTitle} desc={pageDesc} path="/anaplan/toolkit/privacy">
            <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
                <nav className="text-sm text-gray-500" aria-label="Breadcrumb">
                    <Link href="/anaplan" className="hover:text-gray-800">Anaplan Toolkit</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-700">Privacy policy</span>
                </nav>
                <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-red-600">Privacy</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Anaplan Toolkit Privacy Policy</h1>
                <p className="mt-3 text-sm text-gray-500">Last updated: {lastUpdated}</p>

                <p className="mt-4 leading-relaxed text-gray-700">
                    Anaplan Toolkit is a browser extension for Chrome and Firefox that reports on the
                    structure of an Anaplan model &mdash; actions, process steps, pages, modules, line items,
                    lists, filters, saved views, revision tags, workspace storage and the model&apos;s lock
                    status &mdash; for the Anaplan tab you already have open. This policy explains
                    what the extension does and does not do with your data.
                </p>

                <H2>What the extension accesses</H2>
                <p className="mt-4 leading-relaxed text-gray-700">
                    Anaplan Toolkit only runs on pages under <Code>*.anaplan.com</Code>. It has no access to
                    any other website you visit. When you request a view, it reads:
                </p>
                <UL>
                    <li>Anaplan&apos;s in-page model metadata (the model cache already loaded into the page by Anaplan itself), and</li>
                    <li>Anaplan&apos;s own APIs &mdash; the springboard definition and platform gateway services and the <Code>/jsonrpc</Code> endpoint &mdash; using your existing, already-authenticated Anaplan session. The extension never asks for or stores your Anaplan credentials or API tokens, and never creates a session of its own.</li>
                    <li>For the Lock Monitor only, and only if Anaplan&apos;s session status check does not answer: the model status endpoint of Anaplan&apos;s Integration API (<Code>api.anaplan.com</Code>), sent from your Anaplan tab with that tab&apos;s existing login.</li>
                </UL>

                <H2>What the extension does not do</H2>
                <UL>
                    <li>It does not contact any server other than Anaplan&apos;s own (your Anaplan tenant and, for the Lock Monitor, <Code>api.anaplan.com</Code>).</li>
                    <li>Every report only reads. It never creates, changes, deletes or runs anything in your model; its &ldquo;Copy API call&rdquo; buttons only copy a request to your clipboard. The one exception is the Delete Line Items and Delete Modules views, which you start yourself: they check an uploaded CSV against your model, and delete only after you type the number of items to delete. The CSV is not stored.</li>
                    <li>It does not include analytics, telemetry, crash reporting, or advertising SDKs of any kind.</li>
                    <li>It does not sell, rent, or share any data with third parties, because no data ever leaves your browser and the Anaplan servers it already talks to.</li>
                    <li>It does not track your browsing activity outside of Anaplan.</li>
                </UL>

                <H2>Where data is stored</H2>
                <p className="mt-4 leading-relaxed text-gray-700">
                    Results are cached locally in your browser only, using the standard extension storage
                    APIs (<Code>chrome.storage.session</Code> / <Code>browser.storage.session</Code>) plus an
                    in-memory cache, keyed to the specific Anaplan customer and model. This cache automatically
                    expires after 6 hours or clears when you switch models, and is never transmitted anywhere.
                    Nothing is written to a remote database, and no report persists once your browser session ends.
                    The only setting kept beyond that is the Lock Monitor&apos;s check interval, length and
                    &ldquo;Notify me&rdquo; choice, stored in the extension&apos;s own local storage on your device.
                </p>

                <H2>Permissions</H2>
                <p className="mt-4 leading-relaxed text-gray-700">
                    The extension requests the minimum permissions needed to function: host access to
                    {" "}<Code>*.anaplan.com</Code>, the side panel API to display its UI, and local storage to
                    cache results. The <Code>notifications</Code> permission is optional: it is only requested if
                    you tick &ldquo;Notify me&rdquo; on the Lock Monitor, and is used solely to tell you when the
                    model has been busy and when it is free again. On Firefox, the extension&apos;s listing declares
                    {" "}<Code>data_collection_permissions: none</Code>, because none is collected.
                </p>

                <H2>Changes to this policy</H2>
                <p className="mt-4 leading-relaxed text-gray-700">
                    If the extension&apos;s data practices ever change (for example, if a feature required
                    contacting a new server), this page will be updated first and the version noted above
                    will change accordingly.
                </p>

                <H2>Contact</H2>
                <p className="mt-4 leading-relaxed text-gray-700">
                    Questions about this policy or the extension can be sent to{" "}
                    <a href="mailto:contact@umang.dev?subject=Anaplan%20Toolkit" className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">contact@umang.dev</a>.
                </p>

                <p className="mt-4 leading-relaxed text-gray-700">
                    Anaplan Toolkit is an independent, unofficial tool and is not affiliated with, endorsed
                    by, or sponsored by Anaplan, Inc.
                </p>
            </article>
        </ToolkitShell>
    );
};

export default AnaplanToolkitPrivacy;
