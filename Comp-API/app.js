//Environment Setup
require("express-async-errors");
require("dotenv").config();

//App Cores
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

//Extra Security
//TODO: const rateLimiter = requuire("express-rate-limit");
//TODO: const helmet = require("helmet");
//TODO: const cors = require("cors");
//TODO: const xss = require("xss-clean");

//Routes
//TODO: const authRouter = require("./routes/auth");
const compRouter = require("./routes/comps");

//Middleware
//TODO: const auth = require("./middleware/auth");
//TODO: const notFoundMiddleware = require("./middleware/not-found");
//TODO: const errorHandlerMiddleware = require("./middleware/error-handler");

//SwaggerUI
//TODO: const swaggerUI = require("swagger-ui-express");
//TODO: const YAML = require("yamljs");

//Variable Declarations
const port = process.env.PORT || 3000;
// const minutes = 1000 * 60;

app

  // .set("trust proxy", 1)
  /*.use(
  rareLimiter({
    windowsMs: 15 * minutes,
    max: 100,
  })
)*/
  .use([express.urlencoded({ extended: false }), express.json()])
// .use(helmet())
// .use(cors())
// .use(xss())

.get("/", (req, res) => {
  res.send('<h1 style="text-align: center">Computers API</h1>')
})

// .use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs))

//TODO: .use("/api/v1/auth", authRouter)
.use("/api/v1/comps", compRouter)

//TODO: .use(errorHandlerMiddleware)
//TODO: .use(notFoundMiddleware)

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
