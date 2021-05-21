# Challenge Fullstack - Formulaire de Contact

## Todo 

- split App.js into files per react component;
- implement email sending;
- nettoyer les require inutiles;
- reference upload file together with the form;
- pb : auto fill en passant de f1 à f2 avec le champs NTahiti -> email ;


# Installation et lancement

Il faut lancer en parallèle un client et un serveur.

## Client

L'application client est un projet créé avec [create-react-app](https://fr.reactjs.org/docs/create-a-new-react-app.html).

Installer avec :

```sh
  cd client
  yarn
```

Puis lancer avec :

```sh
  cd client
  yarn start
```

Le client est alors accessible depuis ``http://127.0.0.1:3000``.

## Serveur

Installer avec :

```sh
cd server
npm install
```

Puis lancer avec :

```sh
cd server
npm run serve
Server running at http://127.0.0.1:3001/
```

# API disponnible

Le serveur est utilise ExpressJS pour le routage.
Les fonctions ouvertes sont les suivantes.

#### ``GET /forms`` 

Pour recevoir les formulaires disponnibles.

Les formulaires disponnibles sont stockés dans  ``server/data/forms.js``.
Chaque formulaire contient un titre et une liste de champs prédéfinis (certains champs sont communs entre plusieurs formulaires).

Exemple de formulaire disponnible:

```js
  {
    id: "F2",
    title: "Contentieux",
    fields : [
      email,
      NTahiti,
      service,
      text]
  }
```

Exemple de champs:
```js
{
  "label" : "Impôt concerné",
  "type" : "select",
  "name" : "service",
  "options" : 
  [ 
    "Impôt sur les sociétés", 
    "Impôt foncier"
  ]
}
```

### Envoi de formulaires

Chaque formulaire possède son API.

#### ``POST /sendform/F1`` 
#### ``POST /sendform/F2`` 
#### ``POST /sendform/F3`` 

### Validation des champs

Les champs sont validés en utilisant le module [express-validator](https://express-validator.github.io/docs/).
La validation est faite côté serveur.
Les règles de validations sont définies par champ (et pas par formulaire) dans le fichier ``server/data/validators.js``.

Exemple de validateur:

```js
const NTahitiRegex = /^[T][a-zA-Z0-9][0-9][0-9][0-9][0-9]$/g;
const validators = {
  NTahiti : [
    // check('NTahiti').isLength({min : 6 , max :  6}),
    check('NTahiti').custom((value, { req }) => {
      if (value.match(NTahitiRegex)) 
        return true;
      else {
        throw new Error('Rejected NTahiti format');
      }
    }) 
  ]
}
```

### Stockage en base de donnée

Chaque formulaire valide est stocké qu format ``json`` dans ``serer/data/recieved/$fid`` où  ``$fid`` est l'identifiant du formulaire dans ``server/data/forms``.

### Ajout d'un formulaire

Pour ajouter un nouveau formulaire il faut l'ajouter dans ``server/data/forms`` (avec eventuellement les nouveaux champs, et le cas échéant les checks correspondant dans ``/server/data/validators``. Si le formulaire contient un nouveau champ il faut définir le rendu côté client de ce type de champs (ex. radio bouton).

### Email de notification
* https://nodemailer.com/about/

TODO
 - send fake email to service;
 - display server response to post in client (e.g. invalid forms etc.)
 
## References 

* https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module-fr

* https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/
