const express = require("express");
const app = express();
const cors = require("cors");
const { ZodError } = require("zod");

app.use(cors());

app.use(express.json());
app.use(express.static("public"));
require("./mongodb.config");

const routes = require("../routes");
const { TokenExpiredError } = require("jsonwebtoken");
app.use("/api/v1", routes);

app.use((req, res, next) => {
  next({ code: 404, message: "Not found" });
});

app.use((error, req, res, next) => {
  let data = {};
  let errBag;
  let code;

  if (error instanceof ZodError) {
    error.code = 403;
    errBag = error.errors.map((error) => {
      return { ...data, [error["path"][0]]: error.message };
    });
  }else if(error instanceof TokenExpiredError){
    error.code = 401;
    console.log("error here", error.code);
  
  }else{
    errBag=error;
  }

  code = error.code ?? 500;
  let msg = errBag ?? "external server error";

  res.status(code).json({
    result: null,
    msg: msg,
    meta: null,
  });
});
module.exports = app;
