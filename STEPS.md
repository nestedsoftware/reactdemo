# React Learning Project — Step Log

A record of every step taken to build this project, in order.
Each step explains _what_ was done and _why_, so you can revisit the reasoning later.

---

## Step 1 — Scaffold the project with Vite

### Command

```powershell
npm create vite@latest . -- --template react-ts
```

### What it does

| Part                     | Meaning                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `npm create vite@latest` | Downloads and runs the official Vite project generator (no global install needed)   |
| `.`                      | Use the **current directory** as the project root rather than creating a sub-folder |
| `-- --template react-ts` | Select the React + TypeScript starter template                                      |

### Files generated

#### `index.html` — the single HTML page

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

Vite uses this file as the entry point for the browser. The `<div id="root">` is the DOM node
React will mount into. The `<script type="module">` tells the browser to load the app as an
ES module — no bundling step needed during development.

#### `src/main.tsx` — the React entry point

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- `createRoot` is the React 18+ API for mounting a React tree into a DOM node.
- `StrictMode` is a development-only wrapper that intentionally double-invokes
  certain functions to surface bugs early. It has no effect in production builds.
- The `!` after `getElementById('root')` is a TypeScript **non-null assertion** —
  it tells the compiler "trust me, this element exists".

#### `src/App.tsx` — the root component (boilerplate counter app)

The default template ships a counter demo to prove the setup works. We will replace
this with a Hello World component in a later step.

#### `vite.config.ts` — Vite configuration

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

The `@vitejs/plugin-react` plugin does two things:

1. Compiles JSX/TSX via Babel with React Fast Refresh support (instant updates without
   losing component state during development).
2. Injects the React runtime automatically so you don't need `import React from 'react'`
   at the top of every file.

#### `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — TypeScript config

Vite splits TS config into three files:

| File                 | Scope                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------- |
| `tsconfig.json`      | Root "solution" file — references the other two                                                    |
| `tsconfig.app.json`  | Config for `src/` (browser code). Sets `"jsx": "react-jsx"` which enables the modern JSX transform |
| `tsconfig.node.json` | Config for Vite config files themselves (Node.js environment)                                      |

Key settings in `tsconfig.app.json`:

- `"target": "es2023"` — TypeScript emits modern JS; Vite/Babel handles browser compatibility
- `"moduleResolution": "bundler"` — allows `.tsx` extensions in imports (Vite resolves them)
- `"noEmit": true` — TypeScript only type-checks; Vite (not `tsc`) does the actual transpilation
- `"noUnusedLocals"` / `"noUnusedParameters"` — strict checks that catch dead code

#### `eslint.config.js` — ESLint configuration

The template ships a modern **flat config** (ESLint v9+) with four rule sets:

1. `@eslint/js` recommended — standard JS best practices
2. `typescript-eslint` recommended — TypeScript-specific rules
3. `eslint-plugin-react-hooks` — enforces the Rules of Hooks (e.g. no hooks inside conditions)
4. `eslint-plugin-react-refresh` — warns if a component export pattern breaks Fast Refresh

Run the linter manually with:

```powershell
npm run lint
```

#### `package.json` — project metadata and scripts

```json
"scripts": {
  "dev":     "vite",           // start the dev server with HMR
  "build":   "tsc -b && vite build",  // type-check then bundle for production
  "lint":    "eslint .",       // lint all files
  "preview": "vite preview"   // serve the production build locally
}
```

#### `.gitignore`

Pre-configured to exclude `node_modules/`, `dist/`, and Vite/TS cache files.

---

## Step 2 — Install dependencies

### Command

```powershell
npm install
```

> **Note:** In Vite v6+, the scaffold command (Step 1) interactively asks
> _"Install with npm and start now?"_. If you choose **Yes**, Steps 2 and 3
> are run automatically as part of Step 1 — you do not need to run them
> separately. This is what happened here.

### What it does

