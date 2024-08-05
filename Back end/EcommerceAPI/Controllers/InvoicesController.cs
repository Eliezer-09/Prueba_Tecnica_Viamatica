using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceAPI.Data;
using EcommerceAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System;

namespace EcommerceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InvoicesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Invoices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices()
        {
            return await _context.Invoices
                .Include(i => i.Cart)
                    .ThenInclude(c => c.User)
                .Include(i => i.Cart.CartItems)
                    .ThenInclude(ci => ci.Product)
                .ToListAsync();
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Invoice>> GetInvoice(int id)
        {
            var invoice = await _context.Invoices
                .Include(i => i.Cart)
                    .ThenInclude(c => c.User)
                .Include(i => i.Cart.CartItems)
                    .ThenInclude(ci => ci.Product)
                .FirstOrDefaultAsync(i => i.InvoiceId == id);

            if (invoice == null)
            {
                return NotFound();
            }

            return invoice;
        }

        // POST: api/Invoices
        [HttpPost]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
            if (invoice == null || invoice.CartId == 0 || invoice.TotalAmount <= 0)
            {
                return BadRequest("Invalid invoice data");
            }

            invoice.CreatedAt = DateTime.UtcNow;

            try
            {
                _context.Invoices.Add(invoice);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetInvoice), new { id = invoice.InvoiceId }, invoice);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.InvoiceId == id);
        }
    }
}
