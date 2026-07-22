## Buckeye Marketplace Project

## Milestone 2 — Feature Prioritization (Kanban Board)
In the Kanban board visible in projects, Buckeye Marketplace features/user-stories were organized in order of prioritization in the following format:
## Backlog -> Must-Have -> Should-Have -> Future Enhancements
More specifically, Buckeye Marketplace features were organized based on their ability to support core functionality of both order processing, and website functionality at large. Addressing pain points identified through my crafted user personas and journey map, (Milestone 1), also served integral in decision making.

Must-Have features were organized based on their ability to enable essential marketplace workflows like product search, processing orders, and offering personal, yet also secure, account access. Users like Connor Yukon, who needs clear guidance during the purchasing process, and Jay Ritzmann, a new-grad needing efficient tools integrated into the marketplace, serve as the most critical points of reference.

Should-Have features come next. While not required at launch, such features are intended to further user experience by way of enhancing usablity, offering avenues of communication, and expand Buckeye Marketplace to a wider array of services.

Finally, later enhancements represent the innovative functionality of the marketplace. In keeping pace with todays rapid technological innovation, features like Gen AI-powered user assistance, and automated workflows enabling efficiency, will enable Buckeye Marketplace to offer key-differentiators, distancing itself from competition.



## Milestone 3 — Product Catalog: Vertical Slice 1
Within this milestone, I began full stack development for Buckeye Marketplace. Students can now browse through listings posted and view respective details. Additionally, add to cart functionality has been implemented (though isn't fully functionable yet, given that the landing page/product pages have only been developed).
## What was developed?
- **Backend** (.NET Web API)
  - ProductsController with two endpoints: GET /api/products and GET /api/products/{id} (404 if not found). In-memory static list of 8 products across Textbooks, Electronics, and Furniture. CORS enabled for the React dev server, Swagger UI available in development.
  - **Frontend** (React + Vite + TypeScript) — Product List and Product Detail pages connected via React Router. Respective data can be fetched live from the API backend, with no hardcoded products. Loading, error, and empty states handled throughout. Cart system built with React Context and useReducer, similar to what was developed during our cart workshop. CSS Modules were implemented (as reccomendation of Github Copilot) used for scoped component styling.

Additionally, I utilized an **Agents.md** resulting in much better outputs associated with Github Copilot. Placed in the root, this file defines coding standards across the project, structure for directory and overall guidelines to follow. This was developed using Claude with the prompt: 

"You're a software engineer with specialty in full stack development with React and .NET. Currently, you're working on building Buckeye Marketplace, which will function as a hub for all things Ohio State. My stack within React on the frontend and .NET 8.0 is being utilized, and I'd like you to generate an AGENTS.md file to be placed in the root of the repo. This file will offer consistent framework for all Gen AI based outputs within VS Code's integrated chat terminal. It shoulld define the following: project stack, project needs, folder structure, controller patterns, and TypeScript rules, among anything else relevant. Reference the AGENTS.md file posted from our workshop in cart development as that of an aid to draw information/ideas based off - it defines core patterns for .NET API as well as General Exception Handling. Lastly, in-memory data should be defined private static."

**AI Tools Used**
Github Copilot Agent: Claude Opus 4.6 - Integrated chat terminal in VS Code
Claude.ai - Base, Sonet 4.6 model - General questions related to milestone steps, ideas to integrate, etc.

As for prompt engineering, I utilized general framework: "You're a software enginner with specialty in full stack development with React and .NET, acting as one of the lead voices in prompt engineering around the globe." 
  - From here, Claude was able to output various steps I should take regarding development. After scaffolding what had been done within the backend (api) layer, it outlined steps to fortify my frontend layer in a step-by-step fashion, as to not overload Github Copilot...or my brain.
  - One of the most impactful installments was CSS modules, which allowed for each component to have its own isolated stylesheet. This made UI-oriented improvments much easier, given that design will just stay constant (like how in the layout file, all heading-related design is called upon from the CSS module, giving design consistency). 
  - I also extended the prompt above, adding "Output effective prompts relevant to (x given step/file), in order to maximize design principles within both relevant .css and .csx. This gave way to many new prompts, some of which were helpful, and a lot of which had to be modified to work better with Opus.

Example: "Following AGENTS.md, create src/services/api.ts. Import the Product interface from ../types. Define API_BASE_URL as http://localhost:5000. Export getProducts() and getProductById(id) with proper error handling."

**Cart Integration**

As for cart integration, Github Copilot originally generated the entire system onto one file, similar to what occurred in the cart workshop. After identifying this (which ultimately limited relevant cart-button visuals in general). To fix, I wrote a prompt within Github Copilot: "You're a software engineer leading development on the Buckeye Marketplace project. You've just identified code flaws within the current cart architecture system. As a result, you must parse out the given architecture assignments, to result in proper cart-oriented visuals on the frontend. Draw on instructions written in AGENT.md as not to violate architecture guidelines." 

The split the cart into 5 relevant files (cartTypes, cartReducer, CartContext, CartProvider, and useCart), and ultimately allowed cart architecture to work in the first place.


## Milestone 4 — Shopping Cart: Vertical Slice 2

This milestone wired up the shopping cart from end to end. Users can now add items, 
adjust quantities, remove items, and clear their cart — with everything saving to a 
real database instead of just living in memory.

### What was developed?

**Backend (.NET Web API)**
Added Cart and CartItem models using Entity Framework Core, using SQLite and it's functions as what's acting as the database. 
Set up the relationships between them and ran migrations to create the tables. Products 
got moved from the old hardcoded static list into the database as well, and then were seeded on 
startup. Built out five cart endpoints — get cart, add item, update quantity, remove 
item, and clear cart — all scoped to a hardcoded guest user for now (auth comes in M5).

**Frontend (React + Vite + TypeScript)**
Updated the cart so it actually talks to the backend now. CartProvider loads the cart 
from the API when the app starts, and every cart action (add, update, remove, clear) 
hits the API and refreshes state. Added a CartPage with quantity controls, subtotals, 
and a running total. Cart icon in the header shows a live count badge. Product detail 
page shows a quick "✓ Added!" confirmation after adding something to the cart.


### AI Usage
- **GitHub Copilot (Gemini 2.5 Pro (as opus usage in GitHub student package is no longer supported))** — used inside VS Code for scaffolding models, 
the CartController, and the CartPage component
- **Claude.ai (Sonnet 4.6)** — used for step-by-step guidance on EF Core setup, 
working through build errors, and wiring the frontend to the backend

### Prompts Used

**EF Core setup:**
"You're a lead software developer. Following along with what's consistent in AGENTS.md, create Cart.cs and CartItem.cs with navigation properties and 
an AppDbContext with the correct one-to-many relationships for a .NET 10 project."

**CartController:**
"You're a lead software developer. Following along with what's consistent in AGENTS.md, create a CartController with the 5 endpoints: GET, POST, PUT 
/{cartItemId}, DELETE /{cartItemId}, DELETE /clear. Hardcode a guest userId for now 
and inject AppDbContext. Return correct HTTP status codes."

**Frontend wiring:**
"Update CartProvider to fetch cart from the API on mount. Replace dispatch calls in 
ProductCard and ProductDetailPage with API calls, then refresh cart state after each 
operation."

### What I accepted vs. modified
- EF entity structure was mostly accepted as generated
- Had to manually add a product seed block to Program.cs after realizing the Products 
table was empty and cart adds were returning 404s
- CartPage layout came from Copilot but the CSS was written manually to match the 
existing design system
- Caught and fixed several namespace casing issues (api vs Api) that caused build failures



## Milestone 5 — Authentication, Authorization, and Security

See [M5-SUBMISSION.md](./M5-SUBMISSION.md)



## Milestone 6 — Deployment and Finalization

This milestone took everything that's been built upon, thereby pushing into Azure as a live end-to-end production deployment.

### What was developed?

**Database migration: SQLite -> Azure SQL**
Up through M5, the app was running off SQLite (the buckeye.db file) during production. However during this Milestone, I was thrown a ton of errors throughout the M6 process, opting to switch to SQL Server. I regenerated all prior migrations, and provisioned an Azure SQL Database (Basic) under a new SQL server (`buckmkt-sql-hansen-01`). Connection string + JWT settings now flow through App Service configuration 

**Backend deployment (Azure App Service)**
Provisioned an App Service plan (`buckmkt-plan`, B1, then deployed the .NET 10 API to it. Live at `https://buckmkt-api-hansen.azurewebsites.net`. Migrations auto-apply on startup, products + admin user seed on first run.

**Frontend deployment (Azure Static Web Apps)**
Created Azure Static Web App (`buckmkt-frontend-hansen`) with GitHub integration. React app is built through vite, and any output lives in Azure. Live at `https://icy-mushroom-08633e90f.7.azurestaticapps.net`. I think it was a source of the free version, but I couldn't figure out how to rename URL

**CI/CD pipelines (GitHub Actions)**

- **Frontend:** auto-generated by Azure when the Static Web App was created. Builds with Vite, deploys to Static Web Apps.
- **Backend:** custom workflow at `.github/workflows/deploy-api.yml`. This allows for any build restoration, unit/integration tests to carry out as well. Any deploys to App Service travel via the publish profile I created.

**CORS + environment-driven config**
Frontend's API URL now reads from `VITE_API_URL` (set in `frontend/.env.production`) so the same code lives and functions in a local environment (localhost, in production with deployed API). Backend reads its CORS allowed origins from config, which is set to the Azure site URL.

### Most notable alteration (Important)
**Swagger.** During this milestone, Swashbuckle 6.9.0 (and 7.2.0) both broke against .NET 10 preview's newer `Microsoft.OpenApi` 2.x package — `MissingMethodException` on startup. Utilizing Opus, I was able to just omit swagger as is, and instead living with a written API (below).

### AI Usage
See [AI-USAGE.md](./AI-USAGE.md) for the full M6 reflection: omitting swagger, Azure SQL connection string fails (PowerShell `Read-Host`), and the publish profile & basic auth issue (Opus struggled mightly here).

### API Documentation

Since Swagger isn't running, here's the endpoint reference. All endpoints are prefixed with `https://buckmkt-api-hansen.azurewebsites.net`.

**Auth (UserAcctController)**
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/useracct/register` | No | Create a new user account |
| POST | `/api/useracct/login` | No | Log in and receive a JWT |

**Products (ProductsController)**
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/products` | No | Get all products |
| GET | `/api/products/{id}` | No | Get one product by ID (404 if not found) |

**Cart (CartController)** — all require user JWT
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get the current user's cart |
| POST | `/api/cart` | Add an item to the cart |
| PUT | `/api/cart/{cartItemId}` | Update item quantity |
| DELETE | `/api/cart/{cartItemId}` | Remove a single item |
| DELETE | `/api/cart/clear` | Empty the entire cart |

**Orders (UserOrderController)**
| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/userorder` | User JWT | Place an order from current cart |
| GET | `/api/userorder/mine` | User JWT | Get the current user's order history |
| GET | `/api/userorder` | Admin role | Get all orders across all users |
| PUT | `/api/userorder/{orderId}/status` | Admin role | Update an order's status |

**Admin (AdminController)** — all require Admin role
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/products/{id}` | Get a single product (admin view) |
| POST | `/api/admin/products` | Create a new product |
| PUT | `/api/admin/products/{id}` | Update an existing product |
| DELETE | `/api/admin/products/{id}` | Delete a product |

### Local Development Setup

**Prerequisites:** .NET 10 preview SDK, Node.js 22+, an Azure SQL DB (or local SQL Server) for the connection string

**Backend:**
```bash
cd api
dotnet user-secrets set "Jwt:Key" "YourSigningKeyHere"
dotnet user-secrets set "Jwt:Issuer" "BuckeyeMarketplace"
dotnet user-secrets set "Jwt:Audience" "BuckeyeMarketplace2"
# Add appsettings.Development.json with your DefaultConnection string
dotnet run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend: `http://localhost:5173`
Backend:  `http://localhost:5000`

### Architecture & Schema
- System Architecture: see [docs/architecture.md](./docs/architecture.md)
- Database Schema: see [docs/ERD.md](./docs/ERD.md)

### User & Admin Guides
- [User & Admin Guide (PDF)](./docs/WebsiteGuide/User_Admin_Guide.pdf) — Opus utiized for presentation and formatting purposes to ensure doc looks professional.More on this in [AI-USAGE.md](./AI-USAGE.md).

### Test Plan
- [Test Plan & Results](./docs/TEST-PLAN.md) — Production testing
