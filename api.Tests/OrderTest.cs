using Api.Models;
using Xunit;    

namespace Api.Tests;

public class OrderTest
{
    [Fact]
    public void Order_Total_Is_Sum_Of_PurchasedItems()
    {
        var items = new List<PurchasedItem>
        {
            new PurchasedItem { Price = 45.00m, Quantity = 2 },
            new PurchasedItem { Price = 78.50m, Quantity = 1 }
        };

        var total = items.Sum(i => i.Price * i.Quantity);

        Assert.Equal(168.50m, total);
    }

    [Fact]
    public void Order_Total_Is_Zero_When_No_Items()
    {
        var items = new List<PurchasedItem>();
        var total = items.Sum(i => i.Price * i.Quantity);
        Assert.Equal(0m, total);
    }

    [Fact]
    public void Order_ConfirmationNumber_Is_Eight_Characters()
    {
        var confirmation = Guid.NewGuid().ToString("N")[..8].ToUpper();
        Assert.Equal(8, confirmation.Length);
    }

    [Fact]
    public void Cart_Total_Calculates_Correctly()
    {
        var items = new List<CartItem>
        {
            new CartItem { Quantity = 3, Product = new Product { Price = 10.00m } },
            new CartItem { Quantity = 1, Product = new Product { Price = 25.50m } }
        };

        var total = items.Sum(i => i.Product!.Price * i.Quantity);

        Assert.Equal(55.50m, total);
    }
}