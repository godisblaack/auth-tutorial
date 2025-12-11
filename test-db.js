const db = require("./db");

db.query("SELECT 1", (err, result) => {
  if (err) console.log(err);
  else console.log("Database working:", result);
});