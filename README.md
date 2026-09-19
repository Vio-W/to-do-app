# Task 1 — Lessons 3.1–3.5: Live, Multi-Page, Data-Driven App

## What's in here
Drop these into your existing Vite React+TS project (e.g. `interactive_mini_app/product-catalog`), replacing/adding files at the matching paths:

```
src/
  types.ts
  App.tsx
  main.tsx
  styles.css
  components/
    AddTodo.tsx
    TodoList.tsx
    FilterBar.tsx
    WindowWidth.tsx
  pages/
    TodosPage.tsx
    UsersPage.tsx
    UserDetailPage.tsx
    NotFound.tsx
```

## Setup
```bash
npm install react-router-dom
npm run dev
```
Then visit `/todos`, `/users`, `/users/1` (or any id 1-10), and a garbage URL like `/nonsense` to see the 404.

## Architecture notes
- **State ownership**: `TodosPage` (the `TodoApp`) is the only component holding the `todos` array and `filter`. `AddTodo`, `TodoList`, and `FilterBar` are pure — they receive data via props and report changes via callbacks (`onAdd`, `onToggle`, `onDelete`, `onFilterChange`, `onClearCompleted`). "Clear completed" filters out any todo with `completed: true`.
- **Live effect**: `WindowWidth` subscribes to `window.resize` with an empty dependency array (it reads nothing external) and unsubscribes in the cleanup function.
- **Data fetching**: `UsersPage` and `UserDetailPage` each use a `cancelled` boolean closed over inside `useEffect`, flipped to `true` in the cleanup. This stops a slow/late response from calling `setState` after the component unmounts or after the `id` param changes (race condition guard). Both render all four states: loading (skeleton), error, empty, and data.
- **Routing**: `BrowserRouter` in `main.tsx`, `Routes`/`Route` in `App.tsx` for `/todos`, `/users`, `/users/:id`, and a `path="*"` catch-all `NotFound`. Nav uses `NavLink` (client-side, no reloads). `UserDetailPage` reads the id with `useParams` and re-fetches whenever it changes.

## One sentence per effect (deliverable #3)
- **WindowWidth's resize effect**: cleanup removes the `resize` listener on unmount, preventing a "setState on an unmounted component" warning and a leaked listener that would otherwise keep firing forever.
- **UsersPage's fetch effect**: cleanup sets `cancelled = true` on unmount, preventing a late directory response from writing into state after the user has already navigated away.
- **UserDetailPage's fetch effect**: cleanup sets `cancelled = true` whenever `id` changes (or on unmount), preventing a slow response for the *previous* user id from overwriting the data for the *newly selected* user id.

## Still to do before submitting
1. `npm run build` once locally to confirm no TypeScript errors in your actual project (this was written outside your repo's exact tsconfig, so double-check strict-mode edge cases).
2. Push to `main` and confirm the GitHub Pages/deploy link (if used) reflects the live app.
3. Record/screenshot: todo filtering + clearing, directory loading→loaded, `/users/:id` opened directly via URL bar, and a garbage URL hitting 404.
