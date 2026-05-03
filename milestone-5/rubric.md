
## Grading Rubric (25 points)

| Criterion                  | Excellent (90-100%)                                                                                                                                                | Good (80-89%)                  | Satisfactory (70-79%)        | Needs Work (<70%)               | Points |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ---------------------------- | ------------------------------- | ------ |
| **Authentication Backend** | Secure JWT implementation; registration/login working; password hashing; role-based auth                                                                           | Good auth with minor issues    | Basic auth working           | Security issues or broken       | 5      |
| **Protected Endpoints**    | All endpoints properly secured; correct 401/403 responses; admin role enforced                                                                                     | Most endpoints secured         | Basic protection in place    | Weak or missing security        | 3      |
| **Frontend Auth**          | Seamless login/register flow; JWT handling; protected routes; token in requests                                                                                    | Good auth UX with minor issues | Basic auth working           | Confusing or broken             | 4      |
| **Order Flow**             | Checkout, confirmation, order history all working; cart cleared after order                                                                                        | Good order flow, minor bugs    | Basic order creation working | Incomplete or broken            | 5      |
| **Admin Features**         | Admin panel with product CRUD and order management; proper role restriction                                                                                        | Good admin features            | Basic admin CRUD working     | Limited or insecure             | 4      |
| **Testing & Security**     | All automated tests pass on fresh clone (3+ backend unit, 1+ integration, 3+ frontend, 1 Playwright E2E); 3+ security practices applied; vulnerabilities addressed | Tests pass with minor gaps     | Test floor met but flaky     | Tests missing or failing        | 2      |
| **Code Quality**           | Clean, secure code; consistent patterns; AI usage documented                                                                                                       | Good code quality              | Adequate code                | Poor quality or security issues | 2      |

### Point Breakdown Detail

#### Authentication Backend (5 points)

- Registration and login endpoints: 2 pts
- JWT token generation: 1 pt
- Password hashing: 1 pt
- Role-based authorization: 1 pt

#### Protected Endpoints (3 points)

- JWT middleware configured: 1 pt
- [Authorize] on protected endpoints: 1 pt
- Admin role enforcement + proper error codes: 1 pt

#### Frontend Auth (4 points)

- Login/registration pages: 2 pts
- Token storage and auth context: 1 pt
- Protected routes + auto token inclusion: 1 pt

#### Order Flow (5 points)

- POST /api/orders creates order from cart: 2 pts
- Checkout page with shipping form: 1 pt
- Order confirmation + cart cleared: 1 pt
- Order history page: 1 pt

#### Admin Features (4 points)

- Admin dashboard with role restriction: 1 pt
- Product management CRUD: 2 pts
- Order status management: 1 pt

#### Testing & Security (2 points)

- Automated tests pass on a fresh clone — 3+ backend unit, 1+ integration, 3+ frontend unit, 1 Playwright MCP E2E spec: 1 pt
- Security practices applied (3+ from the W13 checklist) and vulnerabilities addressed: 1 pt

> **Floor**: any submission with zero passing automated tests (`dotnet test` or `npm test`) earns 0 of 2 on this row regardless of other testing artifacts.

#### Code Quality (2 points)

- Clean organization and patterns: 1 pt
- AI usage documented: 1 pt

---

## Submission Guidelines

- Push code to GitHub repository (make sure `main` builds — graders will pull `main`)
- Submit via Carmen Canvas: GitHub repository link + commit hash you want graded
- Add a top-level `SUBMISSION.md` to your repo containing:
  - Test credentials for one regular user **and** one admin user (email + password)
  - Brief description of the 3+ security practices you applied (1–2 sentences each)
  - Link to your `AI-USAGE.md` documenting how you used Copilot/Claude (required for the AI usage point)
- Confirm before submitting:
  - [ ] `dotnet build` succeeds with zero warnings related to your code
  - [ ] `dotnet test` passes (3+ unit tests, 1+ integration test)
  - [ ] `npm test -- --run` passes in the React project (3+ component/unit tests)
  - [ ] `npx playwright test` runs the committed E2E spec end-to-end
  - [ ] No secrets committed (run `git grep -i "Jwt:Key\|password\|secret"` and review)
  - [ ] Admin user is seeded on a fresh database
- Due: **Friday, April 10 by 11:59 PM** (Week 13)