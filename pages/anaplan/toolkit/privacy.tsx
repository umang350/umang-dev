import Link from "next/link";
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

const AnaplanToolkitPrivacy = () => {
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
                    <li>Every call only reads. It never creates, changes, deletes or runs anything in your model; its &ldquo;Copy API call&rdquo; buttons only copy a request to your clipboard.</li>
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
