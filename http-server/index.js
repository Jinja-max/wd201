/* ---this is inital written program 


const http = require("http");
const fs = require("fs");

fs.readFile("home.html", (err, home) => {
  if (err) throw err;
  // console.log(home.toString());
  http
    .createServer((request, response) => {
      response.writeHeader(200, { "Content-type": "text/html" });
      response.write(home);
      response.end();
    })
    .listen(3000);
});

*/

const http = require("http");
const fs = require("fs");
const minimist = require("minimist");

let args = minimist(process.argv.slice(2), {
  default: {
    port: 3000,
  },
});

let homecontent = "";
let projectcontent = "";
let registartioncontent = "";

fs.readFile("home.html", (err, data) => {
  if (err) throw err;
  homecontent = data;
});
fs.readFile("project.html", (err, data) => {
  if (err) throw err;
  projectcontent = data;
});
fs.readFile("registration.html", (err, data) => {
  if (err) throw err;
  registartioncontent = data;
});

http
  .createServer((request, response) => {
    const url = request.url;
    response.writeHeader(200, { "Content-type": "text/html" });
    switch (url) {
      case "/project":
        response.write(projectcontent);
        response.end();
        break;

      case "/registration":
        response.write(registartioncontent);
        response.end();
        break;

      default:
        response.write(homecontent);
        response.end();
        break;
    }
  })
  .listen(args["port"]);
console.log("server listening at port " + args["port"]);
