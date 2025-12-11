const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Session config
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
app.use("/auth", authRoutes);

// Default route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));