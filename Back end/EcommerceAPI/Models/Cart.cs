using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EcommerceAPI.Models
{
    public class Cart
    {
        public int CartId { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public User User { get; set; }
        public ICollection<CartItem> CartItems { get; set; }
    }
}
