using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Data;
using EcommerceAPI.Models;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace EcommerceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            if (user == null || string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password) || string.IsNullOrEmpty(user.Email))
            {
                return BadRequest("Invalid user data");
            }

            user.CreatedAt = DateTime.UtcNow;

            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(User user)
        {
            var existingUser = await _context.Users
                .Where(u => u.Username == user.Username && u.Password == user.Password)
                .FirstOrDefaultAsync();

            if (existingUser == null)
            {
                return Unauthorized();
            }

            return Ok(existingUser);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
    }
}
