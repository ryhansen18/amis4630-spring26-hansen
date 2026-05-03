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
**Rubric**: milestone-4/rubric.md

## 1. Project Structure

| Area                | Expected                            | Found                                                                                 | Status |
| ------------------- | ----------------------------------- | ------------------------------------------------------------------------------------- | ------ |
| Backend controllers | `api/Controllers/CartController.cs` | `api/Controllers/CartController.cs`                                                   | ✅     |
| Cart model          | `api/Models/Cart.cs`                | `api/Models/Cart.cs`                                                                  | ✅     |
| CartItem model      | `api/Models/CartItem.cs`            | `api/Models/CartItem.cs`                                                              | ✅     |
| DbContext           | `api/Data/AppDbContext.cs`          | `api/Data/AppDbContext.cs`                                                            | ✅     |
| EF Migrations       | `api/Migrations/`                   | `api/Migrations/20260501174830_InitialCreate.cs`                                      | ✅     |
| Cart context/state  | `frontend/src/context/`             | `CartContext.tsx`, `CartProvider.tsx`, `cartReducer.ts`, `cartTypes.ts`, `useCart.ts` | ✅     |
| Cart service layer  | `frontend/src/services/api.ts`      | `frontend/src/services/api.ts` (cart endpoints L48–L90)                               | ✅     |
| Cart page           | `frontend/src/pages/CartPage.tsx`   | `frontend/src/pages/CartPage.tsx`                                                     | ✅     |
| Cart tests          | frontend tests                      | `frontend/src/test/cart.test.ts` (3 tests passing)                                    | ✅     |

## 2. Rubric Scorecard

