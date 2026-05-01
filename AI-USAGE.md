# AI Usage — Milestone 5

## What AI models were used?
- **GitHub Copilot (Gemini 2.5 Pro)** — Used within VSCode for code generation and problem solving (support for Opus within student dev pack has ended)
- **Claude.ai (Sonnet 4.6)** — general guidance and step-by-step development
- **Claude Code (Sonnet 4.6)** — code debugging and "learn by doing" purposes

## What prompts were used?

**Initial Prompting**
Similar to prompt engineering tactics I've learned from class/prior internship experience, I executed the following prompt as a means for any AI model to then adjust where neccessary if the prompt I developed wasn't working up to par

"You are a (relevant role, likely fullstack developer) specializing in (relevant skill to what prompt will be utilized for). You've been assigned (some given deliverable, project, etc) to be completed in a highly effective manner. Utilize (coding patterns or information deposited into repo, maybe an individual file within the project) when completing the task. Prioritize deep reasoning within your output for purposes of code explanation so I can learn what given bodies of code accomplish, or support (what).

**Identity + JWT:**
"You are a senior .NET developer specializing in ASP.NET Core security and authentication. You've been assigned the task of configuring ASP.NET Core Identity with JWT bearer authentication for an existing marketplace API. Utilize the existing AGENTS.md and project structure as a reference when completing the task. Prioritize deep reasoning within your output, explaining what each piece does and why it's structured that way."

**Authorization controller:**
"You are a senior .NET developer specializing in RESTful API design. You've been assigned the task of building a user account controller with register and login endpoints that return JWT tokens with role claims. Utilize the existing controller patterns in the project as a reference. Prioritize deep reasoning within your output, explaining the token generation logic and security considerations."

**Order entities:**
"You are a senior .NET developer specializing in Entity Framework Core and domain modeling. You've been assigned the task of creating Order and PurchasedItem models for a marketplace app with a one-to-many relationship and proper navigation properties. Utilize the existing Cart and CartItem models as a reference. Prioritize deep reasoning within your output, explaining the relationship structure and why PurchasedItem stores a snapshot of product data."

**UserOrderController:**
"You are a senior .NET developer specializing in e-commerce API design. You've been assigned the task of building an order controller that creates an order from the current user's cart, clears the cart after checkout, generates a confirmation number, and exposes an order history endpoint scoped to the JWT user. Utilize the existing CartController as a reference. Prioritize deep reasoning within your output, explaining the cart-to-order mapping and how broken object-level authorization is prevented."

**AdminController:**
"You are a senior .NET developer specializing in role-based API security. You've been assigned the task of building an admin controller with full product CRUD and an endpoint to view all orders, locked behind the Admin role. Utilize the existing ProductsController and UserOrderController as a reference. Prioritize deep reasoning within your output, explaining how role enforcement works and why admin endpoints are separated into their own controller."

**Frontend authorization context:**
"You are a senior React developer specializing in authentication flows and state management. You've been assigned the task of building an auth context that reads a JWT from localStorage, parses the claims, and exposes user state across the app. Utilize the existing CartContext and CartProvider as a reference when completing the task. Prioritize deep reasoning within your output, explaining the token parsing approach and why lazy initialization was used."

**Login and registration pages:**
"You are a senior React developer specializing in form design and UX. You've been assigned the task of building login and registration pages that call the auth API, store the JWT token, and redirect to the homepage on success. Utilize the existing page structure and CSS module design system as a reference. Prioritize deep reasoning within your output, explaining error handling and the overall auth flow."

**Protected routes:**
"You are a senior React developer specializing in routing and access control. You've been assigned the task of building a RequireAuth wrapper component that redirects unauthenticated users to the login page. Utilize the existing React Router setup in App.tsx as a reference. Prioritize deep reasoning within your output, explaining why a wrapper component was used."

**Checkout, confirmation, and order history pages:**
"You are a senior React developer specializing in e-commerce UX. You've been assigned the task of building a checkout page with an order summary and shipping address form, an order confirmation page displaying confirmation number and order details, and an order history page showing past orders. Utilize the existing CartPage and page patterns as a reference. Prioritize deep reasoning within your output, explaining the form submission flow and how order state is passed between pages."

**Admin dashboard:**
"You are a senior React developer specializing in admin tooling and role-based UI. You've been assigned the task of building an admin dashboard with a tabbed interface for product management and order viewing, where product CRUD operations call the admin API. Utilize the existing page and CSS module patterns as a reference. Prioritize deep reasoning within your output, explaining the tab state management and inline form approach."

