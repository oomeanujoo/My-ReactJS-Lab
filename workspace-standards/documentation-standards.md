# Documentation Standards

## The one documentation file

**`LEARNING_NOTES.md`** at the project root is the single, permanent notes
file. **Never create a second `.md` file** for any reason — not for
"urgent" prep, not for a "temporary" cram sheet, not to keep one topic
separate. Everything goes into `LEARNING_NOTES.md`. If a topic needs fast
lookup, use the "Study Log" table and "Study Path" tree at the top of that
file — don't spin up a new file instead.

The notes file is the study surface. Explanations, examples, diagrams, the
learning order, and interview answers must appear there. Supporting image
assets may live in `assets/diagrams/`, but every one must be embedded in the
relevant `LEARNING_NOTES.md` chapter; never make the user study from a separate
Codex-only visualization or document. Do not use PNG, SVG, or other image files
for study diagrams. Write diagrams directly in `LEARNING_NOTES.md` as clean,
minimal Mermaid shapes and connectors, with short labels and restrained colours.
Use a concise, full-width Markdown flow for simple relationships.
For dark-theme diagrams, use white connector lines and labels. Give each step a
small, consistent colour meaning so the diagram supports memory without becoming
visually noisy.

## Document structure — topic segregation and branching context

Take structural inspiration from these reference sites — never copy their
text or embed their images, only the way they organize and connect topics.
This governs which topics group under which parent and how chapters relate
to each other — it does not prescribe a visual format for the Study Path;
the existing nested `<sub>` tree stays as-is.

