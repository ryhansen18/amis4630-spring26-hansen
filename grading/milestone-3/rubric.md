# **Grading Rubric (25 Points)**

| Criterion                                | Excellent (90–100%)                                                                                                               | Good (80–89%)                                                     | Satisfactory (70–79%)                                     | Needs Work (\<70%)                 | Pts |
| :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- | :-------------------------------------------------------- | :--------------------------------- | :-- |
| **React Product List Page**              | List displays correctly with all required fields; loading/empty states handled; component hierarchy follows Atomic Design from M2 | All fields shown; loading or empty state present; basic structure | Product data renders but missing states or poor structure | Non-functional or missing          | 5   |
| **React Product Detail Page**            | Separate route/component; all required fields; navigation works both ways (list ↔ detail)                                         | Route works; most fields shown                                    | Static page or navigation broken                          | Missing or non-functional          | 5   |
| **API Endpoint: GET /api/products**      | Returns correct JSON array; proper HTTP status codes; in-memory data store used                                                   | Returns product data; minor issues with shape or status codes     | Returns data but incorrect format                         | Missing or errors                  | 5   |
| **API Endpoint: GET /api/products/{id}** | Returns single product by ID; 404 for unknown ID; correct JSON shape                                                              | Returns product; missing 404 handling                             | Returns data inconsistently                               | Missing or errors                  | 5   |
| **Frontend-to-API Integration**          | React fetches live data from .NET API; no hardcoded data in components; error state handled                                       | Fetches from API; minor error handling gaps                       | Partially integrated; some hardcoded data remains         | Components use hardcoded data only | 5   |

## Solution Layout Standard

```text
/backend
/frontend
/docs
```
