namespace Api.Models;

public class Cart
{
    public int Id { get; set; }
    public string UserId { get; set; } = "guest";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<CartItem> Items { get; set; } = new();
}