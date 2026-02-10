using Microsoft.AspNetCore.Mvc;

namespace HelloWorldApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HelloController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetHello()
        {
            return Ok(new
            {
                message = "Hello from .NET! 🎉",
                timestamp = DateTime.UtcNow
            });
        }

        // ⭐ NEW METHOD - accepts name parameter
        [HttpGet("personalized")]
        public IActionResult GetPersonalizedHello([FromQuery] string name = "Student")
        {
            return Ok(new
            {
                message = $"Hello, {name}! Welcome to full-stack development! 🚀",
                timestamp = DateTime.UtcNow
            });
        }
    }
}
