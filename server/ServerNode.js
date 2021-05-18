const fs = require('fs');
const http = require('http');
var bodyParser = require('body-parser')

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
            var data = fs.readFileSync('./server/data/forms.json', 'utf8');
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
      // use multipart/data to allow image upload in F3
      // https://stackoverflow.com/questions/32204995/parse-multipart-form-data-from-buffer-in-node-js
      
      // https://github.com/expressjs/body-parser

      console.log(req.body)
      // req.on('body', (form)=> {
        
      //   console.log("Data of the form:");
      //   console.log(form.toString());
      //           // Common Response on success
      // });
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
