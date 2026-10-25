import Link from "next/link";
import Article, { Callout, Code, H2, H3, OL, P, UL } from "@/components/anaplan/Article";

const AnaplanImproveModel = () => (
    <Article
        slug="improve-anaplan-model-and-usage"
        kicker="Guide"
        title="How to improve an Anaplan model and how your team uses it"
        desc="A practical routine for builders and CoE leads: find structural problems, retire what nobody uses, keep formulas readable and make model health a monthly habit."
        published="2026-10-25"
        readMinutes={9}
    >
        <P>
            Most Anaplan models do not fail on a single bad decision. They drift: a module added for one
            project, a line item kept &ldquo;just in case&rdquo;, a formula copied and tweaked three times,
            a page nobody opens. A year later the model is slower, harder to hand over and more expensive
            to change. Improving it is less about a big rebuild than about a regular, evidence-based
            clean-up. This guide gives you that routine.
        </P>

        <H2>1. Start by measuring, not guessing</H2>
        <P>
            Before changing anything, write down what the model is today. You need five facts: how many
            modules, line items and lists it has; which modules carry the most dimensions; which line
            items have long formulas; what is used by an App page, saved view or action; and how much of
            the workspace allowance it takes. Without this baseline you cannot tell later whether you
            improved anything.
        </P>
        <UL>
            <li>The <strong>Model Summary</strong> in Anaplan Toolkit gives the counts and, with <em>Get all data</em>, loads every report so you can export the lot as one zip for the release record.</li>
            <li><strong>Modules</strong> lists every module with its dimensions, time scale, time range, line item and saved view counts, and the App pages that use it.</li>
            <li><strong>Workspace Models &amp; Storage</strong> shows the model against the workspace&apos;s in-use versus allowance meter.</li>
        </UL>
        <Callout title="Keep the baseline">
            File the exported zip with the date. Next month&apos;s run is only useful if you can compare it
            with this one.
        </Callout>

        <H2>2. Fix structure first</H2>
        <P>
            Structure is where the biggest, longest-lasting gains are, because everything else (formulas,
            pages, imports) sits on top of it. Look for these patterns:
        </P>
        <H3>Modules that are doing too many jobs</H3>
        <P>
            A module that mixes inputs, calculations and outputs, or mixes line items with different
            dimensionality, is hard to read and usually bigger than it needs to be. Anaplan&apos;s Planual
            recommends separating inputs from calculations and keeping a module&apos;s purpose clear. In the
            Modules report, sort by line item count and open the largest few; they are the usual suspects.
        </P>
        <H3>Dimensions that are not earning their place</H3>
        <P>
            Every dimension multiplies the potential cell count. Ask of each module: does this really need
            Time? Versions? That third list? A module that only holds a single value per product does not
            need a monthly time scale. The Modules report shows each module&apos;s time scale and time range
            beside its dimensions, so these mismatches stand out in one view.
        </P>
        <H3>Line items with the wrong format</H3>
        <P>
            Text and number formats you do not need, and calculations stored as Number where a Boolean
            would do, add weight and confusion. Intermediate calculations that nobody reads can often be
            set to <em>No Data</em> format. The Line Items report lists every line item&apos;s format,
            applies-to, time scale and formula, and you can search across all of it.
        </P>

        <H2>3. Retire what nobody uses</H2>
        <P>
            Unused objects are the cheapest improvement you can make: no design decision, just removal.
            But &ldquo;nobody uses it&rdquo; has to be checked in more than one place. A line item may have no
            formula dependents and still feed an App page, a saved view, an import, an export or a
            process.
        </P>
        <OL>
            <li>Run <strong>Impact</strong> to list line items that no other formula uses.</li>
            <li>Cross-check them with <strong>Line Items on Pages</strong>, <strong>All Saved Views</strong> and <strong>Action Usages</strong>, because Impact reads formulas only.</li>
            <li>Check <strong>Process Steps</strong> for imports and exports that touch the module.</li>
            <li>Check with the owners of any upstream or downstream model that imports from it.</li>
            <li>Delete in a dev model first, then promote the change through your normal release path.</li>
        </OL>
        <P>
            Deleting by hand in Blueprint is slow and Anaplan refuses a line item that something else still
            uses. <strong>Delete Line Items</strong> and <strong>Delete Modules</strong> take a CSV (the
            Line Items or Modules export works as is), check every row against the live model, order the
            deletes so Anaplan accepts them, and ask you to type the count before anything changes. They
            are the only views in the Toolkit that write to your model, so treat them as a named-person
            task, and keep the run log with your change record.
        </P>

        <H2>4. Make formulas readable</H2>
        <P>
            A formula is read many more times than it is written. Slow, deeply nested or duplicated
            formulas make every future change riskier.
        </P>
        <UL>
            <li><strong>Search for repetition.</strong> The <strong>Formulas</strong> view searches every formula by words, an exact phrase or a regular expression. A phrase that appears in thirty line items is a candidate for a single helper line item.</li>
            <li><strong>Run Lint.</strong> It checks the model against Anaplan&apos;s Planual and shows each finding with the rule&apos;s own number, linked to its page. The same per-line-item checks underline the offending part of a formula in the editor and add a badge in Blueprint view, so you see them while you build.</li>
            <li><strong>Break up long chains.</strong> Where a formula nests many IFs, move the logic into a mapping or lookup module or into small, named steps.</li>
            <li><strong>Use the editor hover.</strong> Hovering a reference shows its format, dimensions and formula, plus <em>Used by</em> and <em>Depends on</em>, which makes reviews faster.</li>
        </UL>
        <Callout title="Lint is a prompt, not a verdict">
            The Toolkit&apos;s checks approximate the Planual rules and target the Classic engine. Use them
            to decide where a human should look, not to approve or reject a change.
        </Callout>

        <H2>5. Understand how the model is used</H2>
        <P>
            A model that is structurally clean can still be badly used. Look at the front end too:
        </P>
        <UL>
            <li><strong>Linked Pages</strong> shows which Apps and Pages consume each module. A module with no page, no import and no export is a candidate for review.</li>
            <li><strong>Filters &amp; Conditional Formatting</strong> lists line items used as filters or formatting rules beside their conditions. Rules on line items hidden from the grid are tagged, so you can tidy them.</li>
            <li><strong>Saved Views in Screens</strong> shows which saved view each page widget reads from, which helps you spot dozens of near-identical views.</li>
            <li><strong>Lock Monitor</strong> records when the model is busy, updating or locked, with what is running. If users complain about slowness, this tells you when it happens and which job was running.</li>
        </UL>
        <P>
            Pair the reports with a short conversation with your users. The data tells you what exists;
            only people can tell you what they wish they did not have to click through.
        </P>

        <H2>6. Document as you go</H2>
        <P>
            Documentation that is written once goes stale. Generate it instead. From the Summary view the
            Toolkit writes the model&apos;s lists, modules, line items and formulas as a Markdown file, and
            can copy a compact version to paste into an AI assistant. Nothing is uploaded by the extension;
            where you paste it is your decision, so follow your organisation&apos;s data rules.
        </P>

        <H2>7. Make it a monthly habit</H2>
        <P>
            One clean-up helps for a quarter. A routine keeps it that way. A simple health check for each
            production model, monthly and before every major release:
        </P>
        <OL>
            <li>Model Summary, then <em>Get all data</em> and download the zip.</li>
            <li>Line Items and Lint for the Planual findings.</li>
            <li>Action Usages and Process Steps for orphaned or duplicated actions.</li>
            <li>Saved Views in Actions and Screens for views that are no longer wired to anything.</li>
            <li>Workspace Models &amp; Storage to watch the trend.</li>
        </OL>
        <P>
            Give each model a named owner, keep the zip with the release record and compare it with last
            month&apos;s. Agree two or three numbers to move (unused line items, Lint findings, model size)
            and review them in the same meeting every time.
        </P>

        <H2>Where to go next</H2>
        <P>
            If your clean-up is driven by a size or storage limit, read{" "}
            <Link href="/anaplan/guides/reduce-anaplan-model-size" className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">How to reduce the size of an Anaplan model</Link>.
            For the checks above, the <Code>Lint</Code> and <Code>Impact</Code> reports are the best place
            to start.
        </P>
    </Article>
);

export default AnaplanImproveModel;
