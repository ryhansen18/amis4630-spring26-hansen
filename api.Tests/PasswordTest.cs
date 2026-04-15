using Xunit;

namespace Api.Tests;

public class PasswordTest
{
    private static bool IsValidPassword(string password)
    {
        if (password.Length < 8) return false;
        if (!password.Any(char.IsUpper)) return false;
        if (!password.Any(char.IsDigit)) return false;
        return true;
    }

    [Fact]
    public void Password_With_Uppercase_And_Digit_Is_Valid()
    {
        Assert.True(IsValidPassword("Password123"));
    }

    [Fact]
    public void Password_Too_Short_Is_Invalid()
    {
        Assert.False(IsValidPassword("Pass1"));
    }

    [Fact]
    public void Password_Without_Uppercase_Is_Invalid()
    {
        Assert.False(IsValidPassword("password123"));
    }

    [Fact]
    public void Password_Without_Digit_Is_Invalid()
    {
        Assert.False(IsValidPassword("PasswordOnly"));
    }
}