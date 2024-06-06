namespace RestaurantWebApi.Database
{
    public class OrderDatabaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string CollectionName { get; set; } = string.Empty;

        public bool IsSSL { get; set; }

    }
}
