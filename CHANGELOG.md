# Changelog

## Milestone 5 — Authentication, Security & Order Processing

### What features were added?
- ASP.NET Core Identity
- JWT token generation and validation
- UserAcctController: Created neccessary endpoints
- Authentication used for cart endpoints — user ID from JWT
- UserOrderController for placing orders and viewing history of them, on a per user basis
- AdminController: product CRUD and view all orders (admin only)
- Order and PurchasedItem models with EF migration
- Created on frontend: Authorization page, dedicated login page and order page
- Protected routes created, if no authentication passed leads to a redirect
- JWT token automatically included in all API requests
- Checkout page prompting user to input address
- Order confirmation page with a generated confirmation number (for order validation purposes by user)
- Order history page
- Admin dashboard created to view orders and modify listed products/creating them

## Tests carried out
- 11 backend tests passing (xUnit)
- 10 frontend unit/component tests passing (Vitest)
- Playwright E2E test 


### Security Summarization
- JWT signing key stored in user secrets, never committed to repo
- All protected endpoints scoped to the logged-in user's JWT claims
- Role-based authorization on all admin endpoints
- Parameterized queries via LINQ
- HTTPS redirect middleware enabled