Reads `package.json` and downloads all listed packages into `node_modules/`.
Creates `package-lock.json` which locks the exact version of every transitive
dependency — this ensures reproducible installs across machines.

**Runtime dependencies** (`dependencies`):
| Package | Purpose |
|---------|---------|
| `react` | The React core library (component model, hooks, reconciler) |
| `react-dom` | The DOM renderer — bridges React's virtual DOM to the real browser DOM |

**Development dependencies** (`devDependencies`) — not included in production builds:
| Package | Purpose |
|---------|---------|
| `vite` | Dev server and production bundler |
| `@vitejs/plugin-react` | JSX transform + Fast Refresh |
| `typescript` | TypeScript compiler (type-checking only at build time) |
| `@types/react` / `@types/react-dom` | TypeScript type definitions for React |
| `eslint` + plugins | Code linting |

---

## Step 3 — Start the development server

### Command

```powershell
npm run dev
```

> **Note:** Also run automatically by the Vite v6+ scaffold prompt if you chose **Yes** in Step 1.

### What it does

Starts Vite's dev server, typically at `http://localhost:5173`.

Key features of the dev server:

- **No bundling on start** — Vite serves source files as native ES modules directly to
  the browser. This makes cold start near-instant regardless of project size.
- **HMR (Hot Module Replacement)** — when you save a file, only that module is
  re-evaluated and pushed to the browser. The page does not fully reload, and React
  component state is preserved via Fast Refresh.
- **On-demand transforms** — `.tsx` files are compiled by esbuild only when the
  browser first requests them, not upfront.

---

## Step 4 — Add Prettier

### Commands

```powershell
npm install --save-dev prettier eslint-config-prettier
```

### What it does

Installs two packages:

| Package                  | Purpose                                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `prettier`               | Opinionated code formatter — enforces consistent style (indentation, quotes, line length) automatically                                                      |
| `eslint-config-prettier` | Disables ESLint rules that would conflict with Prettier's formatting decisions. Must be added **last** in the ESLint config so it can override earlier rules |

### Why use both ESLint and Prettier?

They have different jobs:

- **ESLint** catches _logic and code quality_ problems (e.g. unused variables, broken hook rules)
- **Prettier** enforces _formatting consistency_ (e.g. trailing commas, semicolons, quote style)

Without `eslint-config-prettier`, both tools would try to control formatting and produce
conflicting errors. The package simply turns ESLint's formatting rules off, leaving that
job entirely to Prettier.

### Files created/modified

#### `.prettierrc` — Prettier configuration (created at project root)

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

| Option          | Value   | Meaning                                                                                                                                                                     |
| --------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `semi`          | `false` | No semicolons at end of statements                                                                                                                                          |
| `singleQuote`   | `true`  | Use `'` instead of `"` for strings                                                                                                                                          |
| `tabWidth`      | `2`     | 2-space indentation                                                                                                                                                         |
| `trailingComma` | `"es5"` | Trailing commas where valid in ES5 (objects, arrays). Keeps git diffs cleaner — adding a new last item only adds one line rather than also modifying the previous last line |

#### `eslint.config.js` — modified

Added `eslint-config-prettier` as the last entry in the config array:

```js
import eslintConfigPrettier from 'eslint-config-prettier'

export default defineConfig([
  // ...existing rules...
  eslintConfigPrettier, // must be last so it wins over any conflicting rules above
])
```

### Recommended: enable "Format on Save" in VS Code

