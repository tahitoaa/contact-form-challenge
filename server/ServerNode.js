const http = require('http');
/* inspired from : 
    - https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module-fr
    - https://www.pabbly.com/tutorials/node-js-http-server-handling-get-and-post-request/
*/

// Database
const db = {
  forms : [
    {
      id : "F1",
      title : "Justificatif DICP",
      fields : [
        {
          label : "Numéro Tahiti",
          type : "string",
        }
      ]
    },
    {
      id : "F2",
      title : "Contentieux"
    },
    {
      id : "F3",
      title : "Déclaration"
    }
  ]
}


const client_host = "http://127.0.0.1:3000"; 

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
      req.on('data', (form)=> {
        console.log("Data of the form:");
        console.log(`${form}`);
      });
      switch (req.url){
        case "form1" :
          break;
        case "form2" :
          break;
        case "form3" :
          break;
        default : 
          break;
      }

      // Common Response on success
      res.setHeader("Content-Type", "text/plain");
      res.writeHead(200);
      res.end(`Recieve POST`);
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({error:"Resource not found"}));
  }
}

// Launch the server
const server = http.createServer(requestListener); 
const hostname = '127.0.0.1';
const port = 3001;
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});