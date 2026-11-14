import Link from "next/link";
import React from "react";
import { Callout, Code, H2, H3, OL, P, UL } from "@/components/anaplan/Article";
import { BarChart, CellGrid, CodeBlock, ColumnCompare, Donut, Figure, Flow, HubSpoke, LineChart } from "@/components/anaplan/Viz";

// Article bodies for the guides rendered by pages/anaplan/guides/[slug].tsx.
// Titles, descriptions and dates live in data/anaplan/guides.ts.

const A = ({ slug, children }: { slug: string; children: React.ReactNode }) => (
    <Link href={`/anaplan/guides/${slug}`} className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700">
        {children}
    </Link>
);

const B = ({ children }: { children: React.ReactNode }) => <strong>{children}</strong>;

const ILLUSTRATIVE = "Example figures to show the method, not measurements from a real model.";

// ---------------------------------------------------------------------------
// 1. DISCO
// ---------------------------------------------------------------------------
const Disco = () => (
    <>
        <P>
            Ask ten Anaplan builders how to structure a model and you will hear a lot about DISCO. It is
            the simplest rule of thumb in the Planual tradition: give every module a single job, and let
            data flow one way through five layers. Models that follow it are easier to hand over, easier
            to test and usually faster.
        </P>

        <H2>The five layers</H2>
        <Figure title="DISCO: one direction, five jobs" caption="Data moves left to right. Nothing in a later layer should feed back into an earlier one.">
            <Flow
                highlight={3}
                steps={[
                    { title: "Data", sub: "Raw and cleansed source data, often in a data hub" },
                    { title: "Inputs", sub: "What planners type in or approve" },
                    { title: "System", sub: "Mappings, time, switches and settings" },
                    { title: "Calculations", sub: "The logic, in small purposeful modules" },
                    { title: "Outputs", sub: "Reports and pages people read" },
                ]}
            />
        </Figure>
        <UL>
            <li><B>Data</B> holds imported data in the shape the source gave it. It is not edited by planners. See <A slug="anaplan-data-hub">Anaplan data hub</A> for when this layer should be its own model.</li>
            <li><B>Inputs</B> are for assumptions and decisions entered by users. Keep them apart from calculations so you can see, and protect, what people are allowed to change.</li>
            <li><B>System</B> modules hold mappings, switches, time settings and other plumbing. They are small, stable and shared.</li>
            <li><B>Calculations</B> is where the logic lives. Each module should do one thing and be named for it.</li>
            <li><B>Outputs</B> shape results for readers and App pages. They read from calculations and never calculate much themselves.</li>
        </UL>

        <H2>Why it helps</H2>
        <H3>Faster reviews and safer changes</H3>
        <P>
            When inputs, logic and reports are mixed, a change to one needs you to understand all three.
            With DISCO you can answer &ldquo;what can a planner edit?&rdquo; by opening one set of modules, and
            &ldquo;what feeds this report?&rdquo; by following arrows in one direction.
        </P>
        <H3>Less waste</H3>
        <P>
            Output modules are shaped for people, often with many columns and pages, while calculations
            are best at the lowest grain they need. Keeping them separate stops report layout decisions
            from inflating the cells your logic carries. The arithmetic is in{" "}
            <A slug="anaplan-sparsity-and-dimensionality">Anaplan sparsity and dimensionality</A>.
        </P>

        <H2>How to spot a model that has drifted</H2>
        <OL>
            <li>Open the largest modules by line item count. A module holding inputs, logic and report columns together is the usual offender.</li>
            <li>Look for line items in an output module that feed other modules. That is logic hiding in a report.</li>
            <li>Check whether the same mapping is rebuilt in several calculation modules instead of living once in System.</li>
            <li>Ask who may edit each module. If the answer is &ldquo;it depends&rdquo;, inputs and calculations are mixed.</li>
        </OL>
        <P>
            Anaplan Toolkit&apos;s <em>Modules</em> report lists each module with its dimensions and line
            item count, and <em>Impact</em> shows which line items feed which, so the review above takes
            minutes instead of an afternoon in Blueprint.
        </P>
        <Callout title="Not a religion">
            DISCO is a default, not a law. A tiny model may not need five layers. The test is whether
            someone new can find where a number is calculated without asking you.
        </Callout>
    </>
);

