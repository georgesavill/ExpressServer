#!/usr/bin/env node /** express_server.js */
const express = require("express");
const app = express();
const app_redirect = express();
const RateLimit = require("express-rate-limit");
const fs = require("fs");
const helmet = require("helmet");
const https = require("https");
const http = require("http");
const path = require("path");

const limiter = new RateLimit({windowMs: 10*60*1000,max:100,delayMs:0});

app.use(limiter);
app.use(helmet());

app.use(express.static(path.join(__dirname,"/../georgesavill.com/www/")));

app.get("/", (req, res) => res.send(
    res.sendFile(__dirname, "/index.html")
));
app_redirect.all("/*", (req, res) => res.redirect("https://" + req.headers.host + req.url));

https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/georgesavill.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/georgesavill.com/cert.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/live/georgesavill.com/chain.pem"),
}, app).listen(8443,() => {
    console.log("Server listening on port 443");
});

http.createServer(app_redirect).listen(8080, () => {
    console.log("Redirect server listening on port 80");
});
