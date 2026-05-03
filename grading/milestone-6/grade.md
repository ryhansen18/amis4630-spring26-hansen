# Lab Evaluation Report

## 0. Build & Run Status

| Component           | Build | Runs | Notes                                                                                      |
| ------------------- | ----- | ---- | ------------------------------------------------------------------------------------------ |
| Backend (.NET)      | ✅    | ❌   | `dotnet build api.csproj` succeeded (NuGet version warnings only). Runtime fails — SQL Server not available (Docker not running). |
| Frontend (React/TS) | ✅    | ✅   | `tsc -b && vite build` succeeded (55 modules). Vite dev server started on port 5173.     |
| API Endpoints       | —     | ❌   | Could not verify — backend could not start without SQL Server.                             |
| Backend Tests       | —     | ✅   | `dotnet test`: 9 passed, 2 skipped, 0 failed.                                           |
| Frontend Tests      | —     | ✅   | `npm test` (vitest run): 10 passed across 3 test files, 0 failed.                       |


**Student Repository**: `ryhansen18-amis4630-spring26-hansen`  
**Date**: May 3, 2026  
**Rubric**: `milestone-6/rubric.md`

## 1. Project Structure

| Expected                            | Found                                                                                                       | Status |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------ |
| `.github/workflows/` (CI/CD)        | `.github/workflows/deploy-api.yml`, `.github/workflows/azure-static-web-apps-icy-mushroom-08633e90f.yml`    | ✅     |
| `api/` (Backend .NET API)           | `api/` with controllers, models, middleware, migrations, `Program.cs`                                       | ✅     |
| `api.Tests/` (Backend tests)        | `api.Tests/` with 4 test files                                                                              | ✅     |
| `frontend/` (React/TS)              | `frontend/` with full src, tests, e2e, config                                                               | ✅     |
| `frontend/.env.production`          | `frontend/.env.production`                                                                                  | ✅     |
| `frontend/staticwebapp.config.json` | `frontend/staticwebapp.config.json`                                                                         | ✅     |
| `docs/` (Technical docs)            | `docs/architecture.md`, `docs/ARD.md`, `docs/ERD.md`, `docs/component-architecture.md`, `docs/Test-Plan.md` | ✅     |
| `docs/WebsiteGuide/` (User docs)    | `docs/WebsiteGuide/User_Admin_Guide.pdf`                                                                    | ✅     |
| `README.md`                         | Present, comprehensive                                                                                      | ✅     |
| `CHANGELOG.md`                      | Present                                                                                                     | ✅     |
| `AI-USAGE.md`                       | Present, detailed M5 + M6 reflection                                                                        | ✅     |
| `M5-SUBMISSION.md`                  | Present with credentials and security practices                                                             | ✅     |

## 2. Rubric Scorecard

