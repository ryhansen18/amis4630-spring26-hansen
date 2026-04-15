using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserOrderController : ControllerBase
{
    private readonly AppDbContext _db;

    public UserOrderController(AppDbContext db)
    {
        _db = db;
    }

    private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    // POST /api/userorder
    [HttpPost]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.ShippingAddress))
            return BadRequest("Shipping address is required.");

        var cart = await _db.Carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == UserId);

        if (cart is null || !cart.Items.Any())
            return BadRequest("Your cart is empty.");

        var order = new Order
        {
            UserId = UserId,
            ShippingAddress = request.ShippingAddress,
            OrderDate = DateTime.UtcNow,
            Status = "Pending",
            ConfirmationNumber = Guid.NewGuid().ToString("N")[..8].ToUpper(),
            Total = cart.Items.Sum(i => i.Product!.Price * i.Quantity),
            Items = cart.Items.Select(i => new PurchasedItem
            {
                ProductId = i.ProductId,
                ProductTitle = i.Product!.Title,
                Price = i.Product.Price,
                Quantity = i.Quantity
            }).ToList()
        };

        _db.Orders.Add(order);
        _db.CartItems.RemoveRange(cart.Items);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMyOrders), new { }, new
        {
            order.Id,
            order.ConfirmationNumber,
            order.Total,
            order.Status,
            order.OrderDate,
            order.ShippingAddress,
            items = order.Items.Select(i => new
            {
                i.ProductTitle,
                i.Price,
                i.Quantity,
                lineTotal = i.Price * i.Quantity
            })
        });
    }

    // GET /api/userorder/mine
    [HttpGet("mine")]
    public async Task<IActionResult> GetMyOrders()
    {
        var orders = await _db.Orders
            .Include(o => o.Items)
            .Where(o => o.UserId == UserId)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return Ok(orders.Select(o => new
        {
            o.Id,
            o.ConfirmationNumber,
            o.Total,
            o.Status,
            o.OrderDate,
            o.ShippingAddress,
            items = o.Items.Select(i => new
            {
                i.ProductTitle,
                i.Price,
                i.Quantity,
                lineTotal = i.Price * i.Quantity
            })
        }));
    }

    // PUT /api/userorder/{orderId}/status (admin only)
    [HttpPut("{orderId}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateStatus(int orderId, [FromBody] UpdateOrderStatusRequest request)
    {
        var order = await _db.Orders.FindAsync(orderId);
        if (order is null)
            return NotFound($"Order {orderId} not found.");

        order.Status = request.Status;
        await _db.SaveChangesAsync();
        return Ok(new { order.Id, order.Status });
    }

    // GET /api/userorder (admin only)
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _db.Orders
            .Include(o => o.Items)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return Ok(orders.Select(o => new
        {
            o.Id,
            o.UserId,
            o.ConfirmationNumber,
            o.Total,
            o.Status,
            o.OrderDate,
            o.ShippingAddress,
            itemCount = o.Items.Count
        }));
    }
}

public record CreateOrderRequest(string ShippingAddress);
public record UpdateOrderStatusRequest(string Status);