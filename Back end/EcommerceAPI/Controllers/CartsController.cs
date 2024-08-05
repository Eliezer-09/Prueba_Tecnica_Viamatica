using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Data;
using EcommerceAPI.Models;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace EcommerceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            return await _context.Carts
                .Include(c => c.User)
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.Product)
                .ToListAsync();
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _context.Carts
                .Include(c => c.User)
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(c => c.CartId == id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // POST: api/Carts
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            if (cart == null || cart.UserId == 0)
            {
                return BadRequest("Invalid cart data");
            }

            try
            {
                _context.Carts.Add(cart);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetCart), new { id = cart.CartId }, cart);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.CartId == id);
        }
    }
}
