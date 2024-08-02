using System;
using System.Text.Json.Serialization;

namespace EcommerceAPI.Models
{
    public class Invoice
    {
        public int InvoiceId { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