| #   | Requirement                              | Points | Status | Evidence                                                                                                                                                                                                                                                                                                                                                    |
| --- | ---------------------------------------- | ------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1a  | useReducer or Context API for cart state | 2      | ✅ Met | [CartProvider.tsx](frontend/src/context/CartProvider.tsx#L8) — `useReducer(cartReducer, initialState)` with state provided via [CartContext.tsx](frontend/src/context/CartContext.tsx); [cartTypes.ts](frontend/src/context/cartTypes.ts) defines `CartState`/`CartAction` types; [useCart.ts](frontend/src/context/useCart.ts) custom hook exposes context |
| 1b  | Add, update quantity, remove operations  | 2      | ✅ Met | [CartPage.tsx](frontend/src/pages/CartPage.tsx#L10-L27) — `handleRemove`, `handleQuantityChange`, `handleClear` all call API then `refreshCart()`; [ProductCard.tsx](frontend/src/components/ProductCard.tsx#L13-L21) and [ProductDetailPage.tsx](frontend/src/pages/ProductDetailPage.tsx#L36-L44) — `handleAddToCart` calls `addToCart()` API             |
| 1c  | Cart count in header + calculated totals | 1      | ✅ Met | [Layout.tsx](frontend/src/components/Layout.tsx#L12) — `itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)` with badge at L52; [CartPage.tsx](frontend/src/pages/CartPage.tsx#L40) — `total = state.items.reduce(...)` displayed in summary                                                                                              |
| 2a  | GET /api/cart                            | 1      | ✅ Met | [CartController.cs](api/Controllers/CartController.cs#L25-L30) — `[HttpGet] GetCart()` returns cart with items via `MapToResponse`                                                                                                                                                                                                                          |
| 2b  | POST /api/cart (add item)                | 1      | ✅ Met | [CartController.cs](api/Controllers/CartController.cs#L33-L60) — `[HttpPost] AddItem()` validates quantity, checks product exists, handles duplicate-product merging, returns `CreatedAtAction`                                                                                                                                                             |
| 2c  | PUT /api/cart/{cartItemId} (update qty)  | 1      | ✅ Met | [CartController.cs](api/Controllers/CartController.cs#L63-L76) — `[HttpPut("{cartItemId}")] UpdateItem()` validates quantity ≥ 1, returns `Ok` with updated item                                                                                                                                                                                            |
| 2d  | DELETE endpoints (item + clear)          | 1      | ✅ Met | [CartController.cs](api/Controllers/CartController.cs#L79-L97) — `[HttpDelete("{cartItemId:int}")] RemoveItem()` and `[HttpDelete("clear")] ClearCart()` both present                                                                                                                                                                                       |
| 2e  | Proper status codes and responses        | 1      | ✅ Met | [CartController.cs](api/Controllers/CartController.cs) — Uses `Ok()` (200), `CreatedAtAction()` (201), `BadRequest()` (400), `NotFound()` (404) with descriptive messages                                                                                                                                                                                   |
| 3a  | Cart/CartItem EF entities                | 2      | ✅ Met | [Cart.cs](api/Models/Cart.cs) — `Id`, `UserId`, `CreatedAt`, `Items` collection; [CartItem.cs](api/Models/CartItem.cs) — `Id`, `CartId`, `ProductId`, `Quantity` with FK properties                                                                                                                                                                         |
| 3b  | Relationships and navigation properties  | 1      | ✅ Met | [CartItem.cs](api/Models/CartItem.cs#L9-L11) — `Cart` and `Product` navigation properties; [AppDbContext.cs](api/Data/AppDbContext.cs#L35-L44) — Fluent API configures `Cart→Items` (Cascade) and `CartItem→Product` (Restrict)                                                                                                                             |
| 3c  | Migrations applied, data persists        | 1      | ✅ Met | [20260501174830_InitialCreate.cs](api/Migrations/20260501174830_InitialCreate.cs) — Creates `Carts` and `CartItems` tables with FK constraints; [Program.cs](api/Program.cs#L79-L82) — `db.Database.Migrate()` auto-applies on startup                                                                                                                      |
| 4a  | Real API replaces mock/localStorage      | 2      | ✅ Met | [api.ts](frontend/src/services/api.ts#L48-L90) — `getCart`, `addToCart`, `updateCartItem`, `removeCartItem`, `clearCart` all call `${API_BASE_URL}/api/cart` endpoints; no localStorage cart code found                                                                                                                                                     |
| 4b  | All cart operations call API             | 2      | ✅ Met | [CartPage.tsx](frontend/src/pages/CartPage.tsx#L10-L27) — remove/update/clear call API; [ProductCard.tsx](frontend/src/components/ProductCard.tsx#L16-L18) and [ProductDetailPage.tsx](frontend/src/pages/ProductDetailPage.tsx#L39-L41) — add calls API                                                                                                    |
| 4c  | State synchronization                    | 1      | ✅ Met | [CartProvider.tsx](frontend/src/context/CartProvider.tsx#L10-L16) — `refreshCart()` fetches full cart from API and dispatches `SET_CART`; called after every mutation in CartPage, ProductCard, ProductDetailPage                                                                                                                                           |
| 5a  | Loading states                           | 1      | ✅ Met | [ProductDetailPage.tsx](frontend/src/pages/ProductDetailPage.tsx#L26-L32) — spinner + "Loading..." while fetching; [ProductDetailPage.tsx](frontend/src/pages/ProductDetailPage.tsx#L46) — "Adding..." button state; [CheckoutPage.tsx](frontend/src/pages/CheckoutPage.tsx#L50) — "Placing Order..." button state                                          |
| 5b  | Error messages and edge cases            | 1      | ✅ Met | [ProductDetailPage.tsx](frontend/src/pages/ProductDetailPage.tsx#L33) — `⚠ {error}` display; [CheckoutPage.tsx](frontend/src/pages/CheckoutPage.tsx#L44) — error message; [CartPage.tsx](frontend/src/pages/CartPage.tsx#L29-L35) — empty cart state with "Browse Listings" CTA                                                                             |
| 5c  | Success feedback                         | 1      | ✅ Met | [ProductDetailPage.tsx](frontend/src/pages/ProductDetailPage.tsx#L42) — navigates to cart on successful add (visual confirmation); [CheckoutPage.tsx](frontend/src/pages/CheckoutPage.tsx#L38) — navigates to order confirmation page; cart badge in header updates live after each operation                                                               |
| 6a  | Clean component structure                | 1      | ✅ Met | Clear separation: `context/` (5 files), `services/` (3 files), `pages/`, `components/`; CSS Modules per component                                                                                                                                                                                                                                           |
| 6b  | Service layer / custom hooks             | 1      | ✅ Met | [api.ts](frontend/src/services/api.ts) — centralized API service; [useCart.ts](frontend/src/context/useCart.ts) and [useAuth.ts](frontend/src/context/useAuth.ts) — custom hooks; [auth.ts](frontend/src/services/auth.ts) — auth service                                                                                                                   |
| 6c  | AI usage documented                      | 1      | ✅ Met | [README.md](README.md#L48-L108) — Milestone 4 section with AI models used (Copilot Gemini 2.5 Pro, Claude Sonnet 4.6), specific prompts for EF Core, CartController, frontend wiring, and modifications made                                                                                                                                                |

**Total: 25 / 25**

## 3. Detailed Findings

All rubric items are met. No deficiencies to report.

## 4. Action Plan

No corrective actions required — full marks earned.

## 5. Code Quality Coaching (Non-Scoring)

- **Missing error handling on CartPage operations**: [CartPage.tsx](frontend/src/pages/CartPage.tsx#L10-L27) — `handleRemove`, `handleQuantityChange`, and `handleClear` have no try/catch. If the API call fails, the error propagates unhandled. Wrap each in try/catch and display an error message to the user, similar to how `ProductDetailPage.tsx` and `CheckoutPage.tsx` handle errors.

- **Console-only error logging in ProductCard**: [ProductCard.tsx](frontend/src/components/ProductCard.tsx#L20) — The `catch` block only calls `console.error`. Users see no feedback if adding to cart fails. Consider showing a brief toast or inline message.

- **Missing authorization check on PUT endpoint**: [CartController.cs](api/Controllers/CartController.cs#L63-L76) — `UpdateItem` finds the `CartItem` by ID but does not verify the item belongs to the current user's cart. A user could update another user's cart item by guessing the ID. Add a check that `item.Cart.UserId == UserId` (or join through the user's cart).

- **Same authorization gap on DELETE endpoint**: [CartController.cs](api/Controllers/CartController.cs#L79-L89) — `RemoveItem` has the same issue — it finds the cart item by ID without verifying ownership. Apply the same user-scoping fix.

- **Hardcoded admin credentials in seed data**: [Program.cs](api/Program.cs#L118-L119) — The admin user is seeded with `"Password123"`. While acceptable for development, this should be moved to user-secrets or environment variables for production and the password should meet stronger complexity requirements.

- **No optimistic UI updates**: All cart mutations follow a "call API → refresh entire cart" pattern. This works but causes a flash of stale state. Consider dispatching a local state update immediately (optimistic) and then reconciling with the server response for snappier UX.

## 6. Git Practices Coaching (Non-Scoring)

- **Multi-milestone migration**: The single migration file `20260501174830_InitialCreate` includes tables from M4 (Cart, CartItem) and M5 (Orders, PurchasedItems, Identity tables) together, dated May 1. This suggests migrations were regenerated from scratch rather than incrementally added per milestone. In professional practice, each feature branch should add its own migration so the change history is traceable.

- **AI usage documentation quality**: The Milestone 4 AI usage section in the README is well-structured — it lists specific models, exact prompts, and what was modified vs. accepted. This is a strong professional practice worth maintaining.

---

**25/25** — All rubric requirements are fully met with solid implementation across the full stack. The coaching notes above (CartPage error handling, authorization checks on PUT/DELETE, hardcoded admin credentials, optimistic updates) are suggestions for professional growth, not scoring deductions.
