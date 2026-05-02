# Lab Evaluation Report

**Student Repository**: `ryhansen18/amis4630-spring26-hansen`
**Date**: 2026-03-22
**Rubric**: rubric.md

## 1. Build & Run Status

| Component           | Build | Runs | Notes                                                                                                                               |
| ------------------- | ----- | ---- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Backend (.NET)      | ✅    | ✅   | `dotnet build api.csproj` succeeded. Server starts on `http://localhost:5000` (with roll-forward from net8.0 to available runtime). |
| Frontend (React/TS) | ✅    | ✅   | `npm run build` (`tsc -b && vite build`) succeeded. Vite dev server starts on `http://localhost:5173`.                              |
| API Endpoints       | —     | ✅   | `GET /api/products` → 200 (8 items). `GET /api/products/1` → 200. `GET /api/products/999` → 404.                                    |

### Project Structure Comparison

| Expected    | Found                              | Status |
| ----------- | ---------------------------------- | ------ |
| `/backend`  | `/api` (named "api" not "backend") | ❌     |
| `/frontend` | `/frontend`                        | ✅     |
| `/docs`     | `/docs`                            | ✅     |

> The backend directory is named `api/` instead of the expected `backend/`. This is a naming deviation from the solution layout standard but does not affect functionality or scoring.

## 2. Rubric Scorecard

| #   | Requirement                          | Points | Status | Evidence                                                                                                                                                                                                                                                                       |
| --- | ------------------------------------ | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | React Product List Page              | 5      | ✅ Met | `ProductListPage.tsx` — fetches products via API, renders `ProductCard` components in a grid; loading spinner (L21-26), error state (L28-32), and empty state (L34-38) all handled; uses component hierarchy (`Layout` → `ProductListPage` → `ProductCard`).                   |
| 2   | React Product Detail Page            | 5      | ✅ Met | `ProductDetailPage.tsx` — separate route at `products/:id` (`App.tsx` L14); displays all fields (title, price, category, seller, date, description, image); "← Back to listings" button navigates to `/` (L53-55); `ProductCard` links to detail page (`ProductCard.tsx` L31). |
| 3   | API Endpoint: GET /api/products      | 5      | ✅ Met | `ProductsController.cs` L103 — `[HttpGet] GetAll()` returns `Ok(_products)` (200 with JSON array). In-memory `List<Product>` data store with 8 products (L10-100). Verified live: status 200, 8 items returned.                                                                |
| 4   | API Endpoint: GET /api/products/{id} | 5      | ✅ Met | `ProductsController.cs` L105-112 — `[HttpGet("{id}")] GetById(int id)` returns product by ID or `NotFound()` (404). Verified live: `/api/products/1` → 200, `/api/products/999` → 404.                                                                                         |
| 5   | Frontend-to-API Integration          | 5      | ✅ Met | `api.ts` — `getProducts()` and `getProductById()` fetch from `http://localhost:5000/api/products`. No hardcoded data in components. Error states handled in both `ProductListPage.tsx` (L28-32) and `ProductDetailPage.tsx` (L33). CORS configured in `Program.cs` (L11-18).   |

**Total: 25 / 25**

## 3. Detailed Findings

All rubric items are met. No deficiencies to report.

## 4. Action Plan

No corrective actions required — full marks earned.

## 5. Code Quality Coaching (Non-Scoring)

- **Committed build artifacts**: The `api/bin/` and `api/obj/` directories contain compiled DLLs and build caches that were committed in `f5d0462`. These should be added to `.gitignore` — build outputs bloat the repository and can cause merge conflicts.

- **Directory naming convention**: The backend lives under `api/` rather than the `backend/` directory specified in the solution layout standard. Aligning with the standard improves consistency with course materials and makes it easier for teammates/graders to navigate.

- **Hardcoded API base URL**: `api.ts` has `const API_BASE_URL = "http://localhost:5000"` hardcoded. Using a Vite environment variable (e.g., `import.meta.env.VITE_API_URL`) would make the app easier to deploy to different environments.

- **Duplicate solution files**: Both `amis4630-spring26-hansen.sln` (root) and `api/backend.sln` (inside api/) exist. Having a single solution file at the root is cleaner and avoids confusion about which one to use.

- **Target framework**: The project targets `net8.0` which is a Standard Term Support release (end-of-support Nov 2024). Consider upgrading to `net9.0` or the upcoming `net10.0` LTS for continued support and access to newer APIs.

## 6. Git Practices Coaching (Non-Scoring)

- **Single large commit for milestone work**: The core milestone-3 work was delivered in one commit (`f5d0462` — 84 files, ~5,940 lines). Breaking this into smaller, focused commits (e.g., "Add Product model and controller", "Scaffold React frontend with routing", "Implement ProductListPage", "Implement ProductDetailPage", "Connect frontend to API") makes code review easier and provides a clearer development narrative.

- **Committed build outputs**: Binary files (`*.dll`, `*.exe`, `*.pdb`) and build caches were included in the commit. Add `bin/` and `obj/` to `.gitignore` and remove them from tracking with `git rm -r --cached api/bin api/obj`.

- **Commit messages are descriptive**: The messages themselves (e.g., "Milestone 3: Product Catalog - Vertical Slice 1") are clear and purposeful — good practice to continue.

---

**25/25** — All five rubric criteria are fully met with excellent implementation. The coaching notes above (build artifacts in git, directory naming, API URL configuration, incremental commits) are suggestions for professional growth, not scoring deductions.