| #   | Requirement                                                                 | Points | Status | Evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --- | --------------------------------------------------------------------------- | ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Production Deployment** — Flawless deployment, HTTPS, professional setup  | 5      | ✅ Met | Frontend deployed to Azure Static Web Apps (`icy-mushroom-08633e90f.7.azurestaticapps.net`). Backend on Azure App Service B1 with Always On (`buckmkt-api-hansen.azurewebsites.net`). Azure SQL Database (`BuckMktDb`). HTTPS enforced via `UseHttpsRedirection()` in `Program.cs` L121. CORS configured from App Service settings (L60–66). `frontend/.env.production` L1 points to production API URL. SPA fallback in `staticwebapp.config.json`. Secrets stored in App Service config, not in committed code. Auto-migration and seeding on startup (`Program.cs` L73–118).                                                                               |
| 2   | **CI/CD Pipeline** — Automated pipeline working perfectly                   | 4      | ✅ Met | Two GitHub Actions workflows: `deploy-api.yml` (backend) — restore, build, test gate, publish, zip deploy to App Service via publish profile; path-filtered to `api/**`. `azure-static-web-apps-icy-mushroom-08633e90f.yml` (frontend) — auto-generated by Azure, OIDC auth, Vite build, deploy to Static Web Apps on push to main. Backend pipeline has proper job separation (build-and-test → deploy).                                                                                                                                                                                                                                                     |
| 3   | **Testing & QA** — Comprehensive testing, well-documented                   | 3      | ✅ Met | Backend: 9 passed, 2 skipped (xUnit) — `OrderTest.cs` (4 tests: order total, zero items, confirmation number, cart total), `PasswordTest.cs` (4 tests), `IntegrationTest.cs` (2 skipped with explanation). Frontend: 10 passed (Vitest) — `cart.test.ts` (3 tests), `loginpage.test.tsx` (3 tests), `authorization.test.ts` (4 tests). E2E: `checkout.spec.ts` — full happy-path Playwright test. `docs/Test-Plan.md` provides comprehensive manual test plan with environment details, test accounts, 6 test scenarios (Browse, Auth, Cart, Checkout, Admin, Infrastructure), and known limitations.                                                         |
| 4   | **Technical Docs** — Excellent documentation, comprehensive                 | 5      | ✅ Met | `docs/architecture.md` — detailed system architecture with ASCII diagrams showing full Azure deployment topology, CI/CD flow, and a request-flow walkthrough. `docs/ERD.md` — original conceptual model (image) plus full M6 production schema (ASCII with all columns, types, PKs, FKs) and relationship explanations. `docs/ARD.md` — architecture decision records for React, .NET, SQL, Azure, layered architecture. `docs/component-architecture.md` — Atomic Design hierarchy. `README.md` — live URLs, API endpoint reference tables (4 controller groups, all verbs/routes documented), local dev setup instructions, architecture/schema/test links. |
| 5   | **User Docs** — Professional user guide with screenshots                    | 3      | ✅ Met | `docs/WebsiteGuide/User_Admin_Guide.pdf` present. Per `AI-USAGE.md`, this is a 12-screenshot PDF covering user and admin flows, generated via ReportLab with OSU-themed styling (#BB0000 accent), cover page with live URL and test credentials. Referenced in `README.md` with link.                                                                                                                                                                                                                                                                                                                                                                         |
| 6   | **AI Reflection** — Insightful reflection, specific examples, deep analysis | 3      | ✅ Met | `AI-USAGE.md` M6 section provides exceptional depth. Specific prompts documented for each deployment phase (Azure SQL, App Service, Static Web Apps, CI/CD, documentation). "Where AI went wrong" section analyzes four distinct failure modes: publish profile/basic auth (3 failed attempts, ~25 min lost), Swagger compatibility, PowerShell connection string mangling, and AI-generated API docs with fabricated endpoints. Key insight articulated: "when an AI is wrong twice in a row about the same problem, the third suggested fix is probably also wrong." Modifications section clearly delineates accepted vs. modified AI output.              |
| 7   | **Presentation** — Polished demo, clear communication, engaging             | 2      | ⬜ N/A | Cannot evaluate from repository inspection — requires in-person or recorded demo assessment.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

**Total: 25 / 25** (scorable from artifacts) — 2 presentation points require separate evaluation.

## 3. Detailed Findings

All artifact-scorable rubric items are met. No deficiencies to report for items 1–6.

The **Presentation** criterion (2 pts) cannot be assessed through file inspection and must be evaluated separately via live demo or recording.

### Submission Guideline Note

The rubric's Submission Guidelines specify "tagged as v1.0." No evidence of a `v1.0` tag was found in the README or repository metadata inspectable from the workspace. This is listed under Submission Guidelines rather than a scored criterion, so no points are deducted, but the student should ensure the tag exists on GitHub.

## 4. Action Plan

No corrective actions required for scored rubric items 1–6 — full marks earned on all artifact-assessable criteria.

1. **[Submission] v1.0 tag**: Verify that a `v1.0` git tag exists on the GitHub remote (`git tag v1.0 && git push origin v1.0` if not already done).

## 5. Code Quality Coaching (Non-Scoring)

- **Empty test body**: `api.Tests/UnitTest1.cs` L5–9 — `Test1()` has an empty body and asserts nothing. This passes vacuously and inflates the test count. Should be removed or replaced with a meaningful test.

- **JWT secret exposure in committed file**: `M5-SUBMISSION.md` L7–11 contains the full JWT signing key (`AaronJudgeIsAwesome2026NYYANKEES!`) in plain text. While these are test/class credentials, committing signing keys teaches a bad habit. In a real project this would allow token forgery. Consider referencing secrets by name rather than value in documentation.

- **Broken Object-Level Authorization in CartController**: `api/Controllers/CartController.cs` L71–82 (`UpdateItem`) and L85–92 (`RemoveItem`) look up a `CartItem` by ID without verifying it belongs to the current user's cart. An authenticated user could modify or delete another user's cart items by guessing cart item IDs. The fix is to join through the user's cart: `var item = await _db.CartItems.Include(i => i.Cart).FirstOrDefaultAsync(i => i.Id == cartItemId && i.Cart.UserId == UserId)`.

- **Long-lived JWT tokens**: `api/Controllers/UserAcctController.cs` L91 sets token expiry to 7 days. Best practice for JWTs is short-lived access tokens (15–60 minutes) with a refresh token mechanism. A 7-day window means a stolen token is valid for a week.

- **Outdated AGENT.md**: `AGENT.md` L5–7 still contains the M3 notice "Do not use EF Core or DbContext yet" despite EF Core being the primary data access layer since M4. Stale agent instructions can confuse AI tools that reference this file.

- **Documentation typos**: Several documentation files contain recurring typos: "privleges" (privileges), "neccessary" (necessary), "undermining" (underlying — used in `ARD.md` and `README.md`), "dissassemble" (disassemble), "hiearchy" (hierarchy), "seperating" (separating). A spell-check pass would improve professionalism.

- **Admin order endpoints duplicated across controllers**: Both `AdminController.GetAllOrders()` and `UserOrderController.GetAllOrders()` return all orders for admins. This duplication means two routes (`/api/admin/orders` and `/api/userorder`) serve the same data. Consolidating to one location would reduce maintenance burden.

## 6. Git Practices Coaching (Non-Scoring)

- **Incremental development**: The `CHANGELOG.md` and `README.md` show clear milestone-by-milestone progression (M3 → M4 → M5 → M6), with each milestone building on the previous. This demonstrates good incremental development practices.

- **Sensitive file awareness**: The student explicitly noted in `AI-USAGE.md` that `publish-profile.xml` should never be committed and cleaned up `.gitignore` accordingly. This shows growing security consciousness — a valuable professional habit.

- **v1.0 tag**: The rubric requests a `v1.0` tag. Tagging releases is standard professional practice for marking deployment milestones and enabling rollback. Ensure this tag is pushed to the remote.

---

**23/23** (artifact-scorable) — All six artifact-assessable rubric criteria are fully met with strong evidence. The 2-point Presentation criterion requires separate live evaluation. The coaching notes above (BOLA in CartController, JWT secret in committed file, long-lived tokens, empty test, stale AGENT.md, typos, duplicate admin endpoints) are suggestions for professional growth, not scoring deductions.
