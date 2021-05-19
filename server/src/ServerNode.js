const fs = require('fs');
const http = require('http');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

/* inspired from : 
    - https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module-fr
    - https://www.pabbly.com/tutorials/node-js-http-server-handling-get-and-post-request/
*/

/* */
const hostname = '127.0.0.1';
const port = 3001;
const client_host = "http://127.0.0.1:3000"; 

// Database

const db = {};

// Define Server requests
const requestListener = function (req, res) {
  console.log(` Recieving ${req.method} ${req.url} `);
  switch (req.method) {
    case "GET":
      switch (req.url) {
        case "/forms":
          res.setHeader("Content-Type", "application/json");
          res.setHeader("Access-Control-Allow-Origin", client_host);
          res.writeHead(200);
          if (!db.forms) {
            console.log("loading database");
            var data = fs.readFileSync(path.resolve(__dirname, '../data/forms.json'), 'utf8');
            db.forms = JSON.parse(data);
            console.log("loaded database");
          }
          res.end(JSON.stringify(db.forms));
          break;
        default:
          res.setHeader("Content-Type", "text/plain");
          res.writeHead(200);
          res.end(`This is the server, use post method to send a form.`);
          break;
      }
      break;
    case "POST":
    

      res.setHeader("Content-Type", "text/plain");
      res.writeHead(200);
      res.end("Nous avons bien recu votre formulaire.");
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({error:"Resource not found"}));
  }
}

// Launch the server
const server = http.createServer(requestListener); 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
