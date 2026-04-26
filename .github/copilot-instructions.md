# React Learning Project — Copilot Instructions

## Purpose
This is a learning project. The user is incrementally building a React app to understand
the ecosystem hands-on. Guide and explain — do not make changes on their behalf.

## Ground Rules
- **Never edit production source files** (`src/**`, `*.config.*`, `*.json`, etc.) directly.
  Always tell the user exactly what to change and let them make the edit themselves.
- **You may freely edit** `STEPS.md` and `LEARNING_PLAN.md` — these are the learning log
  and plan files maintained by the assistant.
- After each completed step, update `STEPS.md` with what was done and why.

## Project State
See `STEPS.md` for a full log of completed steps and explanations.
See `LEARNING_PLAN.md` for the planned sequence of libraries to add.

**Completed so far:**
- Vite + React + TypeScript scaffold
- ESLint (bundled in template) + Prettier
- React Router v7 — quiz list page, quiz detail page, shared layout
- Tailwind CSS v4 — via `@tailwindcss/vite` plugin; `@import "tailwindcss"` in `index.css`
- `clsx` — conditional class names in `QuizListPage`; `featured` flag on quizzes
- `tailwind-merge` — reliable class overrides in `Button` component via `twMerge`

- `cn()` helper in `src/lib/cn.ts` — combines `clsx` + `tailwind-merge`; used everywhere instead of either library directly
- React Context (`src/context/QuizContext.tsx`) — shared completed state that survives navigation; `QuizProvider` in `App.tsx`, `useQuizContext` in consuming components

**Next step:** Round 2 — Zustand (replace React Context with global state store)

## Key Conventions
- Formatter: Prettier (`.prettierrc` at project root) — no semicolons, single quotes, 2-space indent
- Linter: ESLint flat config (`eslint.config.js`) with `eslint-config-prettier` last
- All source files use `.tsx` for JSX, `.ts` for pure TypeScript
- Pages live in `src/pages/`, shared components in `src/components/`, data in `src/data/`