Add this to your workspace settings (`.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

This requires the **Prettier - Code formatter** VS Code extension (`esbenp.prettier-vscode`).

---

## Step 5 — Replace boilerplate with Hello World

### Files modified

#### `src/App.tsx` — replaced with a minimal component

Removed all boilerplate imports and JSX. The final file:

```tsx
function App() {
  return <h1>Hello, World!</h1>
}

export default App
```

A React component is just a function that:

1. Is named with an uppercase first letter
2. Returns JSX (or `null` if it renders nothing)

`export default App` makes the component importable by other modules — `main.tsx`
imports it as `import App from './App.tsx'`.

#### `src/App.css` — cleared

Removed all boilerplate styles. Left as an empty file for future use.

#### `src/index.css` — cleared

Removed all boilerplate global styles. Left as an empty file — a good place to add
CSS resets or global typography rules later.

---

## Step 6 — Add React Router

### Command

```powershell
npm install react-router
```

### What it does

Installs `react-router` — the standard client-side routing library for React.
It intercepts navigation events and swaps page components without a full browser
reload, preserving React state across navigations.

### File structure added

```
src/
  data/
    quizzes.ts          ← hardcoded quiz data shared between pages
  pages/
    QuizListPage.tsx    ← the / route — lists all quizzes
    QuizDetailPage.tsx  ← the /quizzes/:id route — shows one quiz
  components/
    Layout.tsx          ← shared nav bar + <Outlet>
  App.tsx               ← router definition (modified)
```

### `src/data/quizzes.ts` — data and types

```ts
export type Quiz = {
  id: string
  name: string
  description: string
}

export const quizzes: Quiz[] = [ ... ]
```

A `type` in TypeScript is a compile-time shape definition — completely erased at
runtime, generates no JavaScript output. Used here (rather than a `class`) because
the data is plain objects with no methods or constructor logic.

### `src/pages/QuizListPage.tsx` — list page

Key concepts:

- `quizzes.map(...)` — standard JS array method used in JSX to render a list
- `key={quiz.id}` — required by React on list items so it can track changes efficiently
- `<Link to="...">` — React Router's navigation component. Renders as an `<a>` tag
  but navigates without a full page reload. Use this instead of `<a href>` for all
  internal links.

### `src/pages/QuizDetailPage.tsx` — detail page

Key concepts:

- `useParams()` — React Router hook that reads dynamic URL segments. For the route
  `/quizzes/:id`, visiting `/quizzes/2` gives `{ id: '2' }`.
- `.find()` can return `undefined`, so TypeScript requires a null check before
  accessing `quiz.name`. Without `if (!quiz)`, the build fails with
  `'quiz' is possibly 'undefined'`. This is TypeScript preventing a runtime crash.

### `src/components/Layout.tsx` — shared layout

```tsx
<nav><Link to="/">Quiz App</Link></nav>
<main><Outlet /></main>
```

`<Outlet />` is a React Router placeholder that renders the matched child route's
component. The `<nav>` renders once and stays mounted across all navigations.

### `src/App.tsx` — router definition

```tsx
<BrowserRouter>
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<QuizListPage />} />
      <Route path="quizzes/:id" element={<QuizDetailPage />} />
    </Route>
  </Routes>
</BrowserRouter>
```

| Part                           | Meaning                                                                  |
| ------------------------------ | ------------------------------------------------------------------------ |
| `BrowserRouter`                | Enables routing via the browser History API (clean URLs, no `#`)         |
| `Routes`                       | Container for all route definitions                                      |
| `<Route element={<Layout />}>` | Parent route with no path — always matches, wraps all children in Layout |
| `<Route index ...>`            | Default child route — renders at the parent's path (`/`)                 |
| `path="quizzes/:id"`           | `:id` is a dynamic segment read by `useParams()` in the detail page      |

### Note: `index` vs `path="/"`

`index` is shorthand for "the default child route" — it matches when there is nothing
left in the URL after the parent's path. It is **not** the same as `path="/"`:

```tsx
// index matches the parent's own URL (nothing left after the parent path)
<Route index element={<QuizListPage />} />

// path="/" would match the absolute site root — wrong when nested
<Route path="/" element={<QuizListPage />} />  // ✗ don't do this
```

When the parent route has a `path`, `index` means "match this parent path exactly":

```tsx
<Route path="quizzes" element={<Layout />}>
  <Route index element={<QuizListPage />} /> // matches /quizzes
  <Route path=":id" element={<QuizDetailPage />} /> // matches /quizzes/1
</Route>
```

