namespace RestaurantWebApi.Services
{
    public class MongoDbAtlasService
    {
        private readonly IMongoDatabase? _database;
        private readonly OrderDatabaseSettings _settings;

        public MongoDbAtlasService(IOptions<OrderDatabaseSettings> settings)
        {
            _settings = settings.Value;
            var mongoClient = new MongoClient(_settings.ConnectionString);
            _database = mongoClient.GetDatabase(_settings.DatabaseName);
        }

        public IMongoDatabase Database => _database;
    }
}
