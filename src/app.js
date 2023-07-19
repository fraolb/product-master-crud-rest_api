//Import the necessary dependencies
const http = require("http");
// Define a prot at which the server will run
const PORT = 5000;

const productsService = require("./productsService");
const getRequestData = require("./utils");

const server = http.createServer(async (req, res) => {
  // Get all products
  if (req.url == "/api/v1/products" && req.method === "GET") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(productsService.getProducts());
  }

  // Get a product with specified id
  else if (
    req.url.match(/\/api\/v1\/products\/([0-9])/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[4];

    // console.log("the id is ", id)
    // console.log("type of id is  ", typeof(id))
    productsService.getProductsById(parseInt(id), (err, result) => {
      // console.log(" the error is ", err, " and the result is ",result)
      if (err !== null) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.end("Requested product doesn't exist..!");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(result);
      }
    });
  }

  // Create a new product
  else if (req.url == "/api/v1/products" && req.method == "POST") {
    // console.log("it hit the api")
    let req_body = await getRequestData(req);
    // console.log("the body is ", req_body)
    productsService.saveProduct(req_body, (err, result) => {
      // console.log(" the error is ", err, " and the result is ",result)
      if (err !== null) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.end("Product already exists..!");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(result);
      }
    });
  }

  // Update a specific product
  else if (req.url == "/api/v1/products" && req.method == "PUT") {
    let req_body = await getRequestData(req);
    console.log("the body is ", req_body);
    id = req_body.id;
    console.log("the id is ", id);
    productsService.updateProduct(parseInt(id), req_body, (err, result) => {
      if (err !== null) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.end("Requested product doesn't exist..!");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(result);
      }
    });
  }

  // Delete a specific Product
  else if (
    req.url.match(/\/api\/v1\/products\/([0-9])/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[4];
    productsService.deleteProduct(parseInt(id), (err, result) => {
      // console.log(" the error is ", err, " and the result is ",result)
      if (err !== null) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.end("Requested product doesn't exist..!");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(result);
      }
    });
  }
});

// listen for client requests
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
