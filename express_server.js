const express = require("express");
const app = express();
const port = 80;

app.get("/", (req, res) => res.send("<h1>GEORGE SAVILL!</h1>"));

app.listen(port, () => console.log(`Server listening on port ${port}`));
