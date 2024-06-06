using Microsoft.AspNetCore.Mvc.Testing;
using RestaurantWebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace RestaurantWebApiTest
{
    public class UserControllerTest : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;
        private readonly HttpClient _client;

        public UserControllerTest(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task Get_EndpointsReturnSuccessAndCorrectContentType()
        {


            var response = await _client.GetAsync("/api/user");

            response.EnsureSuccessStatusCode();
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

        }
        [Fact]
        public async Task Post_ShouldReturnCorretUserProperties()
        {
            var user = new User
            {
                _id = "teste@teste.com",
                Password = "Nome Teste1",
                Role = "cozinha"
            };


            var content = new StringContent(JsonSerializer.Serialize(user), Encoding.UTF8, "application/json");

            var postResponse = await _client.PostAsync("/api/user", content);
            postResponse.EnsureSuccessStatusCode();

            var responseString = await postResponse.Content.ReadAsStringAsync();

            var createdUser = JsonSerializer.Deserialize<User>(responseString,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });


            Assert.NotNull(createdUser);

            Assert.Equal(user._id, createdUser._id);
            Assert.Equal(user.Password, createdUser.Password);
            Assert.Equal(user.Role, createdUser.Role);
           

            var deleteResponse = await _client.DeleteAsync($"/api/user/{createdUser._id}");
            deleteResponse.EnsureSuccessStatusCode();

        }

        [Fact]
        public async Task GetById_ShouldReturnCorretUserProperties()
        {
            var user = new User
            {
                _id = "teste@teste.com",
                Password = "Nome Teste1",
                Role = "cozinha"
            };


            var content = new StringContent(JsonSerializer.Serialize(user), Encoding.UTF8, "application/json");

            var postResponse = await _client.PostAsync("/api/user", content);
            postResponse.EnsureSuccessStatusCode();

            var responseString = await postResponse.Content.ReadAsStringAsync();

            var createdUser = JsonSerializer.Deserialize<User>(responseString,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            var getByIdResponse = await _client.GetAsync($"/api/user/{createdUser._id}");

            getByIdResponse.EnsureSuccessStatusCode();

            var getByIdResponseString = await getByIdResponse.Content.ReadAsStringAsync();

            var returnedUser = JsonSerializer.Deserialize<User>(getByIdResponseString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            Assert.NotNull(returnedUser);

            Assert.Equal(user._id, returnedUser._id);
            Assert.Equal(user.Password, returnedUser.Password);
            Assert.Equal(user.Role, returnedUser.Role);

            var deleteResponse = await _client.DeleteAsync($"/api/user/{returnedUser._id}");
            deleteResponse.EnsureSuccessStatusCode();

        }

        [Fact]
        public async Task Post_ShouldReturnConflictWithSameIdUsers()
        {
            var user = new User
            {
                _id = "teste@teste1.com",
                Password = "Password",
                Role = "cozinha"
            };


            var content = new StringContent(JsonSerializer.Serialize(user), Encoding.UTF8, "application/json");

            var postResponse = await _client.PostAsync("/api/user", content);
            postResponse.EnsureSuccessStatusCode();

            var responseString = await postResponse.Content.ReadAsStringAsync();

            var createdUser = JsonSerializer.Deserialize<User>(responseString,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });


            var repeatedUserResponse = await _client.PostAsync("/api/user", content);
            Assert.Equal(System.Net.HttpStatusCode.Conflict, repeatedUserResponse.StatusCode);




            var deleteResponse = await _client.DeleteAsync($"/api/user/{createdUser._id}");
            deleteResponse.EnsureSuccessStatusCode();

        }

        [Fact]
        public async Task Authenticate_ShouldReturnNotFoundWithAbsentId()
        {
            var user = new User
            {
                _id = "absentID",
                Password = "Password",
                Role = "cozinha"
            };



            var content = new StringContent(JsonSerializer.Serialize(user), Encoding.UTF8, "application/json");

            var authenticationResponse = await _client.PostAsync("/api/user/authentication", content);
            Assert.Equal(System.Net.HttpStatusCode.NotFound, authenticationResponse.StatusCode);







        }
        [Fact]
        public async Task Authenticate_ShouldReturnUnauthorizedForWrongPassword()
        {
            var user = new User
            {
                _id = "TestEmail",
                Password = "Password",
                Role = "copa"
            };


            var content = new StringContent(JsonSerializer.Serialize(user), Encoding.UTF8, "application/json");

            var postResponse = await _client.PostAsync("/api/user", content); 
            postResponse.EnsureSuccessStatusCode();

            var responseString = await postResponse.Content.ReadAsStringAsync();

            var createdUser = JsonSerializer.Deserialize<User>(responseString,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            var authenticationContent = new StringContent(JsonSerializer.Serialize(new User { _id = user._id, Password = "WrongPassword", Role = "Copa" }), Encoding.UTF8, "application/json");

            var authenticationResponse = await _client.PostAsync("/api/user/authentication",authenticationContent );
            Assert.Equal(System.Net.HttpStatusCode.Unauthorized, authenticationResponse.StatusCode);

            var deleteResponse = await _client.DeleteAsync($"/api/user/{createdUser._id}");
            deleteResponse.EnsureSuccessStatusCode();


        }
        [Fact]
        public async Task Authenticate_ShouldOk()
        {
            var user = new User
            {
                _id = "TestEmail2",
                Password = "Password",
                Role = "copa"
            };


            var content = new StringContent(JsonSerializer.Serialize(user), Encoding.UTF8, "application/json");

            var postResponse = await _client.PostAsync("/api/user", content);
            postResponse.EnsureSuccessStatusCode();

            var responseString = await postResponse.Content.ReadAsStringAsync();

            var createdUser = JsonSerializer.Deserialize<User>(responseString,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });


            var authenticationResponse = await _client.PostAsync("/api/user/authentication", content);
            Assert.Equal(System.Net.HttpStatusCode.OK, authenticationResponse.StatusCode);

            var deleteResponse = await _client.DeleteAsync($"/api/user/{createdUser._id}");
            deleteResponse.EnsureSuccessStatusCode();


        }
    }
}
