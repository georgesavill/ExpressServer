const express = require("express");
const app = express();
const fs = require("fs");
const https = require("https");
const http = express.createServer();

app.get("/", (req, res) => res.send("<h1>GEORGE SAVILL!</h1>"));

https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/georgesavill.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/georgesavill.com/cert.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/live/georgesavill.com/chain.pem"),
}, app).listen(443,() => {
    console.log("Server listening on port 443");
});

http.get("*", (req, res) => res.redirect("https://" + req.headers.host + req.url));
http.listen(80);