- **[roadmap.sh](https://roadmap.sh/)** — every topic sits under exactly one
  parent that it's actually a sub-part of, with a clear required-vs-optional
  distinction (a main trunk vs. side branches for advanced/optional
  material). When adding a chapter, place it under the Part/sub-group it
  genuinely belongs to, not the most recently edited one — check the
  branching still makes logical sense before appending.
- **[GeeksforGeeks](https://www.geeksforgeeks.org/)** — tutorials are staged
  into progressive top-level sections (Basics → Lifecycle/Hooks → State
  Management → Events → Routing → API Integration → Performance → Interview
  Prep → References), each with 2-9 subtopics nested under it. Mirror this
  staged grouping for the **Parts** in `LEARNING_NOTES.md` — every chapter
  belongs to exactly one Part, and Parts run in the order a learner should
  actually study them, not the order topics were added.
- **[Baeldung](https://www.baeldung.com/)** — every article is one focused,
  self-contained guide on a single concept, cross-linked to related guides
  rather than repeating their content. Keep each chapter this focused; link
  to a related chapter instead of re-explaining it.
- **[InterviewBit](https://www.interviewbit.com/java-interview-questions/)**
  — questions are grouped into difficulty tiers (Fresher → Intermediate →
  Experienced), numbered within each tier, answered with prose + bullets +
  code + comparison tables where useful. Arrange the **Interview Question
  Bank** section the same way: one subsection per tier, questions numbered
  within their tier, fundamentals-first ordering.

The Study Path index itself is a plain nested Markdown list — a book-style
table of contents, three levels, top to bottom: numbered **Part** (1st
branch) → sub-topic group (sub-branch, e.g. "Core hooks") → linked chapters
on that sub-topic's line. Use native Markdown list nesting (`-` indented two
spaces per level), and prefix every sub-branch line with a tree connector —
`├─` for a sub-branch with siblings below it, `└─` for the last one under
its Part, `│` continuing a branch line down to a nested sub-branch (e.g. the
Products user manual under Part 8) — so the parent→child relationship is a
visible line, not just indentation. Never `<sub>`, wide ASCII tree art
(`├──`/`└──` with multi-level `&nbsp;` padding), or a `<br>`-per-line
layout — those add visual weight without adding structure; a single `├─`/
`└─` prefix per line is enough. A Part with no natural sub-groups (e.g. Part
7) still gets `├─`/`└─` prefixes directly on its chapter/Planned lines. Any
`*Planned: ...*` note is its own `└─` line at the end of that Part. Update
the relevant line in place whenever a chapter is added or moves, so the
branching stays accurate.

## Every topic in LEARNING_NOTES.md follows this exact shape

1. A plain-English explanation first — no jargon in the opening sentence.
   Short sentences, everyday words. Not a story/narrative — just direct and
   simple.
2. `📁 **Where to look:**` — the exact file(s) in this project that
   demonstrate it. Prefer an existing small, working component when the
   concept is easy to see. If existing code is crowded or mixes unrelated
   concerns, add a small, focused working example instead, following the
   teaching-code rules below.
3. `🔤 **Term:**` — an explicit, clearly labeled one- or two-sentence
   definition of the term itself, with the key word/phrase wrapped in a muted
   `span` highlight (see the notes for the exact style). Highlight only that
   short term or trap phrase; never colour a whole sentence or paragraph.
   This is required for every topic — never skip straight from explanation to
   "say this in an interview" without a labeled definition.
4. `🅰️ **Angular:**` — the closest Angular equivalent or comparison, using
   real Angular terminology.
5. For an actual interview question, include a concise interview answer.
   For ordinary topics and practice, use a short takeaway or action/result
   instead; do not force every topic into interview wording. Include only
   the small code example needed.
6. `🔗 **Related topics:**` — the last line of every chapter and every
   Interview Question Bank entry, linking to the other chapters/questions a
   reader would naturally jump to next (prerequisites, the same concept
   applied elsewhere, or a chapter that builds on this one). 2-5 links,
   Markdown link syntax to a real heading anchor in this same file — verify
   each anchor actually exists (matches a real heading, GitHub-style
   lowercased/hyphenated) before adding it; a broken anchor defeats the
   point. Skip it only when a chapter genuinely has no natural related
   topic yet (rare) rather than forcing a weak link.

Use `⚠️ **The trap:**` / `✅ **The fix:**` callouts for common gotchas, with
only the key phrase wrapped in the same muted highlight. Keep every chapter short
(roughly 10-25 lines) — this book is meant to be scanned fast, not read
like a textbook.

Use normal Markdown headings, paragraphs, and lists so chapter prose uses the
full reading width — don't place explanatory prose or tables used only for
layout inside `<sub>` blocks or other narrow/ASCII-art containers. For a
diagram, use a clear embedded visual with readable labels and a
dark-theme-friendly palette.

## Keep teaching code small and focused

- Define every newly introduced or potentially unfamiliar term in both
  `LEARNING_NOTES.md` and the relevant source file (JS, JSX, TS, TSX, or
  class component). This includes syntax, types, browser APIs, and React
  terms needed to understand the example, not just the main concept.
  Put a short plain-English definition beside its first meaningful use:
  a labeled definition in notes and a brief comment in code. Explain what
  it means and its role here. Reuse existing definitions or cross-links for
  familiar terms; avoid long glossaries or repeated comments that crowd code.
- Make clickable actions visibly look like buttons, with a clear background,
  border, padding, pointer cursor, hover feedback, and visible keyboard focus.
  Use semantic buttons for actions; do not present practice actions as plain
  text. Keep styling simple so it does not obscure the concept being taught.
- Make every runnable learning example reachable from the sidebar. Group
  links by the concept being studied (such as Hooks or API calls), and use
  labels that name the concept and scenario. Add or update the sidebar link
  in the same change as the example, and mention its sidebar location in
  the notes. Keep unfinished or non-rendering examples out of navigation
  until they have a usable screen.
- Apply this to every concept explanation, interview question, and
  scenario-based practice task. The learner should understand the concept
  without reading a lot of unrelated code.
- Reuse an existing component only when it is small and the relevant
  behavior is easy to follow. Merely containing the Hook or concept does
  not make a large component a suitable teaching example.
- Otherwise, create a small, focused component with one clear scenario.
  Include only the logic and UI needed to demonstrate the concept; avoid
  unrelated API calls, Context, styling, abstractions, or extra features.
- Keep examples readable rather than compressing code into fewer lines.
  Introduce additional concepts separately unless their interaction is
  explicitly the topic being studied.
- In chat and notes, show the essential code and explain the action and
  observable result. Link directly to the focused example so the learner
  does not have to search through a crowded file.

## When the user pastes an interview question or asks to study a concept

- Never just explain in chat and stop — build or locate the real code,
  verify it compiles/runs, and document it, per the Study Log workflow
  below.
- Add one row to the **Study Log** table at the top of `LEARNING_NOTES.md`
  (short plain-language topic label, link to the chapter) for every new
  topic covered, in the order studied.
- Write topic explanations, follow-up clarifications, comparisons, and
  practice scenarios in the relevant topic chapter or project user manual.
  Do not automatically turn each studied topic into a question-bank entry.
- Reserve the final **Interview Question Bank** for complete, standalone
  interview questions supplied by the user or explicitly requested for
  interview preparation. Keep answers concise and link to topic chapters
  for tutorials, demo steps, diagrams, and detailed examples. A topic phrased
  as a question is not by itself a reason to add it to the bank.
- Give the full explanation directly in the chat response too — not just a
  pointer to go read the file. Include exact file paths/line references so
  the user can navigate there immediately.

## Communication style

- End every response that touches files with a highlighted list:

  **Files changed:**
  - `path/to/file` — one-clause note (new / edited / deleted)

  Keep it terse — this is a changelog, not a re-explanation.
