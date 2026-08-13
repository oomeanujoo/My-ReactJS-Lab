# React + JS Notes (plain and simple)

Short, simple notes, one small chapter per topic. No jargon leading the
explanation — if a technical word matters, it's named at the very end of
that topic, in one line.

Each topic has 3 short parts:
- **What it is** — plain words, why we use it.
- **Where to look** — the exact file in our project.
- **Term / Angular** — the fancy word (for interviews), and how Angular
  does the same thing, since you already know Angular.

---

## Study Log

One line per topic studied, in order.

| # | Topic | Chapter |
|---|---|---|
| 1 | A component still re-renders even when nothing useful changed | [2.12 React.memo](#212-reactmemo) |
| 2 | The 3 ways to write useEffect, and what cleanup does | [2.4 useEffect](#24-useeffect) |
| 3 | Stale closures — why a function can keep using an old, frozen value | [2.13 Stale closures](#213-stale-closures) |
| 4 | What React Fiber is, and why typing can stay smooth while other work lags | [2.14 Fiber and useTransition](#214-fiber-and-usetransition) |
| 5 | Migrating a legacy app to React, and class components vs hooks | [0.6](#06-migrating-a-legacy-app-strangler-fig) / [2.15](#215-class-components--hooks) |

---

## Contents

**Part 0 — The Big Picture**
- [0.1 What we're building](#01-what-were-building)
- [0.2 How a React app is wired together](#02-how-a-react-app-is-wired-together)
- [0.3 How the files are organized](#03-how-the-files-are-organized)
- [0.4 How to run it](#04-how-to-run-it)
- [0.5 React's versions, and "ReactJS" vs "React"](#05-reacts-versions-and-reactjs-vs-react)
- [0.6 Migrating a legacy app (strangler fig)](#06-migrating-a-legacy-app-strangler-fig)

**Part 1 — Plain JavaScript, used everywhere**
- [1.1 Variables and functions](#11-variables-and-functions)
- [1.2 Pulling values apart / copying with changes](#12-pulling-values-apart--copying-with-changes)
- [1.3 Text with variables inside](#13-text-with-variables-inside)
- [1.4 Safe reads: ?. and ??](#14-safe-reads--and-)
- [1.5 Array tools: map, filter, reduce, find, forEach](#15-array-tools-map-filter-reduce-find-foreach)
- [1.6 Set — no duplicates](#16-set--no-duplicates)
- [1.7 Dates](#17-dates)
- [1.8 JSON — object to text and back](#18-json--object-to-text-and-back)
- [1.9 import / export](#19-import--export)
- [1.10 Promises and import()](#110-promises-and-import)

**Part 2 — React basics**
- [2.1 JSX](#21-jsx)
- [2.2 A component is a function](#22-a-component-is-a-function)
- [2.3 useState](#23-usestate)
- [2.4 useEffect](#24-useeffect)
- [2.5 useMemo](#25-usememo)
- [2.6 Context](#26-context)
- [2.7 Don't save what you can calculate](#27-dont-save-what-you-can-calculate)
- [2.8 Lists and keys](#28-lists-and-keys)
- [2.9 Forms](#29-forms)
- [2.10 lazy + Suspense](#210-lazy--suspense)
- [2.11 useRef](#211-useref)
- [2.12 React.memo](#212-reactmemo)
- [2.13 Stale closures](#213-stale-closures)
- [2.14 Fiber and useTransition](#214-fiber-and-usetransition)
- [2.15 Class components → Hooks](#215-class-components--hooks)

**Part 3 — Moving between pages**
- [3.1 BrowserRouter](#31-browserrouter)
- [3.2 Nested routes](#32-nested-routes)
- [3.3 Link, NavLink, Navigate](#33-link-navlink-navigate)
- [3.4 useParams, useNavigate](#34-useparams-usenavigate)

**Part 4 — Browser tools**
- [4.1 localStorage](#41-localstorage)
- [4.2 Downloading a file without a server](#42-downloading-a-file-without-a-server)
- [4.3 A few direct DOM tools](#43-a-few-direct-dom-tools)

**Part 5 — Our project**
- [5.1 Login and roles](#51-login-and-roles)
- [5.2 Fixed Deposit part](#52-fixed-deposit-part)
- [5.3 Mutual Fund part](#53-mutual-fund-part)
- [5.4 Combined report page](#54-combined-report-page)
- [5.5 Styling (Tailwind)](#55-styling-tailwind)

**Part 6 — Quick answers**
- [6.1 Tell me about this project](#61-tell-me-about-this-project)
- [6.2 React word → Angular word](#62-react-word--angular-word)

---

# Part 0 — The Big Picture

## 0.1 What we're building

A pretend investing app: **Fixed Deposits** (put money in for a fixed time,
get interest back) and **Mutual Funds** (invest all at once, or a bit every
month). Two roles: **Client** (can actually invest) and **Asset Manager**
(can only view and explain, not buy/cancel/pay). No real backend — all data
lives in the browser.

## 0.2 How a React app is wired together

**In Angular:** `AppModule` has a `declarations` list — every component
must be registered there before it can be used, and a `bootstrap` array
says which one starts the app. `main.ts` boots that module.

**In React: there's no such list, anywhere.** Instead:
- `index.js` is the real starting point. It finds one empty `<div id="root">`
  in the HTML page and tells React "put my `App` component in here."
- `App.js` is the one root component — like your root `AppComponent`.
- Every other component is simply **imported** wherever it's used —
  `import Navbar from './navBar'`, then `<Navbar />`. No registration list.
- The whole app is just a tree: `App` renders some components, those
  render more, and so on. Start at `App` and follow the imports down.
- Folders are only for humans to stay organized — React doesn't scan them.
  Only `import` lines actually connect anything.

**Where to look:** [`index.js`](src/index.js) → [`App.js`](src/App.js) →
[`AppLayout.js`](src/Components/AppLayout.js) is the actual chain in this
project.

**Angular side:** think of every `import Something from './Something'` as
doing the job Angular's `declarations` array does — except it's per-file,
not one central list, and it's required either way (Angular also needs the
import statement *in addition to* the module registration).

## 0.3 How the files are organized

```
src/
  App.js            — shows login page, or the real app
  index.js          — the very first file that runs
  routes.js         — list of the app's big pages
  Components/
    AppLayout.js       — sidebar + top bar + current page
    Auth/              — login page + who's-logged-in logic
    AssetManagement/   — the investing part of the app
      FixedDeposit/
      MutualFund/
      Reports/
    Income/            — an older part, written in TypeScript
```

Each feature gets its own folder with everything it needs — its data,
shared state, and pages, all together.

## 0.4 How to run it

```
npm install
npm start       # http://localhost:3000
```

You land on a login page. Any name, pick Client or Asset Manager — no real
password.

## 0.5 React's versions, and "ReactJS" vs "React"

**Clearing up a name mix-up first:** Angular had a real split — "AngularJS"
(version 1) was thrown out and rewritten from scratch into "Angular"
(version 2 onward) — different language, incompatible, basically two
separate frameworks sharing a family name. **React never had this.**
"React" and "ReactJS" are just two names for the exact same library — same
as how people say "Node.js" instead of "Node." There's only ever been one
React, just older and newer versions of it.

**The one big turning point — Hooks (React 16.8, 2019):** before this,
only "class components" could hold state or run code on mount/update.
Function components were just plain, simple display components. Then
React added **Hooks** — `useState`, `useEffect`, and the rest — letting a
plain function component do everything a class component could. The whole
React world switched to function components + hooks after this. Everything
in this project (and everything in Part 2 of this book) is written this
modern way. Class components still run, but nobody writes new code with
them anymore.

**Recent versions, short version:**
- **React 18 (2022)** — the new way to start an app, `createRoot` (what our
  own `index.js` uses), plus background-rendering performance work.
- **React 19 (Dec 2024)** — Server Components became official, a new
  `use()` hook, and a new **compiler** that can work out memoization
  automatically — which may make manually reaching for `useMemo`/
  `useCallback`/`React.memo` (see [2.12](#212-reactmemo)) much less
  necessary over time.
- **React 19.2 (Oct 2025)** — smaller additions, and React moved to its own
  independent **React Foundation** (hosted by the Linux Foundation).
- As of August 2026, the latest release is **19.2.8**. Our own project
  actually runs on **React 18** (see `package.json`) — still fully correct,
  current knowledge either way, just not the newest major version.

**One honest note about this project's setup:** we built this using
**Create React App (CRA)**, which the React team has since stopped
recommending. For a brand new project today, they now point people to
**Vite** (for a plain app like this one) or **Next.js** / **React Router
v7** (for a full framework with server rendering). CRA still works fine —
nothing in this book stops being true — it's just no longer where you'd
start a fresh project in 2026.

**Angular side:** Angular does real major-version jumps too (15, 16,
17...), but stays one continuous framework the whole way through — closer
to how React's own version history actually works. The "old version thrown
away, new one built from scratch" story from Angular's past doesn't apply
to React.

Sources: [React Versions – react.dev](https://react.dev/versions),
[React 19.2 – react.dev](https://react.dev/blog/2025/10/01/react-19-2),
[Create React App is Now Deprecated – Build5Nines](https://build5nines.com/create-react-app-is-now-deprecated-time-to-migrate-to-vite-or-next-js/)

## 0.6 Migrating a legacy app (strangler fig)

Rewriting a whole legacy app in one big-bang release is risky. The
**strangler fig** approach instead migrates one piece at a time — new and
old run side by side, more traffic shifts to the new pieces over time,
until the old code can finally be deleted. Named after the strangler fig
vine, which grows around a host tree until it fully replaces it.

**Where to look:** [`routes.js`](src/routes.js) — each big feature
(`Income`, `AssetManagement`) is its own independent, lazy-loaded route.
That shape is exactly what a real strangler-fig migration needs: one route
could point at a fully migrated React feature while another still points
at old code, with neither affecting the other.

**Handling state during a migration** (general knowledge, not project-
specific): common real approaches are a shared bridge like
`localStorage`/cookies/URL params so session state (e.g. being logged in)
survives a jump between old and new pages, keeping one backend as the
single source of truth both frontends call, or mounting the new React
piece as an "island" inside an old page and passing state in through props.

**Say this in an interview:** "We used a strangler fig approach — migrating
one module or route at a time, running legacy and new side by side, and
gradually redirecting traffic until the legacy code could be safely
deleted, instead of one risky big-bang rewrite."

---

# Part 1 — Plain JavaScript, used everywhere

## 1.1 Variables and functions

`const`/`let` store a value under a name. Arrow functions, `(x) => x + 1`,
are a short way to write a function — used everywhere in React.

**Where to look:** any file in `Components/` — every component is
`const Name = () => {...}`.

**Angular:** you already use arrow functions the same way, e.g. inside
`.subscribe(() => ...)`.

## 1.2 Pulling values apart / copying with changes

`const { name } = person` pulls `name` straight out of an object.
`{...person, age: 31}` makes a **new copy** with one thing changed — the
original is untouched.

**Why:** React wants you to never change an object/array directly — always
make a new one.

**Where to look:** [`fdContext.js`](src/Components/AssetManagement/FixedDeposit/fdContext.js)
— `[...prev, newFd]` adds one item without touching the old list.

**Term:** "destructuring" and "spread." **Angular:** same rules — matters
even more with `OnPush`, which checks "is this the same object?" the same way.

## 1.3 Text with variables inside

`` `Hello ${name}!` `` (backticks) mixes text and variables, instead of
`"Hello " + name + "!"`.

**Where to look:** `fdContext.js` — `` `INV-FD-${Date.now()}` `` builds an ID.

**Term:** "template literal." Same in Angular.

## 1.4 Safe reads: ?. and ??

`a?.b` — if `a` doesn't exist, just get nothing back, don't crash.
`a ?? b` — use `a`, unless it's completely empty, then use `b`.

**Where to look:** [`authContext.js`](src/Components/Auth/authContext.js) —
`user?.role` doesn't crash even when nobody's logged in yet.

**Term:** "optional chaining" / "nullish coalescing." Same syntax in
Angular templates too.

## 1.5 Array tools: map, filter, reduce, find, forEach

- `.map()` → new list, each item changed.
- `.filter()` → new list, only items that pass a test.
- `.reduce()` → one final answer (like a total).
- `.find()` → first matching item.
- `.forEach()` → just do something per item.

**Where to look:** `fdCompare.js` (`.filter()`), `mfSubscriptions.js`
(`.reduce()` for a total), `fdInvestForm.js` (`.find()` by ID).

**Angular:** same methods, same way. (Not the same as RxJS's `.map()` on an
Observable — that's a stream over time, this is a plain list.)

## 1.6 Set — no duplicates

`new Set([...])` keeps only unique values.

**Where to look:** `mfList.js` — builds the category filter with no repeats.

## 1.7 Dates

`new Date(year, month, day)` — month is zero-based (January = `0`).
`Date.now()` gives the current time as a number.

**Where to look:** `mfSubscriptions.js` — works out the next SIP payment date.

**Angular:** same `Date`; Angular usually formats it with a `| date` pipe
in the template instead.

## 1.8 JSON — object to text and back

Browser storage only holds text. `JSON.stringify(obj)` → text.
`JSON.parse(text)` → object again.

**Where to look:** [`storage.js`](src/Components/AssetManagement/utils/storage.js)
— does this once so no other file has to think about it.

**Angular:** same `JSON`; usually wrapped in a service instead of a plain file.

## 1.9 import / export

`export default X` = this file's main thing. `export function y() {}` = a
named extra, imported with `{ y }`.

**Where to look:** `authContext.js` exports `useAuth`, `AuthProvider`, and
`ROLES` all at once.

**Angular:** same `import`/`export`. Angular also has its own separate
"module" idea (`NgModule` or a standalone component's `imports` list) —
that's different from plain JS import/export.

## 1.10 Promises and import()

A Promise = a value that isn't ready yet, but will be. `import('./file')`
(with parentheses) loads a file later, only when needed.

**Where to look:** `routes.js` — the Asset Management part loads this way.

**Angular:** same trick powers Angular's own `loadChildren` lazy routes.

---

# Part 2 — React basics

## 2.1 JSX

Looks like HTML inside JavaScript, but isn't real HTML — it gets turned
into plain JS before reaching the browser. That's why it's `className`, not
`class`, and `{ }` means "run JS here."

**Where to look:** `AppLayout.js` — `{routes.map(...)}` is plain JS running
inside the JSX.

**Angular:** Angular has a fully separate template file with its own syntax
(`*ngFor`, `*ngIf`, `[prop]`, `(event)`). JSX has no separate syntax at all
— it's just JavaScript.

## 2.2 A component is a function

A React component is a normal function that returns JSX. React calls it,
gets the result, draws it on screen.

**Where to look:** every file under `Components/`.

**Angular:** components are **classes**, not functions — one instance
stays alive the whole time. React re-runs the whole function on updates;
Angular re-checks the same live object instead.

## 2.3 useState

Lets a component remember a value between runs, and redraw the screen when
it changes.

**Where to look:** `AppLayout.js` — `const [sideNavOpen, setSideNavOpen] = useState(true)`.

**Angular:** a plain class field does this automatically (Angular notices
and updates). Newer Angular has `signal()`, closer to `useState`.

## 2.4 useEffect

Runs something *after* the screen updates — like saving to `localStorage`,
or starting a timer. There are 3 ways to write it:
- `useEffect(fn)` — no second argument — runs after **every** render. Rare,
  usually a mistake.
- `useEffect(fn, [])` — an empty list — runs **once**, right when the
  component first appears.
- `useEffect(fn, [x])` — runs again whenever `x` changes.

**Cleanup:** if `fn` returns another function, that returned function runs
right before the component disappears (good for stopping timers,
unsubscribing, anything that shouldn't keep running forever).

**Where to look:**
- `fdContext.js` — `useEffect(() => saveToStorage(...), [myFds])`, the
  "runs when `x` changes" version — saves the FD list every time it changes.
- [`navBar.js`](src/Components/navBar.js) — a live session timer, the
  "runs once" version: `useEffect(() => { const id = setInterval(...); return
  () => clearInterval(id); }, [])`. It starts counting the moment you log
  in (that's when `Navbar` first appears), and the cleanup stops the timer
  the moment you log out (that's when `Navbar` disappears — see
  [`App.js`](src/App.js), which swaps to the login page entirely).

**Angular:** split across `ngOnInit` (≈ empty-array useEffect),
`ngOnChanges` (≈ useEffect with deps), and `ngOnDestroy` (≈ the cleanup
function) — or `effect()` in newer Angular, which behaves a lot like
`useEffect` directly.

**Say this in an interview:** "`useEffect` with no dependency array runs
after every render. An empty array `[]` means it runs once, on mount. An
array with values means it re-runs whenever one of those values changes.
If the effect returns a function, that's the cleanup — it runs before the
component unmounts, or right before the effect re-runs."

```js
useEffect(() => {
  const intervalId = setInterval(() => {
    setSessionSeconds((s) => s + 1);
  }, 1000);
  return () => clearInterval(intervalId); // cleanup
}, []); // empty array = run once, on mount
```

## 2.5 useMemo

Skips redoing a slow calculation unless its inputs actually changed.

**Where to look:** `fdInvestForm.js` — the payout amount only recalculates
when amount/tenure change.

**Angular:** `computed()` in newer Angular, or a "pure pipe" in classic Angular.

## 2.6 Context

Lets a deeply nested component grab shared data directly, instead of
passing it down through every component in between.

**Where to look:** `fdContext.js`, `mfContext.js`, `authContext.js` — three
separate shared boxes of data.

**Angular:** solved differently — with Dependency Injection. A service
(`@Injectable({providedIn:'root'})`) is just asked for in any constructor,
no wrapping needed. Same problem, different fix.

**Term:** the problem Context avoids is called "prop drilling."

## 2.7 Don't save what you can calculate

If a value can be worked out from data you already have, don't store it
separately — two copies can quietly fall out of sync.

**Where to look:** `mfSubscriptions.js` — "next payment date" and "current
value" are worked out fresh every time, never saved.

**Angular:** use a plain **getter** instead of a separate field.

**Term:** "derived state."

## 2.8 Lists and keys

Turning a list into JSX with `.map()` needs a `key` on each item — a name
tag so React knows which item is which, even if the list reorders.

**Where to look:** every list in the app uses a real ID as the key, never
the item's position.

**Angular:** `*ngFor="let x of items; trackBy: fn"` — same job.

## 2.9 Forms

React usually owns an input's value directly: give it `value` from state,
update that state on every keystroke with `onChange`.

**Where to look:** `fdInvestForm.js` — `value={amount}`,
`onChange={(e) => setAmount(e.target.value)}`.

**Angular:** `[(ngModel)]` for quick two-way binding, or Reactive Forms
(`FormControl`) for the more React-like explicit version.

**Term:** "controlled input."

## 2.10 lazy + Suspense

Loads part of the app's code only when it's actually visited, instead of
all at once. `Suspense` shows a loading message while it downloads.

**Where to look:** `routes.js` — both big parts of the app load this way.

**Angular:** built into the router directly (`loadChildren`), no separate
wrapper needed (very new Angular's `@defer` is closer to `Suspense`).

**Term:** "code splitting."

## 2.11 useRef

Like `useState`, but changing it does **not** redraw the screen. Just a box
that remembers a value.

**Where to look:** `navBar.js` — counts re-renders without `useState`,
because counting shouldn't itself cause another render.

**Angular:** `@ViewChild` grabs a real DOM element. For "just remember a
value," a plain class field already does that — Angular components don't
get "re-run" and forget things the way React functions do.

## 2.12 React.memo

Tells one component: "only redraw if what I gave you is actually
different from last time."

**The trap:** a function written directly inside a parent is a **brand
new function every render**, even if it behaves the same. So `memo()` sees
"looks new" and redraws anyway.

**The fix:** wrap that function in `useCallback(fn, [])` in the parent, so
it stays the same function every time.

**One more trap:** with `useCallback(fn, [])`, the function is built once —
if it reads state directly, it'll use that state's very first value
forever. Fix: `setValue((prev) => !prev)` instead of `setValue(!value)`.

**Where to look:** [`AppLayout.js`](src/Components/AppLayout.js) —
`toggleSideNav` uses `useCallback` + the `(prev) =>` fix.
[`navBar.js`](src/Components/navBar.js) — wrapped in `memo()`, shows a
render counter next to the title so you can watch it stay flat.

**Angular:** `changeDetection: ChangeDetectionStrategy.OnPush` — same idea,
same trap (a function written inline in a template also breaks it there).

**Say this in an interview:** "`React.memo` skips re-rendering a component
if its props are shallowly equal to last render's — same reference, not
just same-looking value. That's called referential equality. The common
gotcha: passing an inline function or object as a prop creates a new
reference every render, so `memo` never sees equal props and the
optimization does nothing — the fix is `useCallback`/`useMemo` in the
parent to keep that reference stable."

```js
// AppLayout.js (parent) — keeps the same function reference every render
const toggleSideNav = useCallback(() => {
  setSideNavOpen((prev) => !prev);
}, []);

// navBar.js (child) — only re-renders if its props actually changed
const Navbar = memo(function Navbar({ toggleSideNav }) {
  /* ... */
});
```

## 2.13 Stale closures

A function "remembers" the variables around it from the moment it was
created. A **stale closure** is when that remembered value goes old/wrong,
because the real value has since changed, but the function keeps using
the value it first remembered.

**Where this bites you most:** `useEffect(fn, [])` runs `fn` only once —
so anything created *inside* `fn`, like a `setInterval` callback, is also
only ever built once. It's frozen with whatever the surrounding variables
equalled at that one moment, forever.

**Where to look:** [`navBar.js`](src/Components/navBar.js) — the session
timer. If its interval read `sessionSeconds` directly instead of using the
updater form, it would freeze at the value from the render when the effect
first ran (`0`), and the timer would get stuck at `1` forever instead of
counting up — every tick would compute `0 + 1` again and again. The actual
code avoids this with `setSessionSeconds((s) => s + 1)`: instead of
reading the frozen variable, it asks React for whatever the real value is
*right now*.

**Same trap, different spot:** [2.12](#212-reactmemo)'s `toggleSideNav` in
`AppLayout.js` has the identical issue with `useCallback(fn, [])` — fixed
the same way, with `setSideNavOpen((prev) => !prev)`.

**The other fix — useRef:** the updater-function trick above only works
when you're updating a value based on its *own* previous value. If a
mount-once effect needs to read some *other* value that keeps changing,
you'd instead keep a `useRef` updated on every render, and read
`ref.current` inside the effect — a ref is one stable object, so reading it
always gets the current value, even from inside an old closure.

**Angular:** this exact trap doesn't really exist in Angular the same way.
Angular components are persistent objects — reading `this.someValue` inside
a `setInterval` always reads the live value off that same object, since
there's no "component function re-run from scratch" the way React has.

**Say this in an interview:** "A stale closure happens when a function
captures a variable's value at the time it was created, and that function
never gets recreated — so it keeps using that old value even after the
real state has changed. It shows up most with `useEffect`/`useCallback`
using an empty dependency array. Fix it either with the functional updater
form of a state setter, `setValue(prev => ...)`, or with a `useRef` that's
always kept current."

```js
// Buggy — reads sessionSeconds directly, frozen at its value when the
// effect first ran (0). Every tick recomputes 0 + 1 and gets stuck at 1.
setInterval(() => setSessionSeconds(sessionSeconds + 1), 1000);

// Fixed — asks React for the real current value every time it runs.
setInterval(() => setSessionSeconds((s) => s + 1), 1000);
```

## 2.14 Fiber and useTransition

**Fiber** is React's internal engine (since React 16) for figuring out what
changed and updating the screen. Before Fiber, that work happened in one
single pass that couldn't be paused — so a big update could make typing or
clicking feel laggy, because React was busy finishing older work first.
Fiber breaks the work into small pieces, so React *can* pause, handle
something urgent (like a keystroke) first, then continue.

You never touch Fiber directly — but `useTransition` (React 18) lets you
use the thing it enables: marking a state update as "not urgent, this can
lag a little."

**Where to look:** [`mfList.js`](src/Components/AssetManagement/MutualFund/mfList.js)
— the search box. Two separate state values exist for one input on
purpose: `searchInput` updates on every keystroke, instantly, no matter
what. `searchQuery` — the one actually used to filter the list — is set
*inside* `startTransition(...)`, so React can deprioritize it. The actual
filtering has a deliberate 200ms artificial slowdown (our real mock data is
only 5 schemes, filtering it is instant either way) — that's just there to
simulate a genuinely large list, so you can actually feel the difference:
type fast, and the letters stay instant while the list/"updating…" label
visibly lag behind.

**Say this in an interview:** "Fiber is React's reconciliation engine,
introduced in React 16. The old reconciler was synchronous and couldn't be
interrupted; Fiber made rendering interruptible, so React can prioritize
urgent updates like user input over less urgent ones like a big list
re-render. That capability is what `useTransition` exposes to developers:
Fiber enables concurrent rendering."

```js
const [isPending, startTransition] = useTransition();

function handleSearchChange(e) {
  const value = e.target.value;
  setSearchInput(value);           // urgent — updates every keystroke
  startTransition(() => {
    setSearchQuery(value);         // low-priority — React can deprioritize this
  });
}
```

**Angular:** no direct equivalent. Angular's change detection runs
synchronously through the tree when triggered — there's no built-in "mark
this as low priority" the way `startTransition` gives you. Similar
behavior in Angular usually means `runOutsideAngular` + manual scheduling,
or just debouncing the input instead.

## 2.15 Class components → Hooks

Before React 16.8 (2019), only **class components** could hold state or
run code on mount/update — a function component was just a plain display
component with no memory at all. Hooks let a plain function do everything a
class could. Every real migration of old React code eventually means
converting classes like this to hooks.

**The mapping:**
- `this.state` + `this.setState(...)` → `useState`
- `componentDidMount` + `componentWillUnmount` → one `useEffect(fn, [])`
  with a cleanup function (`return () => ...`)
- A plain instance field that shouldn't cause a re-render → `useRef`

**Where to look:** [`SessionTimerClassExample.js`](src/Components/LegacyExamples/SessionTimerClassExample.js)
— a reference-only file (never imported/rendered anywhere) showing the
class-component version of the exact session timer that's actually live in
[`navBar.js`](src/Components/navBar.js). Same behavior, two different eras.

```jsx
// Legacy — class component
componentDidMount() {
  this.intervalId = setInterval(() => {
    this.setState((prev) => ({ sessionSeconds: prev.sessionSeconds + 1 }));
  }, 1000);
}
componentWillUnmount() {
  clearInterval(this.intervalId);
}

// Modern — function + hooks (the real code in navBar.js)
useEffect(() => {
  const intervalId = setInterval(() => {
    setSessionSeconds((s) => s + 1);
  }, 1000);
  return () => clearInterval(intervalId);
}, []);
```

**Say this in an interview:** "Migrating a class component to hooks means
replacing `this.state` with `useState`, folding `componentDidMount` and
`componentWillUnmount` into a single `useEffect` with a cleanup function,
and turning instance fields that shouldn't trigger a re-render into
`useRef`. The real challenge is usually that a class scatters related logic
across separate lifecycle methods, while hooks let you group it by concern
instead."

**Angular:** Angular never had this particular split — components have
always been classes, with no competing "function component" style the way
React had before hooks. The closest Angular parallel to "an old pattern
being phased out" is moving from `NgModule`-based components to modern
**standalone components** — a real, ongoing migration in the Angular world
too, just a different axis of change.

---

# Part 3 — Moving between pages

## 3.1 BrowserRouter

Changes the page without a real browser reload — swaps the address bar and
what's on screen.

**Where to look:** `index.js` — wraps the whole app.

**Angular:** `RouterModule` does the same job the same way.

## 3.2 Nested routes

A route can contain more routes inside it — its own smaller router for
whatever comes after that part of the address.

**Where to look:** `AppLayout.js` → `assetManagementModule.js` →
`fdModule.js` — three levels deep.

**Angular:** a `children: [...]` list inside the route config, plus a
`<router-outlet>` marking where it shows.

## 3.3 Link, NavLink, Navigate

`<Link>` — clickable, changes the page. `<NavLink>` — same, but knows if
it's the current page (for highlighting). `<Navigate>` — no click; the code
itself jumps to a page.

**Where to look:** `sideNav.js` (NavLink), `AppLayout.js` (`<Navigate
to="/login" />` when nobody's logged in).

**Angular:** `routerLink`, `routerLinkActive`, `router.navigate([...])`.

## 3.4 useParams, useNavigate

`useParams()` reads the changing part of the URL. `useNavigate()` jumps to
a page from code, not a click.

**Where to look:** `fdInvestForm.js` (useParams), `loginPage.js`
(useNavigate, right after login).

**Angular:** `ActivatedRoute`, and the `Router` service's `.navigate()`.

---

# Part 4 — Browser tools

## 4.1 localStorage

Small storage built into the browser — survives a page refresh. We use it
to fake "the backend remembers your data."

**Where to look:** `storage.js` — one file every context uses.

**Angular:** same `localStorage`; usually wrapped in a service there too.

## 4.2 Downloading a file without a server

We build a CSV file entirely in the browser from data already on the page,
and trick the browser into saving it.

**Where to look:** `reportsModule.js` — the "Download CSV" button.

**Term:** "Blob" (the file-like object) + `URL.createObjectURL` (the trick).

## 4.3 A few direct DOM tools

`document.getElementById('root')` finds where React attaches, in
[`index.js`](src/index.js). `document.createElement` + `.click()` is part
of the download trick above, in `reportsModule.js`.

**Angular:** same tools exist, though Angular usually steers you to
`Renderer2`/`ElementRef` instead of touching the page directly.

---

# Part 5 — Our project

## 5.1 Login and roles

No login = always land on the login page. Any name, pick Client or Asset
Manager, no real password.

| Action | Client | Asset Manager |
|---|---|---|
| Browse, compare, view reports | Yes | Yes |
| Buy / start SIP | Yes | View only |
| Cancel / close early | Yes | No |
| Make a payment | Yes | No |

**How:** `authContext.js` works out one yes/no value, `canTransact`, fresh
every time (see [2.7](#27-dont-save-what-you-can-calculate)).
`AppLayout.js` sends you to the login page if nobody's logged in. Every
button that can transact checks `canTransact` twice — once to decide
whether to show the button, again on the actual page, in case someone
types the address directly.

**Angular:** route-level protection would be a `CanActivate` guard instead
of a check inside the page. Button-level checks would be the same either
way — a service value read with `*ngIf`.

## 5.2 Fixed Deposit part

Folder: `AssetManagement/FixedDeposit/`

- `fdData.js` — pretend FD schemes + payout calculation.
- `fdContext.js` — remembers what you've bought, saved to `localStorage`.
- `fdList.js` — browse + compare + invest.
- `fdCompare.js` — side-by-side table.
- `fdInvestForm.js` — the buy form.
- `myFds.js` — what you own.

## 5.3 Mutual Fund part

Folder: `AssetManagement/MutualFund/`

- `mfData.js` — pretend fund schemes + a rough value estimate.
- `mfContext.js` — remembers your subscriptions, saved to `localStorage`.
- `mfList.js` — browse + filter.
- `mfSchemeDetail.js` — pick a fund, start a SIP or invest a lump sum.
- `mfSubscriptions.js` — what you're invested in.

## 5.4 Combined report page

File: `reportsModule.js` — pulls FD + Mutual Fund data together into one
view, with a CSV download. Because it needs both at once, both contexts are
set up higher up, in `assetManagementModule.js`, so this page can reach
both (see [2.6](#26-context)).

## 5.5 Styling (Tailwind)

Ready-made small class names (`flex`, `p-4`, `bg-gray-800`) instead of
writing your own CSS.

**Where to look:** every `className`. (This project had Tailwind class
names everywhere from the start, but Tailwind wasn't installed — so they
did nothing until `tailwind.config.js`/`postcss.config.js` were added.)

**Angular:** works identically — same class names, just in a template's
`class="..."` instead of JSX's `className="..."`.

---

# Part 6 — Quick answers

## 6.1 Tell me about this project

A small investing app — Fixed Deposits and Mutual Funds — for two roles: a
Client who can invest, and an Asset Manager who can only view and explain.
Each product lives in its own folder with its own data and shared state.
Every transacting button checks one shared permission value, both before
showing itself and again on the destination page. A report page combines
both products into one view. Everything is saved in the browser
(`localStorage`) instead of a real backend.

## 6.2 React word → Angular word

| React | Angular |
|---|---|
| Function component + JSX | `@Component` class + template |
| `useState` | Class field, or `signal()` |
| `useEffect` | `ngOnInit`/`ngOnChanges`/`ngOnDestroy`, or `effect()` |
| `useMemo` | `computed()`, or a pure `Pipe` |
| Context | Dependency Injection (an injectable service) |
| Props | `@Input()` |
| Callback props | `@Output()` + `EventEmitter` |
| `.map()` + key | `*ngFor` + `trackBy` |
| `{cond && <div/>}` | `*ngIf` |
| Controlled input | `[(ngModel)]`, or Reactive Forms |
| `lazy` + `Suspense` | `loadChildren`, or `@defer` |
| `BrowserRouter` | `RouterModule` |
| `<Link>` / `<NavLink>` | `routerLink` / `routerLinkActive` |
| `<Navigate>` (in-component check) | `CanActivate` guard (cleaner — checked before load) |
| `useParams()` | `ActivatedRoute` |
| `useNavigate()` | `Router` service |
| `useRef` | Plain class field |
| `React.memo` | `ChangeDetectionStrategy.OnPush` |
| No central component registry | `AppModule` declarations list |

---

*Add new topics here as we go — same short 3-part shape, plain words first.*
