const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = parseInt(process.argv[2] || "8070");
const HOST = "0.0.0.0";
const DIR = __dirname;
const CERT_DIR = path.join(DIR, "certs");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

function handler(req, res) {
  let filePath = req.url.split("?")[0];
  if (filePath === "/") filePath = "/index.html";
  filePath = path.join(DIR, filePath);

  if (!filePath.startsWith(DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}

const certExists = fs.existsSync(path.join(CERT_DIR, "cert.pem")) && fs.existsSync(path.join(CERT_DIR, "key.pem"));

if (certExists) {
  const options = {
    cert: fs.readFileSync(path.join(CERT_DIR, "cert.pem")),
    key: fs.readFileSync(path.join(CERT_DIR, "key.pem")),
  };
  https.createServer(options, handler).listen(PORT, HOST, () => {
    console.log(`HTTPS server: https://${HOST}:${PORT}`);
    printIPs("https", PORT);
  });
} else {
  console.log("No certs found in ./certs/ — falling back to HTTP (PWA install won't work over LAN)");
  console.log("Run ./setup.sh to generate certs with mkcert\n");
  http.createServer(handler).listen(PORT, HOST, () => {
    console.log(`HTTP server: http://${HOST}:${PORT}`);
    printIPs("http", PORT);
  });
}

function printIPs(proto, port) {
  const { networkInterfaces } = require("os");
  const nets = networkInterfaces();
  console.log("\nAccess from other devices:");
  for (const iface of Object.values(nets)) {
    for (const net of iface) {
      if (net.family === "IPv4" && !net.internal) {
        console.log(`  ${proto}://${net.address}:${port}`);
      }
    }
  }
  console.log("");
}
