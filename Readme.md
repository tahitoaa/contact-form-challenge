# Challenge Fullstack - Formulaire de Contact

# Description du projet

## Client

L'application client est un projet créé avec [create-react-app](https://fr.reactjs.org/docs/create-a-new-react-app.html).

Installer avec :

```
  cd client
  yarn
```

Puis lancer avec :

```
  cd client
  yarn start
```

Le client est alors accessible depuis ``http://127.0.0.1:3000``.

## Serveur

Installer avec :

```
cd server
npm install
```

Puis lancer avec :

```
cd server
npm run serve
Server running at http://127.0.0.1:3001/
```

## Server API

Le serveur est utilise ExpressJS pour le routage.
Les fonctions ouvertes sont les suivantes.

### ``GET /forms`` 

Pour recevoir les formulaires disponnibles.
Exemple de formulaire disponnible:

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

Les formulaires disponnibles sont stockés dans  ``server/data/forms.js``.
Chaque formulaire contient un titre et une liste de champs prédéfinis (certains champs sont communs entre plusieurs formulaires).

### Envoi de formulaires

Chaque formulaire possède son API.

#### ``POST /sendform/F1`` 
#### ``POST /sendform/F2`` 
#### ``POST /sendform/F3`` 

#### Validation des champs

Les champs sont validés en utilisant le module [express-validator](https://express-validator.github.io/docs/).
La validation est faite côté serveur.
Les règles de validations sont définies par champ (et pas par formulaire) dans le fichier ``server/data/validators.js``.

#### Stockage en base de donnée

Chaque formulaire valide est stocké qu format ``json`` dans ``serer/data/recieved/$fid`` où  ``$fid`` est l'identifiant du formulaire dans ``server/data/forms``.

#### Ajout d'un formulaire

Pour ajouter un nouveau formulaire il faut l'ajouter dans ``server/data/forms`` (avec eventuellement les nouveaux champs, et le cas échéant les checks correspondant dans ``/server/data/validators``.

TODO
 - send fake email to service;
 - display server response to post in client (e.g. invalid forms etc.)
 
## References 

* https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module-fr

* https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/


## Todo 

- split App.js into files per react component;
- implement email sending;
- nettoyer les require inutiles;
- pb : auto fill en passant de f1 à f2 avec le champs NTahiti -> email ;
