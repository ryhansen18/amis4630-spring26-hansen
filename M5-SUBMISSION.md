# M5 Submission

## Credentials to be used for testing purposes

**Generic User:**
- Email: test@osu.edu
- Password: Password123

**Admin Privleges:**
- Email: admin@osu.edu
- Password: Password123

## JWT User Secrets
```bash
dotnet user-secrets set "Jwt:Key" "AaronJudgeIsAwesome2026NYYANKEES!"
dotnet user-secrets set "Jwt:Issuer" "BuckeyeMarketplace"
dotnet user-secrets set "Jwt:Audience" "BuckeyeMarketplace2"
```

## Security Practices Applied

**1. JWT claim-scoped queries**
User IDs pulled from JWT, in order to make sure users can't access other users accounts.

**2. JWT signing key in user secrets**
The key for assigning user tokens is stored in dotnet, but not deposited into GitHub.

**3. Parameterized queries via EF Core**
Database queries processed with LINQ, which automatically use parameterized SQL. No raw string SQL anywhere. 

**4. HTTPS redirect**
HTTP traffic redirected to HTTPS

**5. Role-based authorization**
All features and endpoints work with any given user, though, any admin-based endpoints, privleges, etc. require admin verification (login) in order to be executed.

## AI Usage
See [AI-USAGE.md](./AI-USAGE.md)