# React Learning Plan

A suggested order for incrementally adding libraries to this project,
grouped by how foundational each concept is.

---

## SSR & Framework Options (future consideration)

Once the fundamentals are solid, SSR (Server-Side Rendering) is worth exploring.
All options below work alongside a separate backend (e.g. Spring Boot REST API) —
they handle the SSR layer in Node.js, not the data layer.

| Tool | Routing | SSR | Full-stack | Notes |
|------|---------|-----|------------|-------|
| React Router v7 (client mode) | ✓ | ✗ | ✗ | What this project uses |
| React Router v7 (framework mode) | ✓ | ✓ | ✓ | Remix merged into RR v7 — no separate Remix package needed. Requires a Node.js server. |
| Next.js | ✓ | ✓ | ✓ | Largest ecosystem, most job market demand. Requires Node.js. Uses file-based routing instead of `App.tsx` config. |
| TanStack Start | ✓ | ✓ | ✓ | Newer, less proven in production (as of 2026). Uses TanStack Router. |

**Architecture with SSR + Spring Boot:**
```
Browser → Next.js or RR v7 framework mode → Spring Boot REST API
           (Node.js, handles SSR)             (Java, handles data)
```
The Node.js SSR layer and the Spring Boot API are separate services.
Spring Boot does not need to change.

---

## Round 1 — Structure & Styling

### 1. `react-router`
Client-side navigation between pages. Without routing the app is a single screen,
which limits what you can build to learn everything else.

### 2. `tailwindcss`
Utility-first CSS framework. Add early so all subsequent work can be styled properly.

### 3. `clsx` + `tailwind-merge`
Small utilities needed as soon as you start writing Tailwind class names conditionally.
- `clsx` — conditionally joins class name strings
- `tailwind-merge` — merges Tailwind classes without conflicts (e.g. when overriding)

---

## Round 2 — State Management

### 4. `zustand`
Minimal global state management. Good to understand the problem it solves (prop
drilling) before adding more complexity.

### 5. `@tanstack/react-query`
Server state — fetching, caching, loading and error states. Best learned after
Zustand so the distinction between *client state* and *server state* is clear.

---

## Round 3 — Forms & Validation

### 6. `zod`
Schema-based validation library. Learn in isolation first — it is useful well
beyond forms (API response validation, environment variable parsing, etc.).

### 7. `react-hook-form` + `@hookform/resolvers`
Performant form state management. Wire it up to Zod via `@hookform/resolvers`
for end-to-end validated forms.

---

## Round 4 — UI Primitives

### 8. `radix-ui`
Headless, accessible UI component primitives (dropdowns, dialogs, tooltips, etc.).
Makes more sense after Tailwind is in place, since Radix provides behaviour with
no built-in styles — you style everything yourself.

### 9. `lucide-react`
SVG icon library. Trivial to add at any point.

### 10. `class-variance-authority` (CVA)
Type-safe component variant patterns — e.g. a Button with `variant="primary"` vs
`variant="destructive"`. Natural last step once Tailwind and Radix are working together.

### 11. `shadcn/ui`
Pre-built component library that combines Radix UI + Tailwind + CVA + `cn()` into
ready-to-use components (dialogs, dropdowns, buttons, etc.). Add after the individual
pieces are understood — shadcn/ui will then make complete sense rather than being a
black box. Components are copied into your codebase (not installed as a package), so
you own the code and can customise freely.

---

## Round 5 — Testing

### 12. `vitest` + `@testing-library/react`
Unit and component tests. Add once there are real components with meaningful logic
to test.

### 13. `@playwright/test`
End-to-end browser tests. Leave until there are real pages and user flows to test.
