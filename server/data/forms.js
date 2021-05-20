// This files defines the forms available
// these are accessed by client at first loading

// Available fields (some of them are shared by many forms)
const NTahiti = {
  label: "Numéro Tahiti",
  type: "string",
  name: "NTahiti"
}

const email = {
  "label": "Adresse email",
  "type": "string",
  "name": "email"
}

const service = {
  "label" : "Impôt concerné",
  "type" : "select",
  "name" : "service",
  "options" : 
  [ 
    "Impôt sur les sociétés", 
    "Impôt foncier"
  ]
}

const text =  {
  "label": "Remarques",
  "type" : "text",
  "name" : "text"
}

const attachment = {
  label: "Votre déclaration",
  type : "attachment",
  name : "attachment"
}

// Define forms 
const forms =  [
  {
    id: "F1",
    title: "Justificatif DICP",
    fields: [NTahiti]
  },
  {
    id: "F2",
    title: "Contentieux",
    fields : [
      email,
      NTahiti,
      service,
      text]
  },
  {
    id: "F3",
    title: "Déclaration",
    fields : [
      email,
      NTahiti,
      service,
      attachment
    ]
  }
]

// The official list of forms, exposed to client
module.exports = forms;
  