const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get("", (_, res) => {
  res.redirect("/test");
});

app.get("/test", (_, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Server start on http://localhost:${PORT}`);
});
