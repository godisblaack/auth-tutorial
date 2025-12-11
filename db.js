// db.js
const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
    host: "127.0.0.1",     // IMPORTANT for Docker in Codespaces
    user: "root",
    password: "root",
    database: "auth_demo"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
    } else {
        console.log("MySQL Connected successfully!");
    }
});

module.exports = db;