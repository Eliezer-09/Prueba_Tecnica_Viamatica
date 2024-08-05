using System;
using System.Text.Json.Serialization;

namespace EcommerceAPI.Models
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public int CartId { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Cart Cart { get; set; }
    }
}
