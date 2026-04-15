using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _db;

    public AdminController(AppDbContext db)
    {
        _db = db;
    }

    // GET /api/admin/orders
    [HttpGet("orders")]
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

    // POST /api/admin/products
    [HttpPost("products")]
    public async Task<IActionResult> CreateProduct([FromBody] ProductRequest request)
    {
        var product = new Product
        {
            Title = request.Title,
            Description = request.Description,
            Price = request.Price,
            Category = request.Category,
            SellerName = request.SellerName,
            ImageUrl = request.ImageUrl,
            PostedDate = DateTime.UtcNow
        };

        _db.Products.Add(product);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    // GET /api/admin/products/{id}
    [HttpGet("products/{id}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product is null) return NotFound();
        return Ok(product);
    }

    // PUT /api/admin/products/{id}
    [HttpPut("products/{id}")]
    public async Task<IActionResult> UpdateProduct(int id, [FromBody] ProductRequest request)
    {
        var product = await _db.Products.FindAsync(id);
        if (product is null) return NotFound();

        product.Title = request.Title;
        product.Description = request.Description;
        product.Price = request.Price;
        product.Category = request.Category;
        product.SellerName = request.SellerName;
        product.ImageUrl = request.ImageUrl;

        await _db.SaveChangesAsync();
        return Ok(product);
    }

    // DELETE /api/admin/products/{id}
    [HttpDelete("products/{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product is null) return NotFound();

        _db.Products.Remove(product);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

public record ProductRequest(
    string Title,
    string Description,
    decimal Price,
    string Category,
    string SellerName,
    string ImageUrl
);