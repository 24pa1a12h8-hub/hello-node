const http = require("http");
const fs = require("fs");

const args = process.argv.slice(2);

let port = 3000;

args.forEach((arg) => {
  if (arg.startsWith("--port=")) {
    port = Number(arg.split("=")[1]);
  }
});

const server = http.createServer((req, res) => {
  let filename;

  if (req.url === "/") {
    filename = "home.html";
  } else if (req.url === "/home") {
    filename = "home.html";
  } else if (req.url === "/project") {
    filename = "project.html";
  } else if (req.url === "/registration") {
    filename = "registration.html";
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
    return;
  }

  fs.readFile(filename, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error loading page");
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