The idiomatic alternative to `index` would be `path=""` (empty string), but that is
obscure. `index` is the conventional way to express this.

---

## Step 7 — Add Tailwind CSS

### Commands

```powershell
npm install --save-dev tailwindcss @tailwindcss/vite
```

### What it does

Installs two packages:

| Package             | Purpose                                                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `tailwindcss`       | The core library that generates utility CSS classes                                                              |
| `@tailwindcss/vite` | Vite plugin that integrates Tailwind into the build pipeline — replaces the PostCSS approach used in Tailwind v3 |

### Files modified

#### `vite.config.ts` — added Tailwind plugin

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

The `()` is required — `tailwindcss` is a plugin factory function that returns the actual plugin object. Without the parentheses the build fails.

#### `src/index.css` — added Tailwind import

```css
@import 'tailwindcss';
```

This single line pulls in three layers:

| Layer          | What it does                                                                                                                                                                                                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Preflight**  | A CSS reset that strips all browser default styles — headings lose their size/bold, lists lose bullets, etc. This is intentional: it gives you a clean baseline so all styling is applied explicitly with Tailwind classes. This is why the app looks unstyled after adding Tailwind. |
| **Utilities**  | All the utility classes: `text-3xl`, `font-bold`, `text-blue-600`, etc.                                                                                                                                                                                                               |
| **Components** | Empty by default — used if you define custom component classes                                                                                                                                                                                                                        |

### How Tailwind utility classes work

Instead of writing CSS rules in a separate file, you apply pre-defined classes directly on elements:

```tsx
<h1 className="text-3xl font-bold text-blue-600">Hello</h1>
```

Tailwind scans your source files at build time and generates only the CSS for classes that are actually used — nothing more.

---

## Step 8 — Conditional class names (before clsx)

To motivate `clsx`, we first added conditional styling using plain string concatenation.

### Files modified

#### `src/data/quizzes.ts` — added `featured` flag

```ts
export type Quiz = {
  id: string
  name: string
  description: string
  featured?: boolean // optional — undefined is treated as falsy
}
```

The `?` makes the field optional — TypeScript types it as `boolean | undefined`.
Quizzes without `featured` are still valid and the ternary handles `undefined` as falsy.

#### `src/pages/QuizListPage.tsx` — conditional styling via string concatenation

```tsx
<li
  className={
    'p-2 rounded ' +
    (quiz.featured ? 'bg-yellow-100 font-bold' : 'bg-white')
  }
>
```

This works, but the string concatenation is awkward — the trailing space in `'p-2 rounded '`
is easy to forget, and adding more conditions makes it significantly harder to read.
This is the problem `clsx` solves.

---

## Step 9 — Add clsx

### Command

```powershell
npm install clsx
```

Note: `clsx` is a **runtime** dependency (not `--save-dev`) — it ships to the browser
as a function that runs on every render to compute the final class string.

### What it does

`clsx` takes any number of arguments — strings, conditionals, arrays — and joins them
into a single class string, skipping falsy values (`false`, `undefined`, `null`).

### Files modified

#### `src/pages/QuizListPage.tsx`

```tsx
import { clsx } from 'clsx'

<li
  className={clsx(
    'p-2 rounded',
    quiz.featured ? 'bg-yellow-100 font-bold' : 'bg-purple-100',
  )}
>
```

### When to use ternary vs `&&` inside clsx

For a **two-way condition** (one class or another), a ternary inside `clsx` is cleaner:

```tsx
clsx('base', isActive ? 'bg-yellow-100' : 'bg-teal-100')
```

For **multiple independent conditions**, `&&` per condition is where `clsx` really shines:

```tsx
clsx(
  'p-2 rounded',
  quiz.featured ? 'bg-yellow-100 font-bold' : 'bg-teal-100',
  quiz.completed && 'opacity-50',
  isSelected && 'ring-2 ring-blue-500'
)
```

Without `clsx`, each additional condition adds more string concatenation and manual
space management. `clsx` eliminates both problems.

