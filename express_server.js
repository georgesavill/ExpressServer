#!/usr/bin/env node /** express_server.js */
const express = require("express")
const app = express()
const http = require("http")
const path = require("path")

app.use(express.static(path.join("/www/")))

app.get("/", (req, res) => res.send(
    res.sendFile("/www/index.html")
));

http.createServer(app).listen(8081, () => {
    console.log("Redirect server listening on port 8081")
});