// ---------------------------------------------------------------------------
// 2. Sparsity and dimensionality
// ---------------------------------------------------------------------------
const Sparsity = () => (
    <>
        <P>
            People talk about Anaplan model size in terms of modules and line items. The number that
            actually drives memory and calculation time is the number of <em>cells</em>, and cells come
            from dimensions. Adding one more list to a line item does not add a little. It multiplies.
        </P>

        <H2>The arithmetic</H2>
        <P>
            A line item can hold a cell for every combination of the lists it applies to. Take 500
            products, 2,000 customers, 36 months and 3 versions:
        </P>
        <Figure
            title="Cells one line item can hold as dimensions are added"
            caption="500 × 2,000 = 1,000,000. × 36 = 36,000,000. × 3 = 108,000,000. These are possible cells; how many are populated is the sparsity question below."
        >
            <BarChart
                highlight={3}
                data={[
                    { label: "Products", value: 500 },
                    { label: "Products × Customers", value: 1_000_000 },
                    { label: "… × 36 months", value: 36_000_000 },
                    { label: "… × 3 versions", value: 108_000_000 },
                ]}
            />
        </Figure>
        <P>
            Each line item in that module pays this cost, so a module with twenty such line items carries
            twenty times as many.
        </P>

        <H2>Dense versus sparse</H2>
        <P>
            A module is <em>dense</em> when most possible cells hold data and <em>sparse</em> when most are
            empty. Customers rarely buy every product, so a Product × Customer module is usually mostly
            blank. Anaplan stores and calculates what is populated, but sparse structures still cost more
            than a tighter design would, and they are harder to reason about.
        </P>
        <Figure title="The same shape, two very different workloads" caption="Illustration only: each square is a possible cell, red squares hold data.">
            <div className="grid grid-cols-2 gap-6">
                <CellGrid label="Dense: every cell used" every={1} />
                <CellGrid label="Sparse: about one in nine used" every={9} />
            </div>
        </Figure>

        <H2>Ways to shrink it</H2>
        <UL>
            <li><B>Question each dimension.</B> Does this module really need Time? Versions? A value that is the same every month can live in a module without a time scale.</li>
            <li><B>Split by grain.</B> Calculate at the level you need, then bring results to the detailed level only where required.</li>
            <li><B>Use subsets.</B> If only 400 of 5,000 customers are active, calculate over the 400. See <A slug="anaplan-lists-subsets-and-liss">lists, subsets and LISS</A>.</li>
            <li><B>Use No Data format</B> for intermediate calculations nobody reads, where it is suitable.</li>
            <li><B>Delete what nothing uses.</B> Unused line items still occupy cells. <A slug="reduce-anaplan-model-size">How to reduce the size of an Anaplan model</A> walks through finding and removing them safely.</li>
        </UL>
        <P>
            In Anaplan Toolkit the <em>Modules</em> report shows each module&apos;s dimensions, time scale and
            time range next to its line item count. Sort by line items and read down the dimension column:
            mismatches stand out quickly.
        </P>
        <Callout title="Measure first">
            Cell counts are a guide to where to look, not a verdict. Always check the effect of a change
            on model size and calculation time before and after.
        </Callout>
    </>
);

