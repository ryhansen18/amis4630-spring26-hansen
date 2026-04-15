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
public class CartController : ControllerBase
{
    private readonly AppDbContext _db;

    public CartController(AppDbContext db)
    {
        _db = db;
    }

    private string UserId => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    // GET /api/cart
    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var cart = await GetOrCreateCartAsync();
        return Ok(MapToResponse(cart));
    }

    // POST /api/cart
    [HttpPost]
    public async Task<IActionResult> AddItem([FromBody] AddCartItemRequest request)
    {
        if (request.Quantity < 1)
            return BadRequest("Quantity must be at least 1.");

        var product = await _db.Products.FindAsync(request.ProductId);
        if (product is null)
            return NotFound($"Product {request.ProductId} not found.");

        var cart = await GetOrCreateCartAsync();

        var existing = cart.Items.FirstOrDefault(i => i.ProductId == request.ProductId);
        if (existing is not null)
        {
            existing.Quantity += request.Quantity;
        }
        else
        {
            cart.Items.Add(new CartItem
            {
                ProductId = request.ProductId,
                Quantity = request.Quantity
            });
        }

        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCart), MapToResponse(cart));
    }

    // PUT /api/cart/{cartItemId}
    [HttpPut("{cartItemId}")]
    public async Task<IActionResult> UpdateItem(int cartItemId, [FromBody] UpdateCartItemRequest request)
    {
        if (request.Quantity < 1)
            return BadRequest("Quantity must be at least 1.");

        var item = await _db.CartItems.FindAsync(cartItemId);
        if (item is null)
            return NotFound($"Cart item {cartItemId} not found.");

        item.Quantity = request.Quantity;
        await _db.SaveChangesAsync();
        return Ok(new { item.Id, item.ProductId, item.Quantity });
    }

    // DELETE /api/cart/{cartItemId}
    [HttpDelete("{cartItemId:int}")]
    public async Task<IActionResult> RemoveItem(int cartItemId)
    {
        var item = await _db.CartItems.FindAsync(cartItemId);
        if (item is null)
            return NotFound($"Cart item {cartItemId} not found.");

        _db.CartItems.Remove(item);
        await _db.SaveChangesAsync();
        return Ok();
    }

    // DELETE /api/cart/clear
    [HttpDelete("clear")]
    public async Task<IActionResult> ClearCart()
    {
        var cart = await GetOrCreateCartAsync();
        _db.CartItems.RemoveRange(cart.Items);
        await _db.SaveChangesAsync();
        return Ok();
    }

    // --- Helpers ---

    private async Task<Cart> GetOrCreateCartAsync()
    {
        var cart = await _db.Carts
            .Include(c => c.Items)
            .ThenInclude(i => i.Product)
            .FirstOrDefaultAsync(c => c.UserId == UserId);

        if (cart is null)
        {
            cart = new Cart { UserId = UserId };
            _db.Carts.Add(cart);
            await _db.SaveChangesAsync();
        }

        return cart;
    }

    private static object MapToResponse(Cart cart) => new
    {
        cartId = cart.Id,
        userId = cart.UserId,
        items = cart.Items.Select(i => new
        {
            cartItemId = i.Id,
            productId = i.ProductId,
            title = i.Product?.Title,
            price = i.Product?.Price,
            imageUrl = i.Product?.ImageUrl,
            quantity = i.Quantity
        }),
        total = cart.Items.Sum(i => i.Product?.Price * i.Quantity ?? 0)
    };
}

// Request DTOs
public record AddCartItemRequest(int ProductId, int Quantity);
public record UpdateCartItemRequest(int Quantity);