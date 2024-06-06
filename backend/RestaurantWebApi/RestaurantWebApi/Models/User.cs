namespace RestaurantWebApi.Models
{
    public class User
    {
        [BsonId]
        public string? _id { get; set; }

        [BsonElement("role")]
        public string Role { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }
    }
}