// ---------------------------------------------------------------------------
// 3. Formula performance
// ---------------------------------------------------------------------------
const FormulaPerformance = () => (
    <>
        <P>
            A slow model is rarely slow everywhere. A handful of line items usually account for most of
            the calculation time, and finding them is half the work. The other half is knowing which
            formula patterns tend to be expensive, so you fix the cause instead of rewriting at random.
        </P>

        <H2>Step 1: find the expensive line items</H2>
        <UL>
            <li>In Blueprint, show the <em>Calculation Effort</em> column to see which line items Anaplan rates as costly to calculate.</li>
            <li>Use Anaplan&apos;s model analysis tools if your tenant has them, and compare timings from a recalculation you can repeat.</li>
            <li>Sort line items by dimensionality too: an average formula on a huge grid usually costs more than a complex one on a small grid. See <A slug="anaplan-sparsity-and-dimensionality">sparsity and dimensionality</A>.</li>
        </UL>
        <P>
            Optimising a line item that already calculates quickly gains almost nothing. Pick the top few
            and start there.
        </P>

        <H2>Step 2: look for these patterns</H2>
        <UL>
            <li><B>Long chains of SUM and LOOKUP</B> over large lists, especially when the same lookup is repeated in several line items. Calculate it once in a helper line item and reuse it.</li>
            <li><B>Deeply nested IFs.</B> Move the logic into a mapping or lookup module, or into small named steps. They are faster to read and usually cheaper to run.</li>
            <li><B>Text built across big dimensions.</B> Concatenating text for every cell is costly. Do it only where a person needs to read it.</li>
            <li><B>Calculations at too fine a grain.</B> If a result only varies by Product, do not calculate it by Product × Customer × Month.</li>
            <li><B>Formulas that could be Boolean tests.</B> A true or false flag often replaces a nested condition and is easier to audit.</li>
            <li><B>Copy and paste with small changes.</B> Search for repeated phrases across every formula and replace the repetition with one shared line item.</li>
        </UL>

        <H2>Step 3: change one thing, then measure</H2>
        <Figure title="A change worth keeping shows up in the numbers" caption={ILLUSTRATIVE + " Record before and after for the same action on the same data."}>
            <ColumnCompare
                beforeLabel="Before"
                afterLabel="After"
                unit="s"
                groups={[
                    { label: "Forecast calc", before: 42, after: 18 },
                    { label: "Allocation", before: 27, after: 21 },
                    { label: "Roll-up", before: 15, after: 14 },
                ]}
            />
        </Figure>
        <OL>
            <li>Pick one action you can repeat, such as a process or an import that triggers a recalculation.</li>
            <li>Record how long it takes now, with the model otherwise idle.</li>
            <li>Change a single line item or module. Never several at once.</li>
            <li>Record again. Keep the change only if it helped and the results are identical.</li>
        </OL>
        <P>
            Anaplan Toolkit helps on both ends. <em>Formulas</em> searches every formula by words, an
            exact phrase or a regular expression to find repetition, <em>Lint</em> flags patterns that
            conflict with Planual guidance, and <em>Lock Monitor</em> tells you whether the model was busy
            while you were timing, which would spoil the comparison.
        </P>
        <Callout title="Check results, not just speed">
            A faster formula that returns different numbers is a bug. Compare outputs before and after
            on the same data before you promote a change.
        </Callout>
    </>
);

// ---------------------------------------------------------------------------
// 4. Data hub
// ---------------------------------------------------------------------------
const DataHub = () => (
    <>
        <P>
            A data hub is a separate Anaplan model that receives data from your source systems, cleans it
            and passes only what each planning model needs. It is not required for every project, but
            once several models read the same data it usually pays for itself.
        </P>

        <H2>The picture</H2>
        <Figure title="One place for data, many lean planning models" caption="Source systems load the hub once. Each planning model takes only the slice it needs.">
            <HubSpoke
                centre="Data hub"
                inbound={["ERP", "HR system", "CRM"]}
                spokes={["Sales plan", "Workforce plan", "Finance plan", "Supply plan", "Reporting"]}
            />
        </Figure>

        <H2>When a hub is worth it</H2>
        <UL>
            <li>More than one model needs the same data, so you would otherwise build and maintain several integrations.</li>
            <li>Source data needs cleansing, mapping or validation before planners should see it.</li>
            <li>Transactional history is large, and you do not want it taking space in every planning model.</li>
            <li>You want one place to answer &ldquo;where did this number come from?&rdquo;.</li>
        </UL>
        <P>
            For a single model with one small feed, a hub adds a hop to maintain. Start without one and
            move to it when the second consumer arrives.
        </P>

        <H2>What belongs inside</H2>
        <UL>
            <li><B>Lists and hierarchies</B> as they arrive, with the mappings that turn them into the planning model&apos;s own structures.</li>
            <li><B>Transaction and actuals data</B> in a form that can be sliced by period and entity.</li>
            <li><B>Validation modules</B> that flag unmapped or missing items before data moves on.</li>
            <li><B>Export or import actions</B> for each spoke, named for what they feed.</li>
        </UL>
        <P>
            What does not belong: planner inputs, forecasting logic and reports. That is the rest of{" "}
            <A slug="anaplan-disco-model-architecture">DISCO</A>, and it lives in the spokes.
        </P>

        <H2>Mistakes to avoid</H2>
        <OL>
            <li><B>Copying everything to every spoke.</B> Filter at the hub so each model receives only what it uses.</li>
            <li><B>Hiding logic in the hub.</B> Business calculations belong in planning models where owners can see them.</li>
            <li><B>Unnamed actions.</B> A hub accumulates dozens of imports and exports. Name each for source and target.</li>
            <li><B>No owner.</B> A hub shared by many teams needs one named person for changes.</li>
        </OL>
        <P>
            Anaplan Toolkit&apos;s <em>Actions &amp; File IDs</em> and <em>Process Steps</em> reports list
            every import, export and process with its ID and the actions inside each process, which is
            the quickest way to document and review a hub&apos;s plumbing. The IDs are what you need to
            drive the hub from a scheduler; see{" "}
            <A slug="anaplan-api-action-ids-and-process-ids">finding action and process IDs</A>.
        </P>
    </>
);

