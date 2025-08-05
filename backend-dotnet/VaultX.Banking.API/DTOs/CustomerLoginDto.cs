using System.ComponentModel.DataAnnotations;

namespace VaultX.Banking.API.DTOs;

public class CustomerLoginDto
{
    [Required(ErrorMessage = "Email or phone is required")]
    public string EmailOrPhone { get; set; } = string.Empty;

    [Required(ErrorMessage = "Password is required")]
    public string Password { get; set; } = string.Empty;
}
