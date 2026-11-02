# Project Context

## What this project is

A mock asset management app (Fixed Deposits + Mutual Funds, two roles:
Client and Asset Manager) built with Create React App, modeled loosely on
a real prior/current employer project (Intellect Design Arena). It has no
real backend — data is mocked and persisted via `localStorage`.

## What it's actually for

The user is an experienced **Angular developer** learning **React and
JavaScript from scratch**, using this codebase as a hands-on study project,
with an eye toward job interviews. Every feature built here doubles as a
teaching example. Treat any request to "study X" or a pasted interview
question as a request to (1) build/find a real, working example of that
concept in this codebase, and (2) document it in `LEARNING_NOTES.md` (see
[documentation-standards.md](documentation-standards.md)) — never treat this
as a normal production app where features exist only to ship.

Angular terms are fine to use as-is when explaining React concepts — that
side is already familiar. It's the React/JS side that needs the beginner
treatment: plain English, no unexplained jargon, short sentences.

## File extensions for new code

Use TypeScript for new code going forward: `.tsx` for React components and
other files containing JSX, and `.ts` for logic, services, types, or Hooks
without JSX. Keep learning examples small and types easy to understand.
Existing `.js` and `.jsx` files can remain until a migration is requested
or needed for the task; this convention does not require a bulk rename.
TypeScript adoption includes configuring and running type checks, not just
changing extensions. Do not claim successful bundling proves type safety.

## Keep React ecosystem info current

Before stating a React/library version number or a claim like "X is now the
recommended tool," verify it (web search) rather than relying on stale
training data — this repo is meant to reflect the actual current state of
the React ecosystem, not a frozen snapshot. Note: there is no "ReactJS vs
React" split the way there's an AngularJS-vs-Angular split — they're the
same library, just older/newer versions.

## Verifying changes

After any code change, actually run it — `npm start`, hit the relevant
route(s) with a quick check, confirm it compiles cleanly, then stop the dev
server. Don't declare something working without having verified it.