// ---------------------------------------------------------------------------
// 5. API IDs
// ---------------------------------------------------------------------------
const ApiIds = () => (
    <>
        <P>
            To run an Anaplan process from a script or scheduler you need the right IDs in the right URL.
            None of them are shown in the main modelling screens, which is why people end up hunting for
            them in browser tools. Here is what you need and where it lives.
        </P>

        <H2>The IDs an Integration API call uses</H2>
        <Figure title="From a name you recognise to an ID the API accepts" caption="Anaplan calls resolve a workspace, a model and then one object inside it.">
            <Flow
                steps={[
                    { title: "Workspace ID", sub: "Which workspace" },
                    { title: "Model ID", sub: "Which model in it" },
                    { title: "Action ID", sub: "Process, import, export or other action" },
                    { title: "File ID", sub: "Only for imports and exports that use a file" },
                ]}
            />
        </Figure>
        <UL>
            <li><B>Workspace ID and model ID</B> identify where the model lives. The Model Summary in Anaplan Toolkit shows them for the model you have open.</li>
            <li><B>Process, import, export and action IDs</B> identify what to run. <em>Actions &amp; File IDs</em> lists every one with a one-click copy, searchable by name.</li>
            <li><B>File IDs</B> identify the file an import reads or an export writes, which you need when you upload or download data around a run.</li>
        </UL>

        <H2>Running a process</H2>
        <P>
            With the IDs and a valid token, a process is started by a POST to its <Code>tasks</Code>{" "}
            endpoint. The shape, with placeholders, looks like this:
        </P>
        <CodeBlock>{`curl -X POST \\
  "https://api.anaplan.com/2/0/workspaces/$WORKSPACE_ID/models/$MODEL_ID/processes/$PROCESS_ID/tasks" \\
  -H "Authorization: AnaplanAuthToken $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"localeName": "en_US"}'`}</CodeBlock>
        <P>
            Imports, exports and other actions follow the same pattern with <Code>imports</Code>,{" "}
            <Code>exports</Code> or <Code>actions</Code> in place of <Code>processes</Code>. The response
            includes a task ID; request that task to see whether the run succeeded.
        </P>
        <Callout title="Tokens stay with you">
            Anaplan Toolkit never asks for a password or token. Its <em>Copy API call</em> button in
            Process Steps builds the URL with the right IDs and leaves the token for you to supply in your
            own shell. If you use OAuth, the header is a bearer token instead; check Anaplan&apos;s API
            documentation for your authentication method.
        </Callout>

        <H2>A tidy workflow</H2>
        <OL>
            <li>Open the model and the Toolkit panel, then choose <em>Actions &amp; File IDs</em>.</li>
            <li>Search for the process by name and copy its ID.</li>
            <li>Open <em>Process Steps</em> to confirm the order of the actions inside it.</li>
            <li>Check <em>Lock Monitor</em> if you plan to trigger the run on a schedule, so you know when the model is usually free.</li>
            <li>Store IDs in your scheduler&apos;s configuration, not in the script, so a model copy can be pointed at without code changes.</li>
        </OL>
        <P>
            IDs change when a model is copied, so scripts that target a production model need its own set.
            That matters for releases too; see <A slug="anaplan-alm-revision-tags">ALM and revision tags</A>.
        </P>
    </>
);

