# Next.js Layout Optimization Design

## Overview

Optimize Next.js App Router architecture: add loading/error boundaries, fix hydration risks, implement nested layouts for better code organization.

## Current State

- 52 pages with `'use client'` (out of ~60)
- 3 `loading.tsx` files (out of ~25 routes)
- 1 `error.tsx` file (root only)
- Several `window.innerWidth` calls without SSR protection

## Target Architecture

### Directory Structure

```
app/
├── layout.tsx              # root (no changes)
├── page.tsx
├── providers.tsx
│
├── (main)/                 # route group for main app
│   ├── layout.tsx          # NavigationLayout wrapper
│   ├── loading.tsx         # skeleton for library
│   ├── error.tsx           # error boundary
│   └── l/[section]/page.tsx
│
├── settings/
│   ├── layout.tsx          # SettingsLayout (sidebar + header)
│   ├── loading.tsx         # skeleton for settings
│   ├── error.tsx           # error boundary
│   └── */page.tsx
│
├── auth/
│   ├── layout.tsx          # AuthLayout (centered form)
│   ├── loading.tsx         # simple spinner
│   ├── error.tsx           # error boundary
│   └── */page.tsx
│
├── tools/
│   ├── loading.tsx         # simple spinner
│   ├── error.tsx           # error boundary
│   └── */page.tsx
│
└── (static)/               # static pages (Server Components)
    ├── about/page.tsx      # remove 'use client'
    ├── terms/page.tsx
    └── support/page.tsx
```

## Implementation Details

### 1. Hydration Fixes

**Problem locations:**
- `app/l/[section]/page.tsx:27-29` - `defaultEvaluator` with `window.innerWidth`
- `app/settings/page.tsx:13` - direct `window.innerWidth` access

**Solution pattern - SSR-safe defaults:**

```typescript
// Before (dangerous)
const [showNav, setShowNav] = usePersistedState({
  key: 'nav-show-menu',
  initialValue: false,
  defaultEvaluator: () => window.innerWidth > 1000  // SSR crash!
})

// After (safe)
const [showNav, setShowNav, isLoading] = usePersistedState({
  key: 'nav-show-menu',
  initialValue: true,  // SSR-safe default
})

useEffect(() => {
  if (!isLoading && window.innerWidth <= 1000) {
    setShowNav(false)
  }
}, [isLoading])
```

**Principle:** Always render "desktop" version on server, adjust on client after hydration.

### 2. Loading States

**Library skeleton (`(main)/loading.tsx`):**
- Header skeleton bar
- Grid of 6 card placeholders with pulse animation

**Settings skeleton (`settings/loading.tsx`):**
- Sidebar with 8 menu item placeholders
- Content area with title and form placeholders

**Simple spinner (`auth/loading.tsx`, `tools/loading.tsx`):**
- Centered spinner component
- Minimal, fast to render

### 3. Error Boundaries

**Reusable component (`components/errors/ErrorFallback.tsx`):**
```typescript
interface ErrorFallbackProps {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
  showDetails?: boolean  // true in development
}
```

**Per-group error files:**
| File | Title |
|------|-------|
| `app/(main)/error.tsx` | "Library loading error" |
| `app/settings/error.tsx` | "Settings error" |
| `app/auth/error.tsx` | "Authorization error" |
| `app/tools/error.tsx` | "Tools error" |

### 4. Nested Layouts

**Settings Layout:**
- Sidebar with SettingsMenu component
- Main content area for page content
- Removes duplication from 15+ settings pages

**Auth Layout:**
- Centered card with logo
- Consistent auth form styling
- Removes duplication from 8+ auth pages

**Main Layout:**
- Wraps NavigationLayout
- Provides consistent navigation for library pages

### 5. Static Pages (Server Components)

Convert to Server Components (remove `'use client'`):
- `/about` - already works as Server Component
- `/terms` - extract `useSearchParams` to client component
- `/support` - extract Intercom logic to client component

## Files to Create

| File | Type | Description |
|------|------|-------------|
| `components/errors/ErrorFallback.tsx` | Component | Reusable error UI |
| `app/(main)/layout.tsx` | Layout | Navigation wrapper |
| `app/(main)/loading.tsx` | Loading | Library skeleton |
| `app/(main)/error.tsx` | Error | Library error boundary |
| `app/settings/layout.tsx` | Layout | Settings sidebar |
| `app/settings/loading.tsx` | Loading | Settings skeleton |
| `app/settings/error.tsx` | Error | Settings error boundary |
| `app/auth/layout.tsx` | Layout | Centered auth form |
| `app/auth/loading.tsx` | Loading | Spinner |
| `app/auth/error.tsx` | Error | Auth error boundary |
| `app/tools/loading.tsx` | Loading | Spinner |
| `app/tools/error.tsx` | Error | Tools error boundary |

## Files to Modify

| File | Change |
|------|--------|
| `app/l/[section]/page.tsx` | Remove `defaultEvaluator`, add useEffect |
| `app/settings/page.tsx` | Wrap `window.innerWidth` in useEffect |
| `lib/hooks/usePersistedState.tsx` | Call `defaultEvaluator` only in useEffect |
| `app/terms/page.tsx` | Extract client logic, make Server Component |
| `app/support/page.tsx` | Extract Intercom logic, make Server Component |

## Migration Strategy

1. **Phase 1: Stability** - Fix hydration issues (3 files)
2. **Phase 2: Error Boundaries** - Add error.tsx files (4 files)
3. **Phase 3: Loading States** - Add loading.tsx files (4 files)
4. **Phase 4: Layouts** - Create nested layouts, move l/[section] to (main)/ group
5. **Phase 5: Static Pages** - Convert to Server Components (optional)

Each phase is independent and doesn't break previous work.

## Success Criteria

- [ ] No hydration mismatch warnings in console
- [ ] All major routes have loading.tsx
- [ ] All major routes have error.tsx
- [ ] Settings pages share common layout
- [ ] Auth pages share common layout
- [ ] Static pages render on server (no JS required)
