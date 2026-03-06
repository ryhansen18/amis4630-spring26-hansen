using Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly List<Product> _products = new()
    {
        new Product
        {
            Id = 1,
            Title = "Intro to Psych Textbook",
            Description = "Lightly used PSYCH 1100 textbook, 7th edition (newest)",
            Price = 45.00m,
            Category = "Textbooks",
            SellerName = "Marcus Johnson",
            PostedDate = DateTime.UtcNow,
            ImageUrl = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop"
        },
        new Product
        {
            Id = 2,
            Title = "Organic Chemistry Books (ORGO 1-3)",
            Description = "CHEM 2520/2522 textbooks. Both barely used, left my post-its in for note purposes!",
            Price = 78.50m,
            Category = "Textbooks",
            SellerName = "Priya Patel",
            PostedDate = DateTime.UtcNow,
            ImageUrl = "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop"
        },
        new Product
        {
            Id = 3,
            Title = "Calculus: Early Transcendentals",
            Description = "Textbook for CALC 1151/1152, barely used at all.",
            Price = 55.00m,
            Category = "Textbooks",
            SellerName = "Jordan Williams",
            PostedDate = DateTime.UtcNow,
            ImageUrl = "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop"
        },
        new Product
        {
            Id = 4,
            Title = "Apple iPad Air 5th Gen",
            Description = "64GB, Wi-Fi, Space Gray. Includes Apple Pencil 2nd gen for notability purposes.",
            Price = 425.00m,
            Category = "Electronics",
            SellerName = "Emily Chen",
            PostedDate = DateTime.UtcNow,
            ImageUrl = "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop"
        },
        new Product
        {
            Id = 5,
            Title = "Dell 27\" Monitor",
            Description = "1080p IPS display, great for dual-monitor dorm setup. HDMI and DisplayPort.",
            Price = 120.00m,
            Category = "Electronics",
            SellerName = "Tyler Robinson",
            PostedDate = DateTime.UtcNow,
            ImageUrl = "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop"
        },
        new Product
        {
            Id = 6,
            Title = "Marc Smith Accounting 1/2 Tutoring Services",
            Description = "Hi. My name is Reed, im a grad student here at OSU on track for my CPA. I excelled in both Accounting 1 & 2 but know how hard it can be for some. Hire me to help!",
            Price = 75.00m,
            Category = "Services",
            SellerName = "Reed Medina",
            PostedDate = DateTime.UtcNow,
            ImageUrl = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop"
        },
        new Product
        {
            Id = 7,
            Title = "IKEA MALM Desk",
            Description = "White 55inch desk. Easy to dissassemble/assemble so pickup shouldn't be an issue. I'm moving out so I'd negotiate price.",
            Price = 60.00m,
            Category = "Furniture",
            SellerName = "Jay Ritzmann",
            PostedDate = DateTime.UtcNow,
            ImageUrl = "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop"
        },
        new Product
        {
            Id = 8,
            Title = "Used Futon Sofa Bed",
            Description = "Used futon, still in good condition. Can fold out to become a bed - kept in apartment.",
            Price = 95.00m,
            Category = "Furniture",
            SellerName = "Jay Ritzmann",
            PostedDate = DateTime.UtcNow,
            ImageUrl = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop"
        }
    };

    [HttpGet]
    public IActionResult GetAll() => Ok(_products);

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product is null)
            return NotFound();
        return Ok(product);
    }
}