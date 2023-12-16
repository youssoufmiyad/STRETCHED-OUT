// import des variables d'environnement (le lien de la db par exemple)
require('dotenv').config()
const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")

const app = express()

// connection database
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("connected to database"))

// authorisation d'utilisation de l'API
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// setup routes
const router = require("./routes/index")
app.use("/STRETCHED-OUT",router)

app.listen(process.env.PORT, () => console.log("server started, hosted at http://localhost:"+process.env.PORT))