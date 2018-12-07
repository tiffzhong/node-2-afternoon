const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const dotenv = require("dotenv");
dotenv.config();
const products_controller = require("./controller/products_controller");

const app = express();
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(error => {
    console.log("Error w query", error);
  });

app.post("/api/products", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/products/:id", products_controller.getOne);
app.put("/api/products/:id", products_controller.update);
app.delete("/api/products/:id", products_controller.delete);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
