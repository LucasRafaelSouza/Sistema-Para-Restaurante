using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace RestaurantWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IMongoCollection<Order> _orders;
        public OrderController(MongoDbAtlasService mongoDbAtlasService) {
            _orders = mongoDbAtlasService.Database?.GetCollection<Order>("order");
        }

        [HttpGet]
        public async Task<IEnumerable<Order>> Get()
        {
            return await _orders.Find(_ => true).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Order?>> GetById(string id)
        {
            var filter = Builders<Order>.Filter.Eq(order => order._id, id);
            var order = _orders.Find(filter).FirstOrDefault();
            return order is not null ? Ok(order): NotFound() ;

        }

        [HttpPost]
        public async Task<ActionResult> Post(Order order)
        {
            await _orders.InsertOneAsync(order);
            return CreatedAtAction(nameof(GetById), new { id = order._id },order);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(String id)
        {
            var filter = Builders<Order>.Filter.Eq(order => order._id, id);
            await _orders.DeleteOneAsync(filter);
            return Ok();
        }
    }
}
