//Environment Setup
require("express-async-errors");
require("dotenv").config();

//App Cores
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

//Extra Security
const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

//Routes
const authRouter = require("./routes/auth");
const compRouter = require("./routes/comps");

//Middleware
const auth = require("./middleware/auth");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//SwaggerUI
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

//Variable Declarations
const port = process.env.PORT || 3000;
const minutes = 1000 * 60;

app

  .set("trust proxy", 1)
  .use(
  rateLimiter({
    windowsMs: 15 * minutes,
    max: 100,
  })
)
  .use([express.urlencoded({ extended: false }), express.json()])
  .use(helmet())
  .use(cors())
  .use(xss())

  .get("/", (req, res) => {
    res.send('<h1 style="text-align: center">Computers API</h1>');
  })

  // .use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

  .use("/api/v1/auth", authRouter)
  .use("/api/v1/comps", auth, compRouter)

  .use(notFoundMiddleware)
  .use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server listening @ ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
