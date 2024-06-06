namespace RestaurantWebApi.Models
{
    public class Order
    {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
        public string? _id { get; set; }

        [BsonElement("dish_name")]
        public string DishName { get; set; }

        [BsonElement("client_name")]
        public string ClientName { get; set; }

        [BsonElement("table_number")]
        public int TableNumber { get; set; }

        [BsonElement("drink_quantity")]
        public int DrinkQuantity { get; set; }

        [BsonElement("drink_name")]
        public string DrinkName { get; set; }

    }
}
