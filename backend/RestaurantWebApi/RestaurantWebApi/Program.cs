var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<OrderDatabaseSettings>(builder.Configuration.GetSection("OrderDatabaseSettings"));
builder.Services.AddSingleton<MongoDbAtlasService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(builder => builder
       .AllowAnyHeader()
       .AllowAnyMethod()
       .AllowAnyOrigin()
    );

app.Run();
 public partial class Program { }