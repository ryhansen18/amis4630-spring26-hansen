## System Architecture - Buckeye Marketplace
This diagram represents the high-level system architecture structured within Buckeye Marketplace. 
**Demonstrated** are the backend, frontend, and database components, and how they interact with one another to enable core workflows (like product browsing and transaction processing) for deployment.
Diagram:<img width="2342" height="722" alt="Systems_Architecture drawio" src="https://github.com/user-attachments/assets/ee2184e3-8f17-4839-a31b-c01a12dfab32" />

Output via Claude (Opus 4.7)

┌──────────────────────────────────────────────────────────────────────────┐
│                              END USER (Browser)                           │
└────────────────────────────────────┬─────────────────────────────────────┘
│ HTTPS
▼
┌──────────────────────────────────────────────────────────────────────────┐
│  Azure Static Web Apps (Free tier, Global edge)                           │
│  buckmkt-frontend-hansen                                                  │
│  https://icy-mushroom-08633e90f.7.azurestaticapps.net                     │
│                                                                            │
│  Serves: React 19 + Vite-built static bundle (HTML / JS / CSS)            │
│  Config: staticwebapp.config.json (SPA fallback for React Router)         │
└────────────────────────────────────┬─────────────────────────────────────┘
│ fetch() with JWT in Authorization header
│ HTTPS, CORS-allowed
▼
┌──────────────────────────────────────────────────────────────────────────┐
│  Azure App Service (Linux, B1 Basic, Always On, Central US)               │
│  buckmkt-api-hansen                                                       │
│  https://buckmkt-api-hansen.azurewebsites.net                             │
│                                                                            │
│  Runs: .NET 10 preview Web API                                            │
│  Layers:                                                                   │
│    • Controllers (Products, UserAcct, Cart, UserOrder, Admin)             │
│    • ASP.NET Core Identity + JWT Bearer auth                              │
│    • EF Core (SQL Server provider)                                         │
│    • GlobalExceptionHandler middleware                                     │
│  Config (App Service settings):                                            │
│    • ConnectionStrings:DefaultConnection (SQL Azure)                       │
│    • Jwt__Key, Jwt__Issuer, Jwt__Audience                                  │
│    • Cors__AllowedOrigins__0 (the Static Web App URL)                      │
└────────────────────────────────────┬─────────────────────────────────────┘
│ TCP 1433, encrypted
│ Firewall: AllowAzureServices
▼
┌──────────────────────────────────────────────────────────────────────────┐
│  Azure SQL Database (Basic, 5 DTU, Central US)                            │
│  Server: buckmkt-sql-hansen-01                                            │
│  Database: BuckMktDb                                                      │
│                                                                            │
│  Tables (managed by EF Core migrations):                                  │
│    Products, Carts, CartItems, Orders, PurchasedItems,                    │
│    AspNetUsers, AspNetRoles, AspNetUserRoles, __EFMigrationsHistory       │
└──────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────┐
│                           CI/CD (GitHub Actions)                          │
└──────────────────────────────────────────────────────────────────────────┘
github.com/ryhansen18/amis4630-spring26-hansen
│
│ git push origin main
▼
┌────────────────────────────────┬──────────────────────────────────────┐
│  Frontend Workflow              │  Backend Workflow                    │
│  Triggers on: any push to main  │  Triggers on: push to api/** only    │
│                                  │                                       │
│  1. Checkout code               │  1. Checkout code                     │
│  2. npm install                 │  2. Setup .NET 10 preview SDK         │
│  3. npm run build (vite)        │  3. dotnet restore                    │
│  4. Push dist/ → Static Web App │  4. dotnet build (Release)            │
│     via Azure OIDC              │  5. dotnet test (xUnit)               │
│                                  │  6. dotnet publish                    │
│                                  │  7. Zip and deploy → App Service     │
│                                  │     via publish profile (secret)     │
└────────────────────────────────┴──────────────────────────────────────┘

### Request Flow Example: Adding an Item to Cart

1. User clicks "+ Cart" in the browser
2. React handler calls `addToCart(productId, 1)` from `services/api.ts`
3. Browser issues `POST https://buckmkt-api-hansen.azurewebsites.net/api/cart` with JWT in `Authorization` header
4. Azure routes the request to the App Service container
5. ASP.NET Core auth middleware validates the JWT signature against the configured `Jwt:Key`
6. `CartController.AddItem` extracts the user ID from the JWT claims
7. EF Core opens a connection to Azure SQL, inserts a `CartItem` row scoped to that user's `Cart`
8. Controller returns the updated cart as JSON
9. Frontend updates its React Context state, cart icon badge re-renders with new count

### Why this layout?

- **Static Web Apps for the frontend** so Azure handle global edge distribution + automatic HTTPS for free.
- **App Service B1 backend** B1 allows for always on
- **Azure SQL Basic (not in-process SQLite)** because SQLite on App Service's filesystem isn't durable across container restarts in the way you'd want for a "real" production app. Azure SQL is a separately-managed service with its own backup story.
- **Two separate workflows in GitHub Actions** with path filters so a frontend-only commit doesn't trigger a 5-minute backend rebuild and vice versa.
- **JWT signing key + connection string in App Service config** (not in committed appsettings) so secrets never live in git. Locally, the same values come from `dotnet user-secrets` and `appsettings.Development.json` (which is gitignored).