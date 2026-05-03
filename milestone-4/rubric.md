# Grading Rubric (25 points)

| Criterion                        | Excellent (90-100%)                                                          | Good (80-89%)                     | Satisfactory (70-79%)     | Needs Work (<70%)          | Points |
| -------------------------------- | ---------------------------------------------------------------------------- | --------------------------------- | ------------------------- | -------------------------- | ------ |
| **Cart State Management**        | Robust state with useReducer/Context; all operations smooth; count in header | Good state management, minor gaps | Basic add/remove working  | Broken or incomplete state | 5      |
| **Cart API Endpoints**           | All 5 endpoints working; proper HTTP methods; correct status codes           | Most endpoints working            | Basic GET/POST working    | Many broken endpoints      | 5      |
| **Database Persistence**         | EF entities with relationships; migrations applied; data persists reliably   | Good persistence, minor issues    | Basic persistence working | Data loss or broken schema | 4      |
| **Frontend-Backend Integration** | Mock data removed; all cart ops use API; state stays in sync                 | Good integration, minor bugs      | Basic integration working | Many broken connections    | 5      |
| **Error Handling & UX**          | Loading states, error messages, edge cases handled, success feedback         | Good UX, minor gaps               | Basic error messages      | Poor or missing feedback   | 3      |
| **Code Quality**                 | Clean structure; service layer; AI usage documented                          | Good code quality                 | Adequate code             | Poor organization          | 3      |

### Point Breakdown Detail

#### Cart State Management (5 points)

- useReducer or Context API for cart state: 2 pts
- Add, update quantity, remove operations: 2 pts
- Cart count in header + calculated totals: 1 pt

#### Cart API Endpoints (5 points)

- GET /api/cart: 1 pt
- POST /api/cart (add item): 1 pt
- PUT /api/cart/{cartItemId} (update qty): 1 pt
- DELETE endpoints (item + clear): 1 pt
- Proper status codes and responses: 1 pt

#### Database Persistence (4 points)

- Cart/CartItem EF entities: 2 pts
- Relationships and navigation properties: 1 pt
- Migrations applied, data persists: 1 pt

#### Frontend-Backend Integration (5 points)

- Real API replaces mock/localStorage: 2 pts
- All cart operations call API: 2 pts
- State synchronization: 1 pt

#### Error Handling & UX (3 points)

- Loading states: 1 pt
- Error messages and edge cases: 1 pt
- Success feedback: 1 pt

#### Code Quality (3 points)

- Clean component structure: 1 pt
- Service layer / custom hooks: 1 pt
- AI usage documented: 1 pt
