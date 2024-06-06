

using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http;
using System.Text.Json;
using System.Text;
using Xunit;
using RestaurantWebApi;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using MongoDB.Driver;
using RestaurantWebApi.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using RestaurantWebApi.Database;
using RestaurantWebApi.Services;
using System.Diagnostics;
using System.Net;

namespace RestaurantWebApiTest
{
    public class OrderControllerTest : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;
        private readonly HttpClient _client;
        public OrderControllerTest(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _client = factory.CreateClient();
        }


        [Fact]
        public async Task Get_EndpointsReturnSuccessAndCorrectContentType()
        {


            var response = await _client.GetAsync("/api/order");

            response.EnsureSuccessStatusCode(); 
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());

        }

        [Fact]
        public async Task Post_ShouldReturnCorretOrderProperties()
        {
            var order = new Order
            {
                DishName = "Prato teste1",
                ClientName = "Nome Teste1",
                TableNumber = 1,
                DrinkQuantity = 1,
                DrinkName = "Nome teste"
            };
    

            var content = new StringContent(JsonSerializer.Serialize(order), Encoding.UTF8, "application/json");

            var postResponse = await _client.PostAsync("/api/order", content);
            postResponse.EnsureSuccessStatusCode();

            var responseString = await postResponse.Content.ReadAsStringAsync();

            var createdOrder = JsonSerializer.Deserialize<Order>(responseString,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
         

            Assert.NotNull(createdOrder);

            Assert.Equal(order.DishName, createdOrder.DishName);
            Assert.Equal(order.ClientName, createdOrder.ClientName);
            Assert.Equal(order.TableNumber, createdOrder.TableNumber);
            Assert.Equal(order.DrinkQuantity, createdOrder.DrinkQuantity);
            Assert.Equal(order.DrinkName, createdOrder.DrinkName);

            var deleteResponse = await _client.DeleteAsync($"/api/order/{createdOrder._id}");
            deleteResponse.EnsureSuccessStatusCode();

        }


        [Fact]
        public async Task GetById_ShouldReturnCorretOrderProperties()
        {
            var order = new Order
            {
                DishName = "Prato teste2",
                ClientName = "Nome Teste2",
                TableNumber = 1,
                DrinkQuantity = 1,
                DrinkName = "Nome teste"
            };


            var content = new StringContent(JsonSerializer.Serialize(order), Encoding.UTF8, "application/json");

            var postResponse = await _client.PostAsync("/api/order", content);
            postResponse.EnsureSuccessStatusCode();

            var responseString = await postResponse.Content.ReadAsStringAsync();

            var createdOrder = JsonSerializer.Deserialize<Order>(responseString,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            var getByIdResponse = await _client.GetAsync($"/api/order/{createdOrder._id}");

            getByIdResponse.EnsureSuccessStatusCode();
            
            var getByIdResponseString = await getByIdResponse.Content.ReadAsStringAsync();

            var returnedOrder = JsonSerializer.Deserialize<Order>(getByIdResponseString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            
            Assert.NotNull(returnedOrder);
            Assert.Equal(createdOrder._id, returnedOrder._id);
            Assert.Equal(createdOrder.DishName, returnedOrder.DishName);
            Assert.Equal(createdOrder.ClientName, returnedOrder.ClientName);
            Assert.Equal(createdOrder.TableNumber, returnedOrder.TableNumber);
            Assert.Equal(createdOrder.DrinkQuantity, returnedOrder.DrinkQuantity);
            Assert.Equal(createdOrder.DrinkName, returnedOrder.DrinkName);

            var deleteResponse = await _client.DeleteAsync($"/api/order/{createdOrder._id}");
            deleteResponse.EnsureSuccessStatusCode();

        }
        /*
        [Fact]
        public async Task GetById_ReturnsNotFoundForInvalidId()
        {
            
            var response = await _client.GetAsync("/api/order/nonexistentId");

            
            Assert.Equal(System.Net.HttpStatusCode.NotFound, response.StatusCode);

           
        }*/
    }


}