const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

// ----------------------------
// SIGNUP ROUTE
// ----------------------------
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into DB
  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, hashedPassword],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Signup failed: Email may already exist.");
      }
      res.redirect("/login.html");
    }
  );
});

// ----------------------------
// LOGIN ROUTE
// ----------------------------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) {
      console.log(err);
      return res.send("Database error");
    }

    if (results.length === 0) {
      return res.send("User not found");
    }

    const user = results[0];

    // Compare password
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.send("Incorrect password");
    }

    // Save session
    req.session.user = {
      id: user.id,
      email: user.email
    };

    res.redirect("/dashboard.html");
  });
});

// ----------------------------
// LOGOUT ROUTE
// ----------------------------
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login.html");
});

module.exports = router;