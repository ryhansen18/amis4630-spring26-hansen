using Xunit;

namespace Api.Tests;

// Integration tests are skipped in CI/CD because they require full app startup
// with a real relational database. Unit tests in OrderTest.cs and PasswordTest.cs
// cover business logic. End-to-end coverage is handled by Playwright tests against
// the deployed API (see frontend/e2e/).
public class IntegrationTest
{
    [Fact(Skip = "E2E coverage via Playwright against deployed API")]
    public void GetProducts_Returns200()
    {
        // Covered by Playwright e2e tests
    }

    [Fact(Skip = "E2E coverage via Playwright against deployed API")]
    public void GetCart_Without_Auth_Returns401()
    {
        // Covered by Playwright e2e tests
    }
}