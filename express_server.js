#!/usr/bin/env node /** express_server.js */
const express = require("express")
const app = express()
const RateLimit = require("express-rate-limit")
const helmet = require("helmet")
const http = require("http")
const path = require("path")

const limiter = new RateLimit({windowMs: 10*60*1000,max:100,delayMs:0})

app.use(limiter);
app.use(helmet());

app.use(express.static(path.join("/www/")))

app.get("/", (req, res) => res.send(
    res.sendFile("/www/index.html")
));

http.createServer(app).listen(8081, () => {
    console.log("Redirect server listening on port 8081")
});