---

## Step 10 — Button component (before tailwind-merge)

To motivate `tailwind-merge`, we added a reusable `Button` component with default
styles and tried to override them from the outside.

### Files added/modified

#### `src/components/Button.tsx` — new reusable component
```tsx
type ButtonProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={'px-4 py-2 rounded bg-blue-500 text-white ' + className}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
```

#### `src/pages/QuizListPage.tsx` — uses Button with an override
```tsx
<Link to={`/quizzes/${quiz.id}`}>
  <Button className="bg-red-500">View</Button>
</Link>
```

### The problem
Inspecting the rendered HTML shows both conflicting classes present at the same time:
```html
<button class="px-4 py-2 rounded bg-blue-500 text-white bg-red-500">View</button>
```
The button appears red right now only because Tailwind's generated stylesheet happens
to place `bg-red-500` after `bg-blue-500`. This is an implementation detail — the
result is unreliable and could break silently with a different set of classes or a
Tailwind version update.

`tailwind-merge` solves this by removing conflicting classes before they reach the DOM,
so only `bg-red-500` would remain in the class string.

---

## Step 11 — Add tailwind-merge

### Command
```powershell
npm install tailwind-merge
```

Like `clsx`, `tailwind-merge` is a **runtime** dependency — it runs in the browser on
every render to compute the final class string.

### What it does
`twMerge` takes multiple class strings and merges them, removing any classes that
conflict with a later class of the same type (e.g. two `bg-*` classes, two `text-*`
classes). The last value always wins.

### Files modified

#### `src/components/Button.tsx`
```tsx
import { twMerge } from 'tailwind-merge'

<button
  className={twMerge('px-4 py-2 rounded bg-blue-500 text-white', className)}
>
```

### Result
Before (with string concatenation):
```html
<button class="px-4 py-2 rounded bg-blue-500 text-white bg-red-500">
```
After (with `twMerge`):
```html
<button class="px-4 py-2 rounded text-white bg-red-500">
```
`bg-blue-500` is removed because it conflicts with the later `bg-red-500`. The override
is now guaranteed regardless of Tailwind's stylesheet order.

---

## Step 12 — The `cn()` helper

Rather than importing `clsx` and `twMerge` separately in every component, the
conventional pattern is to combine them into a single `cn()` utility.

### File added

#### `src/lib/cn.ts`
```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

`clsx` runs first, resolving all conditionals into a single class string.
`twMerge` runs second, removing any conflicting Tailwind classes from that string.

### Files updated
- `src/components/Button.tsx` — replaced `twMerge` import with `cn`
- `src/pages/QuizListPage.tsx` — replaced `clsx` import with `cn`

### One of the two calls may be a no-op

`cn()` always runs both `clsx` and `twMerge`, even when only one is needed:

| Situation | `clsx` does | `twMerge` does |
|-----------|-------------|----------------|
| `QuizListPage` — conditional classes, no overrides | resolves conditionals | no conflicts to remove — no-op |
| `Button` — fixed base classes + override | joins strings trivially | removes conflicting class — does real work |

The overhead is negligible. The benefit is a single import and a consistent answer
to "which utility do I use here?" — always `cn()`, never a judgment call.

### When NOT to use `cn()`
- **Plain static string, no `className` prop** → skip `cn()`, it adds nothing
- **Reusable component accepting a `className` prop** → always use `cn()`
- **Needs conditional classes** → use `cn()` for the `clsx` behaviour

---

## Step 13 — Local state with useState (before React Context)

To motivate global state, we first added a "mark as completed" toggle using local
component state.

### File modified

#### `src/pages/QuizDetailPage.tsx`
```tsx
import { useState } from 'react'

const [completed, setCompleted] = useState(false)

<button onClick={() => setCompleted(!completed)}>
  {completed ? '✓ Completed' : 'Mark as completed'}
