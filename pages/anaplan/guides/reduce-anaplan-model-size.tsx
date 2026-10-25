import Link from "next/link";
import Article, { Callout, H2, H3, OL, P, UL } from "@/components/anaplan/Article";

const AnaplanReduceSize = () => (
    <Article
        slug="reduce-anaplan-model-size"
        kicker="Guide"
        title="How to reduce the size of an Anaplan model"
        desc="Where model size comes from, how to find the modules and line items that cost the most, and how to remove them safely."
        published="2026-10-25"
        readMinutes={9}
    >
        <P>
            A model that has grown too large is slower to open, slower to calculate and eats into the
            workspace allowance that every other model shares. The good news is that model size is rarely
            spread evenly. A handful of modules usually account for most of it, so a short, targeted
            clean-up often frees more than a broad one.
        </P>

        <H2>What makes a model big</H2>
        <P>
            Anaplan stores cells, and the number of cells a module can hold is the product of its
            dimensions. A module applied to 5,000 products, 200 customers and 36 months has a potential
            size of 36 million cells for <em>each line item</em>. Four things drive the total:
        </P>
        <UL>
            <li><strong>Dimensionality</strong>: how many lists, and how large, a module is applied to.</li>
            <li><strong>Time and Versions</strong>: a time scale and range multiply every other dimension, as does each version.</li>
            <li><strong>Line item count</strong>: every line item repeats the module&apos;s dimensions unless it has its own applies-to.</li>
            <li><strong>Data actually stored</strong>: Anaplan holds populated cells, so sparse modules cost less than dense ones, but the structure still has to be calculated and carried.</li>
        </UL>
        <Callout title="Measure the right thing">
            The Toolkit reports structure (dimensions, time scale and range, line items, formulas, usage)
            and the size of each model in the workspace. It does not report a per-module cell count, so
            for that use the figures in Anaplan&apos;s own Model Settings and compare them with the
            structure reports below.
        </Callout>

        <H2>Step 1: See where the size is</H2>
        <OL>
            <li>Open <strong>Workspace Models &amp; Storage</strong>. It lists active, archived and deleted models with their sizes under an in-use versus allowance meter. &ldquo;In use&rdquo; is the sum of non-archived models, which is the figure Anaplan&apos;s Model Management dialog shows. Archived and deleted models do not count toward it.</li>
            <li>For workspaces you can access, <strong>All Workspaces</strong> shows storage for each workspace and every active model across them, so you can see whether the real problem is this model or a forgotten copy.</li>
            <li>Within the model, open <strong>Modules</strong>, which shows each module&apos;s dimensions, time scale and time range, and line item count. Sort by line item count, then look for modules with many dimensions and a fine time scale.</li>
            <li>Take the largest modules from Anaplan&apos;s Model Settings and work through them one at a time.</li>
        </OL>

        <H2>Step 2: Remove what is not needed</H2>
        <H3>Whole models first</H3>
        <P>
            Old test copies, dev snapshots and abandoned prototypes are the fastest win. Archive or delete
            models nobody has opened for months. Because archived models do not count toward the
            allowance, archiving is also the safe, reversible option while you check with owners.
        </P>
        <H3>Unused line items and modules</H3>
        <P>
            Use <strong>Impact</strong> to find line items that no formula uses, then confirm that no page,
            saved view, import, export or process needs them (see <strong>Line Items on Pages</strong>,{" "}
            <strong>Action Usages</strong> and <strong>All Saved Views</strong>). Impact reads formulas
            only, so do not skip that cross-check. A module whose every line item is unused can be
            deleted whole.
        </P>
        <P>
            When the list is long, <strong>Delete Line Items</strong> and <strong>Delete Modules</strong>{" "}
            do the removal from a CSV: each row is checked against the live model, deletes are ordered
            so Anaplan accepts them, and nothing happens until you type the count. They write to the
            model, so run them in a dev model first, and keep the run log with the change record. Reload
            the Anaplan tab afterwards, because its own cache is stale until you do.
        </P>
        <H3>Unused list items</H3>
        <P>
            Lists that keep every item ever created (old employees, discontinued products, closed
            projects) multiply the size of every module that uses them. Archive or remove items that are
            no longer needed, ideally through a scheduled import that drives the list from the source
            system. The Lists &amp; Properties report shows each list&apos;s item count, so start with the
            biggest.
        </P>

        <H2>Step 3: Right-size what is left</H2>
        <H3>Cut dimensions</H3>
        <P>
            For each large module, ask whether every dimension is needed on every line item. Splitting a
            module so that line items with fewer dimensions live in their own module (or are applied to
            fewer lists) removes cells without removing information. Sparse combinations, such as product
            by customer where each customer buys a few products, are often better held as a smaller
            intersection list than as a full cross product.
        </P>
        <H3>Shorten time</H3>
        <P>
            Time is a multiplier. Check each module&apos;s time scale and range: a monthly scale where
            quarterly would do, or a range that still covers years of history nobody reports on, are
            common causes. Where possible, use a time scale and range that match the question the module
            answers, and keep long history somewhere other than the live planning model.
        </P>
        <H3>Use formats deliberately</H3>
        <UL>
            <li>Set intermediate calculations nobody reads to <em>No Data</em> format.</li>
            <li>Avoid Text where a list, Boolean or Number would do.</li>
            <li>Turn off summary methods that nothing consumes, particularly on modules with large lists.</li>
        </UL>
        <H3>Reduce repeated calculation</H3>
        <P>
            The same formula in thirty places is thirty copies of the same work and storage. Use{" "}
            <strong>Formulas</strong> to search for repeated expressions, and replace them with one helper
            line item that the others reference.
        </P>

        <H2>Step 4: Check and keep it down</H2>
        <OL>
            <li>Re-run Workspace Models &amp; Storage after each batch of changes and note the figure.</li>
            <li>Re-run Modules and Impact and compare with your baseline.</li>
            <li>Test the model&apos;s key processes and pages, then promote the change.</li>
            <li>Add the checks to a monthly review, so size is watched instead of discovered.</li>
        </OL>
        <Callout title="Go in small steps">
            Delete in batches and look at the size after each. If a change has no visible effect, you have
            learned that module was not the problem, and have not lost anything to find that out.
        </Callout>

        <H2>A short checklist</H2>
        <UL>
            <li>Archive or delete forgotten models in the workspace.</li>
            <li>Find the five largest modules and review their dimensions, time scale and range.</li>
            <li>Remove line items and modules that nothing uses, after checking pages, views and actions.</li>
            <li>Trim lists to the items you still need.</li>
            <li>Replace repeated formulas with a shared line item.</li>
            <li>Record the size before and after.</li>
        </UL>

        <P>
            For the wider routine this fits into, read{" "}
            <Link href="/anaplan/guides/improve-anaplan-model-and-usage" className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">How to improve an Anaplan model and how your team uses it</Link>.
        </P>
    </Article>
);

export default AnaplanReduceSize;
