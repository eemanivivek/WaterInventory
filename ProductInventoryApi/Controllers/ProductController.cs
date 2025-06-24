using Microsoft.AspNetCore.Mvc;
using Oracle.ManagedDataAccess.Client;
using System.Data;

namespace ProductInventoryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ProductController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = new List<Product>();
            using (var con = new OracleConnection(_configuration.GetConnectionString("OracleDbConnection")))
            {
                con.Open();
                var cmd = new OracleCommand("SELECT * FROM PRODUCTS", con);
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    products.Add(new Product
                    {
                        Id = Convert.ToInt32(reader["ID"]),
                        Name = reader["NAME"].ToString(),
                        Quantity = Convert.ToInt32(reader["QUANTITY"]),
                        Capacity = Convert.ToInt32(reader["CAPACITY"]),
                        LastUpdated = reader["LASTUPDATED"].ToString()
                    });
                }
            }
            return Ok(products);
        }

        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
             Console.WriteLine($"[API] Received product: {System.Text.Json.JsonSerializer.Serialize(product)}");

            using (var con = new OracleConnection(_configuration.GetConnectionString("OracleDbConnection")))
            {
                con.Open();
                var cmd = new OracleCommand("INSERT INTO PRODUCTS (ID, NAME, QUANTITY, CAPACITY, LASTUPDATED) VALUES (PRODUCT_SEQ.NEXTVAL, :Name, :Quantity, :Capacity, :LastUpdated)", con);
                cmd.Parameters.Add("Name", product.Name);
                cmd.Parameters.Add("Quantity", product.Quantity);
                cmd.Parameters.Add("Capacity", product.Capacity);
                cmd.Parameters.Add("LastUpdated", product.LastUpdated);
                cmd.ExecuteNonQuery();
            }
            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(int id)
        {
            using (var con = new OracleConnection(_configuration.GetConnectionString("OracleDbConnection")))
            {
                con.Open();
                var cmd = new OracleCommand("DELETE FROM PRODUCTS WHERE ID = :Id", con);
                cmd.Parameters.Add("Id", id);
                cmd.ExecuteNonQuery();
            }
            return Ok();
        }
    }
}