// ---------------------------------------------------------------------------
// 6. Planual
// ---------------------------------------------------------------------------
const Planual = () => (
    <>
        <P>
            Anaplan&apos;s Planual is the closest thing the community has to a style guide for model
            building. It is also long. Few teams read it end to end before every review, which is why a
            short, shared checklist built from it is more useful than the document itself.
        </P>

        <H2>Turn it into a checklist</H2>
        <P>Group the guidance into the questions a reviewer actually asks:</P>
        <UL>
            <li><B>Structure.</B> Does each module have one purpose, with inputs, logic and outputs apart? See <A slug="anaplan-disco-model-architecture">DISCO</A>.</li>
            <li><B>Dimensions.</B> Does every module need every list and time scale it carries? See <A slug="anaplan-sparsity-and-dimensionality">sparsity and dimensionality</A>.</li>
            <li><B>Formulas.</B> Are they short, readable and free of repetition? See <A slug="anaplan-formula-performance">formula performance</A>.</li>
            <li><B>Naming and layout.</B> Could a new builder find a line item from its name?</li>
            <li><B>Housekeeping.</B> Are there unused line items, lists or modules that should go?</li>
        </UL>

        <H2>What an audit can look like</H2>
        <Figure title="Example: findings by theme in a model review" caption={ILLUSTRATIVE + " Where findings cluster tells you what to fix first."}>
            <Donut
                centre="100 findings"
                data={[
                    { label: "Formula complexity", value: 34 },
                    { label: "Unused items", value: 28 },
                    { label: "Dimensionality", value: 18 },
                    { label: "Naming and layout", value: 12 },
                    { label: "Other", value: 8 },
                ]}
            />
        </Figure>

        <H2>Automated checks help, with limits</H2>
        <P>
            Anaplan Toolkit&apos;s <em>Lint</em> report checks the model against Planual guidance and shows
            each finding with the rule&apos;s own number, linked to its page. The same per-line-item checks
            underline the offending part of a formula in the editor and add a badge in Blueprint view, so
            you see them as you build. A <em>Housekeeping</em> tab covers unused line items and lists.
        </P>
        <Callout title="Prompts, not verdicts">
            The checks approximate the rules and target the Classic engine. A finding says &ldquo;look
            here&rdquo;. A person decides whether the rule applies, and some good designs break a rule on
            purpose and say why in a comment.
        </Callout>

        <H2>Where to use the checklist</H2>
        <OL>
            <li><B>Before a release.</B> Run Lint on the development model and clear or explain the findings, then promote. See <A slug="anaplan-alm-revision-tags">ALM and revision tags</A>.</li>
            <li><B>At handover.</B> Attach the findings list and the model document so the next owner starts informed. See <A slug="anaplan-model-documentation">model documentation</A>.</li>
            <li><B>Monthly.</B> Track two or three numbers, such as findings and unused line items, and discuss them in the same meeting each time. The routine is in <A slug="improve-anaplan-model-and-usage">how to improve an Anaplan model</A>.</li>
        </OL>
    </>
);

