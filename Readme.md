# Challenge Fullstack - Formulaire de Contact

# Description du projet


## Client

L'application client est un projet créé avec [create-react-app](https://fr.reactjs.org/docs/create-a-new-react-app.html) :

### Installation

```
  cd client
  yarn
```

### Lancer le client

```
  cd client
  yarn start
```

Le client est alors accessible depuis ``http://127.0.0.1:3000``.

## Serveur

Pour lancer le serveur :

```
$ node server/ServerNode.js 
Server running at http://127.0.0.1:3001/
```

## Server API

### ``GET /forms`` 

Pour recevoir les formulaires disponnibles.
Exemple de résultat:

```
[
  {
    "id": "F1",
    "title": "Justificatif DICP",
    "fields": [
      {
        "label": "Numéro Tahiti",
        "type": "string"
      }
    ]
  }
]
```

### ``POST /sendform`` 

TODO
pour envoyer un formulaire au format json.

https://stackoverflow.com/questions/32204995/parse-multipart-form-data-from-buffer-in-node-js


### ``GET /availableforms`` 

TODO
pour recevoir la liste des formulaires disponnibles.

## References 

* https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module-fr

* https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/


## Todo 

- split App.js into files per react component;
- implement submit form;
- implement email sending;
- implement form content check (email + numero Tahit);
- mode db to a json file;
