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