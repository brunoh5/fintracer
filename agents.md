
# FintracerOS — Project Instructions

## Project structure
- This is a monorepo.
- The frontend is located in `apps/web`.
- The backend is located in `apps/api`.
- Other packages may contain shared code.

## Scope restrictions
- Your default scope is the frontend in `apps/web`.
- Do not modify backend files in `apps/api`.
- Do not modify database migrations, schemas, backend services,
  authentication logic, or API routes.
- Do not change root package configuration or workspace
  configuration unless explicitly requested.
- Do not install dependencies or change dependency versions
  without asking first.

## Backend integration
- Treat the existing backend API as the source of truth.
- Inspect existing API contracts and frontend API utilities
  before implementing requests.
- Do not invent API endpoints, request fields, or response shapes.
- If the frontend requires a backend change, explain the blocker
  and ask before modifying the backend.

## Workflow
- Inspect the relevant code before making changes.
- Reuse existing components, conventions, and dependencies.
- Keep changes small and focused on the requested task.
- Run the appropriate frontend lint, typecheck, tests, or build.
- Report changed files, validation results, and any remaining issues.
