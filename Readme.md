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

## API 

``GET /forms`` 

Pour recevoir les formulaires disponnibles.
Le résultat est :

```
[
  {
    id : "F1",
    title : "Justificatif DICP"  
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

```

``POST /sendform`` pour envoyer un formulaire au format json.

``GET /availableforms`` pour recevoir la liste des formulaires disponnibles.

## References 

* https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module-fr

* https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/


## Todo 

- split App.js into files per react component;
- implement submit form;
- implement email sending;
- implement form content check (email + numero Tahit);
- mode db to a json file;
