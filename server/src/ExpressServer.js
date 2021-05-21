
const express = require('express');
const cors = require('cors');
const multer = require('multer');
fs = require('fs');                     // To write recieved forms into server
const upload = multer({ dest: 'uploads/' });
// https://express-validator.github.io/docs/check-api.html
const { check, oneOf, validationResult } = require('express-validator');
const forms = require('../data/forms');
const services = require('../data/services');
const {validators, NTahitiRegex} = require('../data/validators');

const client_host = "http://127.0.0.1:3000";

// Database defining the form fields and validators
const db = {
  forms : forms,
  validators : validators,
};

var app = express();

/* Allow client-server to communicate */
app.use(cors());

/* Allow express to parse the post data */
app.use(express.urlencoded({
  extended: true
}))

/* Utility to monitor the server */
const logReq = function (req) {
  console.log(` Recieved ${req.method} request`);
}

/** API Routing*/

/** Acces the list of available forms to render on client. */
app.get('/forms', function(req, res) {
  logReq(req);
  res.header("Content-Type", "application/json");
  // res.header("Access-Control-Allow-Origin", client_host);
  if (db.forms)
  {
    res.writeHead(200);
    res.end(JSON.stringify(db.forms));
  }
  else {
    res.writeHead(400);
    res.end("could not locate the forms. ");
  }
})

/** Apply the chekcers (express-validator) using validators.js */
const checkers =  (fid) => {
  var checks = [];
  const form = forms.find(f => {return f.id == fid;});
  if (form){
    checks = form.fields.map(
      field => {
        return db.validators[field.name] ? db.validators[field.name] : check('email').exists();
      })
      .flat();
  }
  return checks;
}

/** The main Routing */
const routing = (req, res, next) => {
  logReq(req);
  try {
    /* Validate the request body, i.e. the fields */
    validationResult(req).throw();
    console.log(req.file.filename);

    const formid = req.path.replace('/sendform/','');

    /** Save the body into the database. */
    // WARNING using date is not safe to index forms (possible collisions)
    // TODO use hashing of the body instead
    const filename = `./data/recieved/${formid}/Formulaire-${new Date().getTime()}.json`;
    console.log(filename);
    fs.closeSync(fs.openSync(filename, 'w'));
    fs.writeFile(filename, 
      JSON.stringify({
        formulaire : req.body,
        attachments : req.file ? req.file.filename : null
      }), 
      function (err) {
        /* If the form is not saved into the database,
        we consider the request has failed and response 400
        to the POST
        */
        if (err)
          err.throw();

        /* Code from https://nodemailer.com/about/ */
        /* Send an email notification to the corresponding service */
        const form = forms.find(f => {return f.id == formid});
        console.log(form);
        const reciever = services[form.service];
        console.log(` TODO Send email notification to ${reciever}.`)
        // var transport = nodemailer.createTransport({
        //   host: "smtp.mailtrap.io",
        //   port: 2525,
        //   auth: {
        //     user: "",
        //     pass: ""
        //   }
        // });
              
        // // send mail with defined transport object
        // let info = await transporter.sendMail({
        //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
        //   to: "bar@example.com, baz@example.com", // list of receivers
        //   subject: "Hello ✔", // Subject line
        //   text: "Hello world?", // plain text body
        //   html: "<b>Hello world?</b>", // html body
        // });

        // console.log("Message sent: %s", info.messageId);
        // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...


        /* If we reach this code, the POST was succesfull */
        res.header("Content-Type", "application/json");
        res.writeHead(200);
        res.end("Formulaire valide. ");
      });
  } catch (err) {
    console.log("Rejected POST" + err.message);
    res.header("Content-Type", "text/plain");
    res.writeHead(400);
    res.end("Formulaire invalide.");
  }

}

/**
 * Decide to use multipart/form-data content type only for forms
    containing one attachment.
    The attachments are stored in /uploads
 * @param {string} fid
 * @returns the upload mode accordingly
 */
const manageUpload = (fid) => {
  const form = forms.find(f => {return f.id == fid;});
  const contains_upload = 
  form && 
  form.fields &&
  form.fields.find(
  field => {
    return field.type == "attachment"
  });
  return contains_upload ? upload.single('attachment') : upload.none();
}

/** There is one routing per forms. */
db.forms.map(form => {return form.id})
        .forEach(
          fid => {
            const route = '/sendform/' + fid;
            console.log("Routing to " + route);
            app.post(route,
              manageUpload(fid),
              oneOf([checkers(fid)]),
              routing  
            );
          });

// app.post('/sendform_upload', upload.single('attachment'), function (req, res) {
//   logReq(req);
//   res.header("Content-Type", "application/json");
//   res.writeHead(200);
//   res.end(JSON.stringify({ body: req.body, file : req.file}));
// });

const hostname = '127.0.0.1';
const port = 3001;

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})