// ---------------------------------------------------------------------------
// 7. ALM
// ---------------------------------------------------------------------------
const Alm = () => (
    <>
        <P>
            Application lifecycle management (ALM) is Anaplan&apos;s way of moving structural changes
            between models without rebuilding by hand. Its main point is discipline: build in one place,
            test in another and let production change only through a controlled step.
        </P>

        <H2>The usual path</H2>
        <Figure title="Development to production, one tag at a time" caption="A revision tag is a saved snapshot of the structure of the source model. Target models sync to a tag.">
            <Flow
                highlight={2}
                steps={[
                    { title: "Development", sub: "Builders change structure here" },
                    { title: "Revision tag", sub: "Snapshot of the structure with a clear note" },
                    { title: "Test", sub: "Sync, check results and run users through it" },
                    { title: "Production", sub: "Sync the same tag once approved" },
                ]}
            />
        </Figure>
        <UL>
            <li><B>Structural changes</B> (modules, line items, lists, formulas) are made in development and travel with a revision tag.</li>
            <li><B>A production model</B> is protected from direct structural edits, so what runs is what was tested.</li>
            <li><B>Data and some settings</B> are handled differently from structure. Check Anaplan&apos;s documentation for what a sync moves and what it leaves alone before you rely on it.</li>
        </UL>

        <H2>Habits that keep releases boring</H2>
        <OL>
            <li><B>Tag small and often.</B> One theme per tag with a note anyone can read. A tag called &ldquo;fixes&rdquo; is no use six months later.</li>
            <li><B>Review before tagging.</B> Run Lint and check for unused items so you do not promote clutter. See <A slug="anaplan-planual-best-practices">Planual in practice</A>.</li>
            <li><B>Test with real volumes.</B> A change that is fast on a small dev model may not be at production scale.</li>
            <li><B>Pick a quiet moment.</B> Syncing while a large import runs invites trouble. Lock Monitor shows when the model is usually free.</li>
            <li><B>Keep a record.</B> Who tagged, what changed, when it reached each model, who approved.</li>
        </OL>

        <H2>Seeing the history</H2>
        <P>
            Anaplan Toolkit&apos;s <em>Revision Tags</em> report shows who created each revision tag, when
            and where, and every model it was applied to. That gives you a release log without asking
            around, and makes it easy to answer &ldquo;is test on the same tag as production?&rdquo;.
        </P>
        <Callout title="IDs follow the model">
            Imports, exports and processes keep their names across models but get different IDs in each
            copy. Scripts that call the API for production need the production IDs. See{" "}
            <A slug="anaplan-api-action-ids-and-process-ids">finding action and process IDs</A>.
        </Callout>
    </>
);

// ---------------------------------------------------------------------------
// 8. Documentation
// ---------------------------------------------------------------------------
const Documentation = () => (
    <>
        <P>
            Every model has documentation. In most teams it is a slide deck from the original project and
            a few people&apos;s memories. Neither helps the builder who inherits the model at 4pm on a
            Friday. A useful model document is short, factual and recent.
        </P>

        <H2>What goes in it</H2>
        <H3>The factual part: generate it</H3>
        <UL>
            <li>Lists, with parents and item counts.</li>
            <li>Modules, with their dimensions and what each is for.</li>
            <li>Line items, with formats and formulas.</li>
            <li>Which actions, imports, exports and processes exist, and in what order a process runs them.</li>
            <li>Which App pages read which modules.</li>
        </UL>
        <P>
            This is exactly what goes out of date. Nobody remembers to edit a document after every change,
            so produce it from the model.
        </P>
        <H3>The judgement part: write it</H3>
        <UL>
            <li>Why the model is shaped the way it is, including the decisions you rejected.</li>
            <li>Who owns it, who approves changes and where releases are recorded. See <A slug="anaplan-alm-revision-tags">ALM and revision tags</A>.</li>
            <li>Known limits, such as slow actions or rules you broke on purpose.</li>
            <li>Where data comes from and when it refreshes. See <A slug="anaplan-data-hub">data hub</A>.</li>
        </UL>

        <H2>Why generated beats hand-written</H2>
        <Figure title="How much of a document still matches the model" caption="Illustration of the idea, not data from a study: a hand-written document drifts with every change, a regenerated one is current each time it is refreshed.">
            <LineChart
                yLabel="Accuracy of the factual part (%)"
                xLabels={["M0", "M1", "M2", "M3", "M4", "M5", "M6"]}
                series={[
                    { name: "Written once by hand", color: "#9ca3af", points: [100, 88, 76, 64, 52, 44, 36] },
                    { name: "Regenerated monthly", color: "#dc2626", points: [100, 100, 100, 100, 100, 100, 100] },
                ]}
            />
        </Figure>

        <H2>Generate it with Anaplan Toolkit</H2>
        <OL>
            <li>Open the model, open the panel and choose <em>Summary</em>.</li>
            <li>Use <em>Get all data</em> to load every report.</li>
            <li>Write the documentation: a Markdown file with the model&apos;s lists, modules, line items and formulas.</li>
            <li>Or copy a compact version to paste into an AI assistant to ask questions about the model.</li>
        </OL>
        <Callout title="Where you paste is your decision">
            The extension sends nothing anywhere. If you paste a compact version into an AI assistant or a
            wiki, that is outside the extension, so follow your organisation&apos;s rules for model and
            business data.
        </Callout>
        <P>
            Commit the Markdown file next to the release record each time you tag. A diff between two
            months shows exactly what changed, which is more useful than any changelog written from memory.
            The same data export is the baseline in{" "}
            <A slug="improve-anaplan-model-and-usage">how to improve an Anaplan model</A>.
        </P>
    </>
);

