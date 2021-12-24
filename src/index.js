const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const { cleanEnv, str, url, port } = require("envalid");
const mongoose = require("mongoose");
const DefaultRole = require("./utils/defaults");

dotenv.config();

const env = cleanEnv(process.env, {
  DATABASE: url(),
  NODE_ENV: str({ choices: ["development", "production", "staging"] }),
  PORT: port(),
});

mongoose
  .connect(env.DATABASE)
  .then(() => {
    DefaultRole.createDefaultSuperAdminRole();
    DefaultRole.createDefaultMohRole();
    DefaultRole.createDefaultMedicalCenterRole();
    DefaultRole.createDefaultUniversityEmployeeRole();
    DefaultRole.createDefalutHealthProfessionalRole();
    DefaultRole.createDefalutVerifiedHealthProfessionalRole();

    console.log("Connected to database");
  })
  .catch((e) => {
    console.log(e);
  });

const app = express();

if (env.isDev) {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.listen(env.PORT, () => {
  console.log(`Running on port in ${env.PORT}`);
});