**Tests:**
"You are a senior full-stack developer specializing in test-driven development. You've been assigned the task of writing xUnit unit tests for order total calculation and password validation, a Vitest test for the cart reducer, a React Testing Library test for the login page component, and a Playwright E2E test covering the full happy path from registration through checkout. Utilize the existing models and components as a reference. Prioritize deep reasoning within your output, explaining what each test is verifying and why."

## Modifications made based upon output
- JWT and Identity configuration was mostly accepted as generated
- Had to manually fix namespace casing issues (api vs Api) that caused build failures
- CartProvider needed a fix to silently handle 401s when the user isn't logged in
- Login page test needed `getByRole('heading')` instead of `getByText` because the button and heading both said "Sign In"
- Playwright test selector was changed from a text selector to aria-label after the initial run failed
- AdminDashboard import had to be split between api.ts and adminApi.ts after getProducts wasn't found in adminApi
- AuthProvider useEffect lint error fixed by switching to lazy state initialization

# AI Usage — Milestone 6

## Initial Process
- Kept critical detail of entire project (specifically in this case M6) timeline. Keeping Opus updated along the way allowed for significant process context over the many hours of both M6 as well as the project entirely. As a result, Opus was used highly effectively for assistance in documentation, and in some instances document generation. Depositing both my timeline and important notes taken (errors, notable things, etc.), as well as the aforementioned updates allowed Opus to be much more effective in wrapping up everything I logged, rather than parsing through each individual detail.

## What AI models were used?
- **Claude.ai (Opus 4.7)** — Used as the primary throughout the entire deployment process. Step-by-step Azure CLI guidance, and generating the user/admin guide PDF
- **GitHub Copilot (Gemini 2.5 Pro)** — Used primarily for debugging purposes within files of which in use at time

## What prompts were used?

This milestone differed from prior ones in that I wasn't really writing app code, but rather dealing with Opus having critical errors during Azure deployment, and github copilot encountering issues associated with the debugging process.


**Initial planning + tradeoffs:**
"You are a senior cloud engineer specializing in Azure deployments for .NET + React applications. I have a full-stack project (.NET 10 API + React 19 frontend, currently using SQLite) and need to deploy it to Azure for a class milestone (M6). Walk me through the deliverables in the rubric: production deployment, CI/CD, testing, technical docs, user docs, AI reflection. For each, give me a tradeoff between minimal-effort and best-practice approaches given my $96 student credit and a same-day deadline. Prioritize deep reasoning so I understand the why behind each recommendation."

**Database migration (SQLite -> Azure SQL):**
"You are a senior .NET developer specializing in Entity Framework Core migrations. I need to switch my EF Core provider from SQLite to SQL Server so I can deploy to Azure SQL. Walk me through updating the csproj package references, the AppDbContext configuration, regenerating migrations from a clean state, and provisioning the Azure SQL Server + Database via the az CLI. Account for the fact that SQLite's lax decimal handling won't fly on SQL Server (will need explicit precision)."

**Backend deployment (Azure App Service):**
"You are a senior cloud engineer specializing in Azure App Service for Linux containers. Walk me through provisioning an App Service plan + web app for a .NET 10 preview API, including the runtime token I'll need (DOTNETCORE:10.0), why Always On matters for grading day, and the SKU tradeoff between F1 (free, sleeps) and B1 (~$13/mo, no cold starts). Then walk me through pushing config (connection string + JWT settings + CORS allowed origins) without exposing secrets in shell history."

**Frontend deployment (Azure Static Web Apps):**
"You are a senior cloud engineer specializing in Azure Static Web Apps. I have a Vite-built React 19 app I need to deploy. Compare the deployment-token approach vs the GitHub OIDC approach. Walk me through configuring the build presets (app_location, output_location), the auto-generated GitHub Actions workflow, and how the auto-generated subdomain naming works on the free tier."

**Wiring frontend <-> backend:**
"You are a senior full-stack developer specializing in environment-driven configuration. My frontend currently hardcodes localhost as the API base URL across three service files. Walk me through switching to a Vite environment variable (VITE_API_URL) so the same code works locally against localhost and in production against the deployed API. Then walk me through configuring CORS on the backend to read allowed origins from App Service config rather than hardcoded values."

**CI/CD pipelines (GitHub Actions):**
"You are a senior DevOps engineer specializing in GitHub Actions for Azure. The frontend already has an auto-generated workflow from Static Web Apps. I need a custom backend workflow that restores, builds, runs xUnit tests, publishes, and deploys to App Service via publish profile. Walk me through the YAML structure, the path-filter pattern (so frontend-only changes don't trigger a backend rebuild), the jobs <-> environment relationship, and how to safely store the publish profile as a GitHub secret."

