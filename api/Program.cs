using Api.Data;
using Api.Middleware;
using Api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not configured.");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();

var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("JWT key not configured. Set Jwt:Key via user secrets locally or as an app setting in production.");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

builder.Services.AddAuthorization();

var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>()
    ?? new[] { "http://localhost:5173" };

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins(allowedOrigins)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Auto-apply migrations on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

// Seed products if none exist
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    if (!db.Products.Any())
    {
        db.Products.AddRange(
            new Product { Title = "Intro to Psych Textbook", Description = "Lightly used PSYCH 1100 textbook, 7th edition (newest)", Price = 45.00m, Category = "Textbooks", SellerName = "Marcus Johnson", PostedDate = DateTime.UtcNow, ImageUrl = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop" },
            new Product { Title = "Organic Chemistry Books (ORGO 1-3)", Description = "CHEM 2520/2522 textbooks. Both barely used, left my post-its in for note purposes!", Price = 78.50m, Category = "Textbooks", SellerName = "Priya Patel", PostedDate = DateTime.UtcNow, ImageUrl = "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop" },
            new Product { Title = "Calculus: Early Transcendentals", Description = "Textbook for CALC 1151/1152, barely used at all.", Price = 55.00m, Category = "Textbooks", SellerName = "Jordan Williams", PostedDate = DateTime.UtcNow, ImageUrl = "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop" },
            new Product { Title = "Apple iPad Air 5th Gen", Description = "64GB, Wi-Fi, Space Gray. Includes Apple Pencil 2nd gen for notability purposes.", Price = 425.00m, Category = "Electronics", SellerName = "Emily Chen", PostedDate = DateTime.UtcNow, ImageUrl = "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop" },
            new Product { Title = "Dell 27\" Monitor", Description = "1080p IPS display, great for dual-monitor dorm setup. HDMI and DisplayPort.", Price = 120.00m, Category = "Electronics", SellerName = "Tyler Robinson", PostedDate = DateTime.UtcNow, ImageUrl = "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop" },
            new Product { Title = "Marc Smith Accounting 1/2 Tutoring Services", Description = "Hi. My name is Reed, im a grad student here at OSU on track for my CPA. I excelled in both Accounting 1 & 2 but know how hard it can be for some. Hire me to help!", Price = 75.00m, Category = "Services", SellerName = "Reed Medina", PostedDate = DateTime.UtcNow, ImageUrl = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop" },
            new Product { Title = "IKEA MALM Desk", Description = "White 55inch desk. Easy to dissassemble/assemble so pickup shouldn't be an issue. I'm moving out so I'd negotiate price.", Price = 60.00m, Category = "Furniture", SellerName = "Jay Ritzmann", PostedDate = DateTime.UtcNow, ImageUrl = "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop" },
            new Product { Title = "Used Futon Sofa Bed", Description = "Used futon, still in good condition. Can fold out to become a bed - kept in apartment.", Price = 95.00m, Category = "Furniture", SellerName = "Jay Ritzmann", PostedDate = DateTime.UtcNow, ImageUrl = "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop" }
        );
        db.SaveChanges();
    }
}

// Seed roles and admin user
using (var scope = app.Services.CreateScope())
{
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    if (!await roleManager.RoleExistsAsync("Admin"))
        await roleManager.CreateAsync(new IdentityRole("Admin"));

    if (!await roleManager.RoleExistsAsync("User"))
        await roleManager.CreateAsync(new IdentityRole("User"));

    var adminEmail = "admin@osu.edu";
    if (await userManager.FindByEmailAsync(adminEmail) is null)
    {
        var admin = new AppUser
        {
            UserName = adminEmail,
            Email = adminEmail,
            FullName = "Admin User",
            EmailConfirmed = true
        };
        await userManager.CreateAsync(admin, "Password123");
        await userManager.AddToRoleAsync(admin, "Admin");
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();