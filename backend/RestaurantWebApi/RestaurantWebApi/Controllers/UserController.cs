using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using RestaurantWebApi.Models;

namespace RestaurantWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMongoCollection<User> _users;
        public UserController(MongoDbAtlasService mongoDbAtlasService)
        {
            _users = mongoDbAtlasService.Database?.GetCollection<User>("user");
        }

        [HttpGet]
        public async Task<IEnumerable<User>> Get()
        {
            return await _users.Find(_ => true).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User?>> GetById(string id)
        {
            var filter = Builders<User>.Filter.Eq(user => user._id, id);
            var user = _users.Find(filter).FirstOrDefault();
            return user is not null ? Ok(user) : NotFound();

        }

        [HttpPost]
        public async Task<ActionResult> Post(User user)
        {
            try {
                await _users.InsertOneAsync(user);
                return CreatedAtAction(nameof(GetById), new { id = user._id }, user);
            }
            catch (MongoWriteException ex) when (ex.WriteError.Category == ServerErrorCategory.DuplicateKey)
            {
                return Conflict(new { message = "Um usuario com este email já exite." });
            }            
           
        }

        [HttpPost("authentication")]
        public async Task<ActionResult<User?>> Authenticate(User user)
        {
            var result = await GetById(user._id);
            if (result.Result is NotFoundResult)
            {
                return NotFound(new { message = "Usuário não encontrado." });
            }
            
            var userFound = (result.Result as OkObjectResult).Value as User;

            if (userFound.Password != user.Password) {
                return Unauthorized(new { message = "Senha incorreta." });
            }

            return Ok(userFound);

        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(String id)
        {
            var filter = Builders<User>.Filter.Eq(user => user._id, id);
            await _users.DeleteOneAsync(filter);
            return Ok();
        }

    }
}
