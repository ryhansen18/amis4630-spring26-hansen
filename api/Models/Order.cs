namespace Api.Models;

public class Order
{
    public int Id { get; set; }
    public string UserId { get; set; } = string.Empty;
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public string Status { get; set; } = "Pending";
    public decimal Total { get; set; }
    public string ShippingAddress { get; set; } = string.Empty;
    public string ConfirmationNumber { get; set; } = string.Empty;

    public List<PurchasedItem> Items { get; set; } = new();
}