**Documentation suite:**
"You are a senior technical writer specializing in software project documentation. I need to write a README, test plan, architecture doc, ERD, user guide, and AI usage reflection. Generate each in a way that matches my prior milestone writing style (which I'll share with you), keeps the deployment URLs and credentials front-and-center for graders, and uses ASCII diagrams where they aid understanding more than prose."

**Documentation generation (PDF user guide):**
"You are a senior technical writer specializing in product documentation. I've taken 12 screenshots covering the user and admin flows of my deployed marketplace. Generate a clean, image-forward PDF guide that uses minimal explanation - the screenshots speak for themselves. Use OSU red (#BB0000) as an accent color, keep step labels bold, and include a cover page with my live URL and test credentials."

The PDF generation was actually one of the more impressive pieces of M6's AI work for me. Rather than asking Claude to generate markdown that I'd then have to convert to PDF, Opus wrote a Python script using ReportLab that built the PDF directly from my screenshots, with consistent styling, page breaks where appropriate, and an OSU-themed cover. Faster and cleaner than trying to put it together by hand.

## Learning Process

**Swagger removal**
Swashbuckle 6.9.0 (the package I'd been using since M3) broke at runtime against .NET 10 preview's newer `Microsoft.OpenApi` 2.x package - a `MissingMethodException` for `OpenApiComponents.set_SecuritySchemes`. We tried bumping to 7.2.0 (same error), and considered switching to the built-in `Microsoft.AspNetCore.OpenApi` with Scalar UI - but I didn't want to introduce a tool I hadn't been taught. So, Swagger was pulled , opting for API documentation in README. As per the rubric, this does seem like an alternative.

**Connection string mangling via PowerShell `Read-Host`**
The lab pattern used `Read-Host -AsSecureString` to capture the SQL connection string without writing it to shell history. PowerShell's `Read-Host` did something to the variable so that when it eventually got to the `az webapp config connection-string set` command, only the password (the very last `;`-delimited segment) made it through - the rest of the connection string was stripped. The deployed app crashed on startup with a SqlException because it was trying to parse a bare password as a full connection string. As a result, we omitted Read-Host entirely, opting for the string in PowerShell so substitution would work.

**The publish profile / basic auth issue**
Backend CI/CD via GitHub Actions failed three times with "Publish profile is invalid for app-name and slot-name provided." Opus initially guessed it was a copy-paste truncation of the secret, then suggested switching from folder-deploy to zip-deploy. Both wrong. The actual root cause: Azure has been disabling basic auth on App Service SCM endpoints by default for security reasons, and basic auth is exactly what publish profiles use. Once we ran `az resource update --set properties.allow=true` against the `basicPublishingCredentialsPolicies` resource, the next workflow run went green. Lesson: when an AI is wrong twice in a row about the same problem, force a step back - the framing of the question is probably wrong, not just the answer. Opus eventually got there but only after I pushed back on its initial diagnoses.

**Static Web App raw `.tsx` file deploy**
First frontend deploy "succeeded" with a green checkmark but served a blank page. Browser console showed it was trying to load `main.tsx` directly with a MIME type of `application/octet-stream`. The TypeScript build had failed silently (errors in `ProductDetailPage.tsx` from stale `useCart` dispatch code that hadn't been updated when the cart system moved to server-backed in M4), and Oryx (Azure's build engine) decided "well, I'll just upload your raw `src/` folder." Lesson: a green workflow status only means the deploy step succeeded - it doesn't guarantee the build step actually produced the right output. Always check the full action log, not just the top-level status.

## Where AI went wrong

The most useful thing this milestone taught me about working with AI is that it gets infrastructure problems wrong differently than it gets code problems wrong. With code, the failure mode is usually obvious - the build breaks, the test fails, the page doesn't render, and you go fix it. With deployment work, the failure modes are subtler and the AI is much more likely to confidently lead you down a wrong path because it can't actually see your Azure tenant, your subscription's regional restrictions, your specific package versions, or whether a security policy got changed by Microsoft last quarter.

The clearest example was the publish profile issue with the backend CI/CD pipeline. The first three GitHub Actions runs all failed with "Publish profile is invalid for app-name and slot-name provided." Opus's first guess was that the secret had been mangled during copy-paste from XML to GitHub's secret field, so I regenerated and re-pasted twice. When that didn't work, the next theory was that the `azure/webapps-deploy@v3` action doesn't handle Linux App Service folder uploads properly, so we rewrote the workflow to zip the publish output before deploying. That didn't fix it either. The actual root cause - that Azure has been disabling basic auth on App Service SCM endpoints by default for security reasons, and basic auth is exactly what publish profiles use to authenticate - wasn't something Opus surfaced until I explicitly forced a step back and asked whether we'd been framing the problem wrong from the start. About 25-30 minutes lost chasing dead ends. The lesson there: when an AI is wrong twice in a row about the same problem, the third suggested fix is probably also wrong, and the better move is to push back on the framing rather than running yet another patch.

Swagger was a similar pattern in miniature. Swashbuckle 6.9.0 (the package I'd used since M3) broke at runtime against .NET 10 preview's newer `Microsoft.OpenApi` 2.x package. Opus's first suggestion was to bump to Swashbuckle 7.2.0 - which threw the exact same `MissingMethodException` because the underlying compatibility issue was unchanged. The next suggestion was switching to Scalar UI as the OpenAPI viewer, which I had to push back on because Scalar wasn't part of the class curriculum and would have been hard to justify in a graded reflection. The eventual answer - just remove Swagger entirely and write the API documentation by hand in the README, which the rubric explicitly accepts - wasn't even Opus's first option. It came up only after I insisted on staying within tools we'd actually been taught. That experience was a useful reminder that AI tools optimize for technical correctness, not academic context, and that scope decisions are still mine to make.

The PowerShell connection string issue was different in flavor but similar in consequence. Opus suggested the deployment lab's exact recommended pattern for secret handling - `Read-Host -AsSecureString` followed by a SecureString-to-plain conversion - and that pattern silently mangled my SQL connection string during variable expansion. Only the password (the very last `;`-delimited segment of the string) actually made it through to the `az webapp config connection-string set` command. The deployed App Service crashed on startup with a SqlException because it was trying to parse a bare password as a full connection string, and it took several diagnostic rounds (including pulling the full Azure log stream) to figure out where in the pipeline the data had been lost. The eventual fix - skip Read-Host entirely and assign the string in a single PowerShell variable so substitution worked correctly - is not a particularly clever fix, but Opus didn't flag this as a known PowerShell quirk upfront despite it being a documented issue across countless Stack Overflow threads.

Probably the most subtle issue, and the one I'm most glad I caught, was overconfidence on first-pass code generation. When Opus generated the API documentation table for the README, it inferred endpoint routes from controller filenames rather than actually reading the `[Route]` and `[HttpGet/Post/Put/Delete]` attributes in the source files. The output looked correct - it had reasonable URLs, reasonable HTTP verbs, reasonable descriptions - but several entries were just wrong. It listed endpoints that don't exist in my code (`PUT /api/admin/orders/{orderId}/status`) and missed endpoints that do (`GET /api/userorder/mine`). I only caught it by manually reading `AdminController.cs` and `UserOrderController.cs` and cross-checking each row in the table against the actual route attributes. Without that manual verification, my README would have shipped wrong API documentation, and a grader who tried to hit those endpoints would have gotten 404s. The general principle that came out of that: AI-generated documentation about your own code should always be cross-checked against the actual code, because the model is willing to confidently fabricate plausible-sounding details when it doesn't have ground truth.

The takeaway across all of these is that AI is genuinely valuable as a co-pilot for infrastructure and deployment work - the speed at which I got Azure resources provisioned and CI/CD pipelines wired up would have been impossible without it - but the model isn't operating on the same information you are. It can't see your live system, doesn't know which preview package versions are mutually compatible, and doesn't have visibility into what your specific Azure subscription does or doesn't allow. Every "this should work" needs to be verified by actually running it, and when it doesn't work, the model's first explanation is often wrong - especially for cross-system issues where the failure mode spans PowerShell, Azure CLI, GitHub Actions, and Azure resource policies all at once. The faster I learned to push back on confident-sounding wrong answers rather than just running the next suggested fix, the faster the actual problems got solved.

## Modifications 
- Most `az` CLI commands were accepted as Opus generated them, with the exception of region selection - my student subscription blocked `eastus` and `eastus2` for SQL Server provisioning, so we landed on `centralus` after some trial and error
- The auto-generated GitHub Actions workflow file from Azure (for Static Web Apps) was used as-is. The custom backend workflow (`deploy-api.yml`) was generated by Opus but had to be modified twice: first to use zip deploy, then again to debug the publish profile issue (which turned out not to be a workflow issue at all)
- The connection string PowerShell pattern was rewritten three times before settling on the single-variable approach that actually worked
- The user/admin guide PDF generator script was accepted essentially as Opus generated it. Only thing I changed was renaming the output PDF to `User_Admin_Guide.pdf` to fit my folder structure
- Multiple cleanup commits to `.gitignore` after realizing build artifacts (`api/publish/`, `deploy.zip`, `logs.zip`, `publish-profile.xml`) were sitting untracked. Important note: `publish-profile.xml` should never be committed since it's a credential