</button>
```

### The problem
`useState` is **local** — the state lives inside the component instance. When React
Router navigates away from `QuizDetailPage`, the component is fully **unmounted** and
its state is destroyed. Navigating back mounts a fresh instance with `completed: false`.

React Router swaps components in and out via `<Outlet />` — it does not hide them with
CSS. There is no existing instance to return to.

---

## Step 14 — Shared state with React Context

To fix the state loss problem, we lifted the completed state into a React context whose
provider lives in `App.tsx` — which never unmounts.

### Key distinction
- **`QuizProvider`** — a component placed once in `App.tsx` that *owns* the state
- **`useQuizContext`** — a hook any component calls to *read or update* that state

### File added

#### `src/context/QuizContext.tsx`
```tsx
import { createContext, useContext, useState } from 'react'

type QuizContextType = {
  completedIds: string[]
  toggleCompleted: (id: string) => void
}

const QuizContext = createContext<QuizContextType | null>(null)
```

`createContext<QuizContextType | null>(null)` — the `| null` union means the context
value is `null` until a provider is mounted. The `null` default catches the mistake of
using the context outside its provider.

```tsx
export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<string[]>([])

  function toggleCompleted(id: string) {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return (
    <QuizContext.Provider value={{ completedIds, toggleCompleted }}>
      {children}
    </QuizContext.Provider>
  )
}
```

`setCompletedIds((prev) => ...)` — the functional update form is used because the new
state depends on the previous state. This is the safe pattern to avoid stale state.

```tsx
export function useQuizContext() {
  const ctx = useContext(QuizContext)
  if (!ctx) throw new Error('useQuizContext must be used within a QuizProvider')
  return ctx
}
```

The null check throws a clear error if the hook is called outside `<QuizProvider>`.

### Files modified

#### `src/App.tsx` — wrapped app in provider
```tsx
import { QuizProvider } from './context/QuizContext'

<QuizProvider>
  <BrowserRouter>...</BrowserRouter>
</QuizProvider>
```

#### `src/pages/QuizDetailPage.tsx` — reads from context instead of local state
```tsx
import { useQuizContext } from '../context/QuizContext'

const { completedIds, toggleCompleted } = useQuizContext()
const completed = completedIds.includes(id!)

<button onClick={() => toggleCompleted(id!)}>
  {completed ? '✓ Completed' : 'Mark as completed'}
