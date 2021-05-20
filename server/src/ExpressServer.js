
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// const bodyParser = require('body-parser');

const client_host = "http://127.0.0.1:3000"; 

// Database
const db = {};

var app = express();

/* Allow client-server to communicate */
app.use(cors());

/* form data */
app.use(express.urlencoded({
  extended: true
}))

const logReq = function (req) {
  console.log(` Recieved ${req.method} request`);
}


/** API */

/** Acces the list of available forms to render on client. */
app.get('/forms', function(req, res) {
  logReq(req);
  res.header("Content-Type", "application/json");
  // res.header("Access-Control-Allow-Origin", client_host);
  res.writeHead(200);
  if (!db.forms) {
    console.log("loading database");
    var data = fs.readFileSync(path.resolve(__dirname, '../data/forms.json'), 'utf8');
    db.forms = JSON.parse(data);
    console.log("loaded database");
  }
  res.end(JSON.stringify(db.forms));
})

/** Send a form which does not contain uploaded files. */
app.post('/sendform', upload.none(),function (req, res) {
  logReq(req);
  res.header("Content-Type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify(req.body));
})

app.post('/sendform_upload', upload.single('attachment'), function (req, res) {
  logReq(req);
  res.header("Content-Type", "application/json");
  res.writeHead(200);
  res.end(JSON.stringify({ body: req.body, file : req.file}));
});

// // Define Server requests
// const requestListener = function (req, res) {

//       res.setHeader("Content-Type", "text/plain");
//       res.writeHead(200);
//       res.end("Nous avons bien recu votre formulaire.");
//       break;
//     default:
//       res.writeHead(404);
//       res.end(JSON.stringify({error:"Resource not found"}));
//   }
// }

const hostname = '127.0.0.1';
const port = 3001;

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})