// ---------------------------------------------------------------------------
// 9. Excel to Anaplan
// ---------------------------------------------------------------------------
const ExcelToAnaplan = () => (
    <>
        <P>
            The fastest way to build a bad Anaplan model is to copy an Excel workbook sheet by sheet. The
            tools look similar, since both have formulas and tables, but they organise a model in opposite
            ways. Understanding that difference is most of the migration.
        </P>

        <H2>Cells versus line items</H2>
        <P>
            In Excel every cell holds its own formula. In Anaplan you write one formula per{" "}
            <em>line item</em>, and it applies across every combination of the lists and time periods that
            line item uses. Consider a forecast by month, product and region: 12 months × 50 products × 20
            regions.
        </P>
        <Figure title="Formulas you have to write, check and maintain" caption="12 × 50 × 20 = 12,000 cells. Excel formulas can be filled down, but every one is still a separate cell that can be overwritten by accident. In Anaplan the logic is one line item.">
            <BarChart
                highlight={1}
                data={[
                    { label: "Excel: cells holding a formula", value: 12000 },
                    { label: "Anaplan: line item formulas", value: 1 },
                ]}
            />
        </Figure>

        <H2>What changes</H2>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                    <tr>
                        <th className="px-4 py-3 font-medium">Excel</th>
                        <th className="px-4 py-3 font-medium">Anaplan</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                    {[
                        ["A sheet per scenario or region", "One module with Versions and a Region list"],
                        ["Cell references such as B7*C7", "Names: Units * Price"],
                        ["Copy a formula across and down", "Write it once for the whole line item"],
                        ["Inputs and logic share a sheet", "Separate input and calculation modules"],
                        ["Everyone edits the file", "Roles and access decide who changes what"],
                        ["Version history by file name", "Revision tags and model versions"],
                    ].map(([a, b]) => (
                        <tr key={a}>
                            <td className="px-4 py-3">{a}</td>
                            <td className="px-4 py-3">{b}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <H2>A migration route that works</H2>
        <OL>
            <li><B>List the dimensions first.</B> Products, regions, months, versions: these become lists and time. Everything else hangs off them.</li>
            <li><B>Separate inputs from logic.</B> Sort every sheet&apos;s cells into assumptions, calculations and reports. The three become different modules. See <A slug="anaplan-disco-model-architecture">DISCO</A>.</li>
            <li><B>Rewrite, do not translate.</B> Replace cell references with line item names and drop helper columns that existed only because of the grid.</li>
            <li><B>Reconcile against Excel.</B> Match totals at several levels before anyone trusts the new model.</li>
            <li><B>Check size early.</B> A spreadsheet that is small can grow fast once dimensions multiply. See <A slug="anaplan-sparsity-and-dimensionality">sparsity and dimensionality</A>.</li>
        </OL>

        <H2>Traps of a lift-and-shift</H2>
        <UL>
            <li>Rebuilding every sheet as a module with the same layout. The result is large, slow and no easier to maintain.</li>
            <li>Keeping hard-coded numbers inside formulas. In Anaplan they belong in input line items anyone can see.</li>
            <li>Leaving the model undocumented because &ldquo;it is all in the system&rdquo;. See <A slug="anaplan-model-documentation">model documentation</A>.</li>
        </UL>
        <P>
            Once the build is done, Anaplan Toolkit&apos;s <em>Summary</em>, <em>Modules</em> and{" "}
            <em>Line Items</em> reports give you the counts and dimensions to compare against the plan,
            and <em>Lint</em> catches habits carried over from the spreadsheet.
        </P>
    </>
);

// ---------------------------------------------------------------------------
// 10. Lists, subsets, LISS
// ---------------------------------------------------------------------------
const ListsSubsets = () => (
    <>
        <P>
            Lists define what a module can hold. Subsets and line item subsets (LISS) let you work on part
            of a list without copying it. Used well they cut the cells you calculate, and used badly they
            add clutter. The skill is knowing which tool fits.
        </P>

        <H2>A worked example</H2>
        <P>
            You have 5,000 customers, but only 400 are active in the planning period. A module by Customer
            and 36 months can hold 5,000 × 36 = 180,000 cells per line item. Restricted to the 400 active
            customers it holds 400 × 36 = 14,400, or 8% as many.
        </P>
        <Figure title="Cells per line item: full list versus active subset" caption="5,000 × 36 = 180,000. 400 × 36 = 14,400. Every line item in the module saves the same proportion.">
            <ColumnCompare
                beforeLabel="All customers"
                afterLabel="Active subset"
                groups={[{ label: "One line item", before: 180000, after: 14400 }]}
            />
        </Figure>

        <H2>The tools</H2>
        <H3>Lists</H3>
        <P>
            A list holds the items a dimension is made of. Hierarchies use parent and child lists, and
            list properties hold attributes such as a region or a status. Keep lists as small and stable as
            the business allows.
        </P>
        <H3>Subsets</H3>
        <P>
            A subset is a selection of items from one list. Use it when the selection is a stable, named
            group, such as &ldquo;Active customers&rdquo;, and a module can be dimensioned on the subset
            instead of the full list.
        </P>
        <H3>Line item subsets (LISS)</H3>
        <P>
            A line item subset builds a subset from the line items of a module, with the items in the
            order of the line items. It suits cases where a small set of measures is used as a dimension
            in another module, such as reporting on a chosen set of KPIs.
        </P>

        <H2>Choosing between them</H2>
        <UL>
            <li>Same items, always a subset of one list? <B>Subset.</B></li>
            <li>A group of measures from a module used as a dimension elsewhere? <B>LISS.</B></li>
            <li>An attribute that changes how items behave but not which exist? <B>List property</B>, not a subset.</li>
            <li>Items that will never be used together with the rest? Consider a <B>separate list</B>.</li>
        </UL>

        <H2>Cautions</H2>
        <OL>
            <li>Subsets need maintenance. If membership is driven by a flag, someone must own that flag, and imports must keep it current.</li>
            <li>Do not create a subset for every report. Dozens of near-duplicate subsets are as confusing as dozens of near-duplicate saved views.</li>
            <li>Test results against the full-list version once, so you know nothing was lost.</li>
        </OL>
        <P>
            To find where a list is used, Anaplan Toolkit&apos;s <em>Lists &amp; Properties</em> report
            shows each list with its parent and item count, and <em>Modules</em> shows which modules
            use it as a dimension. Both help you judge whether a subset is worth the effort. For the
            bigger picture see <A slug="anaplan-sparsity-and-dimensionality">sparsity and dimensionality</A>{" "}
            and <A slug="reduce-anaplan-model-size">reducing model size</A>.
        </P>
    </>
);

export const bodies: Record<string, () => JSX.Element> = {
    "anaplan-disco-model-architecture": Disco,
    "anaplan-sparsity-and-dimensionality": Sparsity,
    "anaplan-formula-performance": FormulaPerformance,
    "anaplan-data-hub": DataHub,
    "anaplan-api-action-ids-and-process-ids": ApiIds,
    "anaplan-planual-best-practices": Planual,
    "anaplan-alm-revision-tags": Alm,
    "anaplan-model-documentation": Documentation,
    "excel-to-anaplan-migration": ExcelToAnaplan,
    "anaplan-lists-subsets-and-liss": ListsSubsets,
};
