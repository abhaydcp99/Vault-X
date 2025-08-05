using Microsoft.AspNetCore.Mvc;
using VaultX.Banking.API.DTOs;

namespace VaultX.Banking.API.Controllers;

[ApiController]
[Route("api")]
public class HealthController : ControllerBase
{
    [HttpGet("ping")]
    public ActionResult<ApiResponse<object>> Ping()
    {
        var response = new
        {
            message = "VaultX Banking API - .NET Core",
            status = "healthy",
            timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds().ToString()
        };
        
        return Ok(new ApiResponse<object>(true, "Ping successful", response));
    }

    [HttpGet("demo")]
    public ActionResult<ApiResponse<object>> Demo()
    {
        var response = new
        {
            message = ".NET Core Banking Demo API",
            backend = ".NET Core with Entity Framework",
            database = "In-Memory Database"
        };
        
        return Ok(new ApiResponse<object>(true, "Demo endpoint", response));
    }
}
