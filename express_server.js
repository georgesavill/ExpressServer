const express = require("express");
const app = express();
const app_redirect = express();
const fs = require("fs");
const https = require("https");
const http = require("http");

app.get("/", (req, res) => res.send("<h1>GEORGE SAVILL!</h1>"));
app_redirect.all("/*", (req, res) => res.redirect("https://" + req.headers.host + req.url));

https.createServer({
    key: fs.readFileSync("/etc/letsencrypt/live/georgesavill.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/georgesavill.com/cert.pem"),
    ca: fs.readFileSync("/etc/letsencrypt/live/georgesavill.com/chain.pem"),
}, app).listen(443,() => {
    console.log("Server listening on port 443");
});

http.createServer(app_redirect).listen(80, () => {
    console.log("Redirect server listening on port 80");
});
