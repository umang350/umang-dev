import Page from '@/components/utility/Page'

const PageName = "Anaplan Toolkit Privacy Policy";

const AnaplanToolkitPrivacy = () => {
    return (
        <Page currentPage={PageName} meta={{
            desc: "Privacy policy for the Anaplan Toolkit browser extension for Chrome and Firefox."
        }}>
            <div className="prose prose-invert max-w-none sm:max-w-3xl mx-auto text-left mt-8">
                <h1>Anaplan Toolkit &mdash; Privacy Policy</h1>
                <p><em>Last updated: September 13, 2026</em></p>

                <p>
                    Anaplan Toolkit is a browser extension for Chrome and Firefox that reports on the
                    structure of an Anaplan model &mdash; actions, action usages, pages, modules, filters,
                    and saved views &mdash; for the Anaplan tab you already have open. This policy explains
                    what the extension does and does not do with your data.
                </p>

                <h2>What the extension accesses</h2>
                <p>
                    Anaplan Toolkit only runs on pages under <code>*.anaplan.com</code>. It has no access to
                    any other website you visit. When you request a view, it reads:
                </p>
                <ul>
                    <li>Anaplan&apos;s in-page model metadata (the model cache already loaded into the page by Anaplan itself), and</li>
                    <li>Anaplan&apos;s own APIs &mdash; the springboard definition service and the <code>/jsonrpc</code> endpoint &mdash; using your existing, already-authenticated Anaplan session. The extension never asks for or stores your Anaplan credentials, and never creates a session of its own.</li>
                </ul>

                <h2>What the extension does not do</h2>
                <ul>
                    <li>It does not contact any server other than the Anaplan tenant you are already signed into.</li>
                    <li>It does not include analytics, telemetry, crash reporting, or advertising SDKs of any kind.</li>
                    <li>It does not sell, rent, or share any data with third parties, because no data ever leaves your browser and the Anaplan servers it already talks to.</li>
                    <li>It does not track your browsing activity outside of Anaplan.</li>
                </ul>

                <h2>Where data is stored</h2>
                <p>
                    Results are cached locally in your browser only, using the standard extension storage
                    APIs (<code>chrome.storage.session</code> / <code>browser.storage.session</code>) plus an
                    in-memory cache, keyed to the specific Anaplan customer and model. This cache automatically
                    expires after 6 hours or clears when you switch models, and is never transmitted anywhere.
                    Nothing is written to a remote database, and nothing persists once your browser session ends.
                </p>

                <h2>Permissions</h2>
                <p>
                    The extension requests the minimum permissions needed to function: host access to
                    <code> *.anaplan.com</code>, the side panel API to display its UI, and local storage to
                    cache results. On Firefox, the extension&apos;s listing declares
                    <code> data_collection_permissions: none</code>, because none is collected.
                </p>

                <h2>Changes to this policy</h2>
                <p>
                    If the extension&apos;s data practices ever change (for example, if a feature required
                    contacting a new server), this page will be updated first and the version noted above
                    will change accordingly.
                </p>

                <h2>Contact</h2>
                <p>
                    Questions about this policy or the extension can be sent to{' '}
                    <a href="mailto:contact@umang.dev">contact@umang.dev</a>.
                </p>

                <p>
                    Anaplan Toolkit is an independent, unofficial tool and is not affiliated with, endorsed
                    by, or sponsored by Anaplan, Inc.
                </p>
            </div>
        </Page>
    )
}

export default AnaplanToolkitPrivacy
