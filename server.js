const express = require('express');
const app = express();
const db = require('./models');
const dbConfig = require('./config/db.config');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/eleve.route')(app);
require('./routes/bulletin.route')(app);
require('./routes/model.route')(app)

db.mongoose
  .connect(dbConfig.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

app.get("/", (req, res) => {
  res.json({ message: "bienvenue sur le serveur" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Le serveur tourne sur le port ${PORT}.`);
});