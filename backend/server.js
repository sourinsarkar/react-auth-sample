const express = require("express");
const db = require("./src/db");
const { routes } = require("./src/routes/index");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

db.connect().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log("server is up!");
  });
});