</button>
```

### Result
Completed state now survives navigation — `QuizProvider` stays mounted in `App.tsx`
while page components mount and unmount freely beneath it.

### Limitation of React Context
React context is not optimised for frequent updates. When any value in the context
changes, **every component that consumes that context re-renders**, even if the specific
value it cares about didn't change.

For example, if `QuizContext` held both `completedIds` and an unrelated `searchQuery`,
updating `searchQuery` would re-render every component that calls `useQuizContext()` —
including those that only care about `completedIds`.

For low-frequency, low-complexity state this is acceptable. For anything larger or more
frequently updated, this becomes a performance problem. This is one of the key problems
Zustand solves — it allows components to subscribe to only the specific slice of state
they need, so unrelated updates don't trigger unnecessary re-renders.

---

## Step 15 — Demonstrating the React Context re-render problem

To make the limitation visible, we added a `searchQuery` to `QuizContext` and a
`console.log` to `Layout` to observe unnecessary re-renders.

### Files modified

#### `src/context/QuizContext.tsx` — added `searchQuery`
```tsx
type QuizContextType = {
  completedIds: string[]
  toggleCompleted: (id: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

// inside QuizProvider:
const [searchQuery, setSearchQuery] = useState('')
```

#### `src/pages/QuizListPage.tsx` — added search input
```tsx
const { searchQuery, setSearchQuery } = useQuizContext()

<input
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  placeholder="Search quizzes..."
/>
```

#### `src/components/Layout.tsx` — added console.log to observe re-renders
```tsx
const { completedIds } = useQuizContext()
console.log('Layout rendered', completedIds)
```

### What we observed
Typing in the search box triggers `console.log` in `Layout` on every keystroke —
even though `Layout` only uses `completedIds` and not `searchQuery`. Both are in the
same context object, so any update to either value re-renders all consumers.

Note: two log messages appear per keystroke because React `StrictMode` intentionally
double-renders components in development to surface bugs. The doubling is expected.

This is the problem Zustand solves next.

---

## Step 16b — Filter quizzes using Zustand searchQuery

A small addition to make the search input functional before moving on to React Query.

### File modified

#### `src/pages/QuizListPage.tsx`
```tsx
const filteredQuizzes = quizzes.filter((quiz) =>
  quiz.name.toLowerCase().includes(searchQuery.toLowerCase())
)

// use filteredQuizzes in .map() instead of quizzes
{filteredQuizzes.map((quiz) => ( ... ))}
```

The filter reads `searchQuery` from Zustand and derives the displayed list from it.
Because `filteredQuizzes` is derived inside the component, it recomputes on every
render triggered by `searchQuery` changing — no extra state needed.

### Can memoization fix the React Context re-render problem?
Yes, but at the cost of significant complexity. Two common approaches:

**1. Split into multiple contexts** — one per concern:
```tsx
const CompletedContext = createContext(...)
const SearchContext = createContext(...)
```
Components consuming `CompletedContext` won't re-render when `SearchContext` changes.
But you now need a separate provider for each, and components must import from multiple
contexts. Gets unwieldy as the app grows.

**2. `useMemo` to stabilize values** — memoize the context value so it only changes
when specific dependencies change. Complex to set up correctly and easy to get wrong.

The deeper issue is that context was designed for infrequently changing values like
themes or auth — not for application state that updates frequently. Zustand was
purpose-built for that problem, which is why it's the cleaner solution.

---

## Step 16 — Replace React Context with Zustand

### Command
```powershell
npm install zustand
```

Like `clsx` and `tailwind-merge`, Zustand is a **runtime** dependency — it runs in
the browser to manage state.

### What it does
Zustand is a minimal global state library. Instead of a provider wrapping the app,
you define a store as a plain hook. Components subscribe to only the slices of state
they need via a selector function — unrelated state changes do not trigger re-renders.

### File added

#### `src/store/QuizStore.ts`
```ts
import { create } from 'zustand'

type QuizStore = {
  completedIds: string[]
  searchQuery: string
  toggleCompleted: (id: string) => void
  setSearchQuery: (query: string) => void
}

export const useQuizStore = create<QuizStore>((set) => ({
  completedIds: [],
  searchQuery: '',
  toggleCompleted: (id) =>
    set((state) => ({
      completedIds: state.completedIds.includes(id)
        ? state.completedIds.filter((x) => x !== id)
        : [...state.completedIds, id],
    })),
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
```

`create<QuizStore>((set) => ...)` — the `set` function updates state. For updates that
depend on previous state (like `toggleCompleted`), a function is passed to `set` —
the same safe pattern as React's `useState` functional update form.

### How components subscribe
Each component calls `useQuizStore` with a **selector** — a function that picks the
specific slice it needs:
```ts
const completedIds = useQuizStore((state) => state.completedIds)
const toggleCompleted = useQuizStore((state) => state.toggleCompleted)
```
The component only re-renders when the selected value changes. A component selecting
`completedIds` will not re-render when `searchQuery` changes.

### Files modified
- `src/pages/QuizDetailPage.tsx` — replaced `useQuizContext` with `useQuizStore`
- `src/pages/QuizListPage.tsx` — replaced `useQuizContext` with `useQuizStore`
- `src/App.tsx` — removed `QuizProvider` wrapper (Zustand needs no provider)
- `src/components/Layout.tsx` — removed `useQuizStore` and `console.log` (no longer needed)

### Files deleted
- `src/context/QuizContext.tsx` — replaced entirely by the Zustand store

### Result
Typing in the search box no longer triggers any re-renders in `Layout` — confirmed by
the absence of console output. Toggling completed still works correctly and state
survives navigation.
