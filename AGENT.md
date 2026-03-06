# AGENTS.md — Buckeye Marketplace (AMIS 4630)

This file defines how AI agents (GitHub Copilot, Claude) should behave when contributing to this project.

---

## ⚠️ Milestone 3 Notice

**Do not use EF Core or DbContext yet.** The `ProductsController` must use a `private static readonly List<Product>` as the data store. No `MarketplaceContext`, no `DbSet`, no migrations. EF Core will be introduced in Milestone 4.

---

## Project Context

**Buckeye Marketplace** is a full-stack web application built as a semester-long project for AMIS 4630 at The Ohio State University. It is a student-to-student marketplace inspired by platforms like Facebook Marketplace, scoped for the OSU community.

**Stack:**
| Layer | Tool |
|-------|------|
| Frontend | React (Vite + TypeScript) — lives in `/frontend` |
| Backend | ASP.NET Core (.NET 10, C# 14) — lives in `/api` |
| Routing | React Router (client-side) |
| ORM | None yet (Milestone 3) → Entity Framework Core (Milestone 4) |
| API Style | Controller-based (attribute routing) |
| Docs | OpenAPI (Swashbuckle) + Swagger UI |
| Validation | Data Annotations + ProblemDetails |
| Testing | None (course scope) |

---

## Current Milestone: Milestone 3 — Product Catalog (Vertical Slice 1)

**Goal:** A user can visit Buckeye Marketplace, see a list of products for sale, and click into any product to see its details. All data comes from a live .NET API — nothing hardcoded in React components.

### Frontend (`/frontend/src`)
- `ProductList` page — displays all products as cards in a responsive grid
- `ProductCard` component — shows title, price, category, sellerName
- `ProductDetail` page — shows all fields for a single product
- React Router routes: `/` → ProductList, `/products/:id` → ProductDetail
- Loading state while fetching
- Empty state if API returns no products
- Error state if API call fails
- Navigation works both ways (list ↔ detail)

### Backend (`/api`)
- `Product` C# model with fields: id (int), title, description, price (decimal), category, sellerName, postedDate (DateTime), imageUrl (string)
- `ProductsController` with:
  - `GET /api/products` → HTTP 200, JSON array of all products
  - `GET /api/products/{id}` → HTTP 200 single product, or HTTP 404 if not found
- `private static readonly List<Product>` with at least 8 products across at least 3 categories (Textbooks, Electronics, Furniture — OSU/Buckeye themed)
- CORS enabled in `Program.cs` for `http://localhost:5173`

---

## Project Structure

```
amis4630-spring26-hansen/
├── api/
│   ├── Controllers/
│   │   └── ProductsController.cs
│   ├── Models/
│   │   └── Product.cs
│   ├── Middleware/
│   │   └── GlobalExceptionHandler.cs
│   ├── Program.cs
│   └── api.csproj
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── ProductCard.tsx
│       │   └── ProductList.tsx
│       ├── pages/
│       │   ├── ProductListPage.tsx
│       │   └── ProductDetailPage.tsx
│       ├── services/
│       │   └── api.ts
│       ├── types.ts
│       └── App.tsx
├── docs/                 ← Do not modify
└── README.md
```

### Rules
- One controller per entity or aggregate root
- Models in `Models/` are plain C# classes (not EF Core entities yet)
- Never expose entity models directly on API endpoints — map to/from DTOs when complexity warrants it (Milestone 3 can return the model directly for simplicity)
- Use file-scoped namespaces: `namespace Api.Controllers;`

---

## Backend — Controllers

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly List<Product> _products = new()
    {
        new Product { Id = 1, Title = "...", ... },
        // at least 8 products
    };

    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetAll() => Ok(_products);

    [HttpGet("{id}")]
    public ActionResult<Product> GetById(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product is null) return NotFound();
        return Ok(product);
    }
}
```

### Rules
- Inherit from `ControllerBase` (not `Controller`)
- Always apply `[ApiController]` and `[Route("api/[controller]")]`
- Return `Ok()` for 200, `NotFound()` for 404
- No async needed for in-memory data (Milestone 3 only)
- Use `[ProducesResponseType]` when returning multiple status codes

---

## Backend — Program.cs

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.MapControllers();

app.Run();
```

