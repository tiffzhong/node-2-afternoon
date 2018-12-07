module.exports = {
  create: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { name, description, price, image_url } = req.body;

    dbInstance
      .create_product([name, description, price, image_url])
      .then(() => res.sendStatus(200))
      .catch(error => {
        res.status(500).send({ errorMessage: "Something went wrong w CREATE" });
        console.log(error);
      });
  },

  getOne: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;
    dbInstance
      .read_product(params.id)
      .then(product => res.status(200).send(product))
      .catch(error => {
        res
          .status(500)
          .send({ errorMessage: "Something went wrong w READ PRODUCT" });
        console.log(error);
      });
  },

  getAll: (req, res, next) => {
    const dbInstance = req.app.get("db");
    dbInstance
      .read_products()
      .then(products => res.status(200).send(products))
      .catch(error => {
        res
          .status(500)
          .send({ errorMessage: "Something went wrong READ PRODUCTS" });
        console.log(error);
      });
  },

  update: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params, query } = req;

    dbInstance
      .update_product([params.id, query.desc])
      .then(() => res.sendStatus(200))
      .catch(error => {
        res.status(500).send({ errorMessage: "Something went wrong w UPDATE" });
        console.log(error);
      });
  },

  delete: (req, res, next) => {
    const dbInstance = req.app.get("db");
    const { params } = req;

    dbInstance
      .delete_product(params.id)
      .then(() => res.sendStatus(200))
      .catch(error => {
        res.status(500).send({ errorMessage: "Something went wrong w DELETE" });
        console.log(error);
      });
  }
};