### Pipeline order (order matters)
1. Swagger (development only)
2. `UseExceptionHandler()`
3. `UseHttpsRedirection()`
4. `UseCors()` — must come before `MapControllers()`
5. `MapControllers()` — always last

---

## Backend — Global Exception Handler

Always include a `GlobalExceptionHandler` in `Middleware/`:

```csharp
using Microsoft.AspNetCore.Diagnostics;

namespace Api.Middleware;

public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
    {
        _logger = logger;
    }

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "Unhandled exception: {Message}", exception.Message);

        var problemDetails = exception switch
        {
            KeyNotFoundException => new ProblemDetails
            {
                Status = StatusCodes.Status404NotFound,
                Title = "Resource not found",
                Detail = exception.Message
            },
            ArgumentException => new ProblemDetails
            {
                Status = StatusCodes.Status400BadRequest,
                Title = "Invalid request",
                Detail = exception.Message
            },
            _ => new ProblemDetails
            {
                Status = StatusCodes.Status500InternalServerError,
                Title = "An unexpected error occurred"
            }
        };

        httpContext.Response.StatusCode = problemDetails.Status!.Value;
        await httpContext.Response.WriteAsJsonAsync(problemDetails, cancellationToken);
        return true;
    }
}
```

---

## Package Management
- **Always** use `dotnet add package <PackageName>` to install packages
- **Never** edit `.csproj` files directly
- Use the latest stable version of all packages

---

## Frontend — Code Standards

- Use functional components with hooks only (no class components)
- Define a `Product` TypeScript interface in `types.ts` that exactly matches the C# model
- All API calls go through `/services/api.ts` — no fetch calls inside components
- Fetch data inside `useEffect` with proper loading/error/empty state management
- Use `useNavigate` and `useParams` from React Router for navigation
- No hardcoded product data anywhere in React components
- Do not use `any` type in TypeScript

---

## Design Direction

The UI should feel like a **modern marketplace** with OSU branding:
- Bold header/nav with "Buckeye Marketplace" — OSU scarlet `#BB0000` as accent color
- Full-screen layout, responsive product card grid (3–4 columns desktop)
- Cards with subtle shadows, rounded corners, hover effects
- Product detail page with clear hero section and well-organized fields
- Consistent light or dark theme throughout — no unstyled output

---

## C# Conventions

| Element | Style | Example |
|---------|-------|---------|
| Classes, Records | PascalCase | `ProductResponse` |
| Properties | PascalCase | `SellerName`, `PostedDate` |
| Methods | PascalCase | `GetAll()`, `GetById()` |
| Parameters, locals | camelCase | `minPrice`, `productId` |
| Private fields | `_camelCase` | `_products`, `_logger` |

- File-scoped namespaces: `namespace Api.Controllers;`
- `var` when type is obvious from right-hand side
- `if (product is null)` over `== null`
- `string.Empty` over `""`
- `decimal` for money — never `double` or `float`
- `DateTime.UtcNow` — never `DateTime.Now`

---

## Do Nots

- Do not use EF Core, DbContext, or migrations until Milestone 4
- Do not expose raw exception messages to the client
- Do not use `double` or `float` for currency — use `decimal`
- Do not use `DateTime.Now` — use `DateTime.UtcNow`
- Do not use minimal API endpoints — use controller-based routing
- Do not hardcode product data in React components
- Do not use `any` type in TypeScript
- Do not modify files in `/docs`
- Do not change `README.md` without being asked
- Do not edit `.csproj` directly — use `dotnet add package`

---

## Running the Project Locally

**Start the API:**
```bash
cd api
dotnet run
# Runs on https://localhost:5001 or http://localhost:5000
```

**Start the frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

Both must be running simultaneously for the app to work.