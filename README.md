# Node_Express_Finale 🚀

## Description 📋

**Résumé 📝:** Ce dépôt contient un projet Node.js basé sur Express pour exposer une API REST permettant de gérer des utilisateurs, des catégories et des cours avec une base de données SQLite via Sequelize (création, lecture, modification, suppression).

## Prérequis ✅

- **Environnement:** Node.js avec npm prêt à l'emploi.
- **Version Node:** Node.js 18+ (recommandé).
- **Dépendances principales ⚙️:**
  - `express` pour exposer l'API REST.
  - `sequelize` pour l'ORM et la gestion de la base de données.
  - `sqlite3` pour la base de données SQLite.
  - `nodemon` pour le développement en mode watch.
## Détails des fonctionnalités implémentées 🚧

### Contrôleurs REST 🧭

**Répertoire:** `./controllers/`

#### UserController

- **Base d'URL:** 
- **Endpoints clés:**

## Modèles (Models) 👤

**Répertoire:** `./models/`

| Modèle | Champs principaux | Relations | Fichier |
|--------|------------------|-----------|---------|
| **User** | `username` (unique), `email` (unique), `password` | - | `userModel.js` |
| **Category** | `name` (unique), `description` | hasMany Course | `categoryModel.js` |
| **Course** | `title`, `description`, `duration`, `level`, `price`, `instructor`, `categoryId` | belongsTo Category | `courseModel.js` |

**Associations** (`association.js`):
- Category **hasMany** Course (1:N)
- Course **belongsTo** Category (N:1)

## Contrôles, validations et gestion des erreurs 🧪

### Contrôles dans les contrôleurs/services

- **Création/mise à jour:**

- **Règles métier supplémentaires:** 

### Gestion globale des erreurs


## Base de données 🗄️

**Configuration:** `db/sequelize/database.js`

- **Système:** SQLite (stockage local en fichier `database.sqlite`).
- **Initialisation automatique** via `connectDB()` qui:
  - Établit la connexion à SQLite.
  - Synchronise les modèles avec le schéma (mode `alter` pour développement).
  - Affiche un message de confirmation en console.

## Configuration ⚙️

### Application principale

- **Fichier:** `app.js`
- **Port:** `3000` (configurable).
- **Démarrage:**
## Technologies utilisées 🛠️

- **Node.js:** 18+
- **Framework:** Express.js
- **ORM:** Sequelize
- **Base de données:** SQLite3
- **Dépendances principales:**
  - `express`
  - `sequelize`
  - `sqlite3`
  - `nodemon`nces principales:
express


## Structure du projet 📁

```
Node_Express_Finale/
├── app.js
├── package.json
├── package-lock.json
├── README.md
├── .gitignore
├── db/
│   └── sequelize/
│       └── database.js
├── models/
│   ├── userModel.js
│   ├── categoryModel.js
│   ├── courseModel.js
│   └── association.js
├── node_modules/
└── .git/
```

## Lancement de l'application 🚀

### Installation des dépendances:

```bash
npm install
```

### Mode développement (avec nodemon):

```bash
npm run dev
```

### Mode production:

```bash
node app.js
```

Une fois l'application démarrée, les endpoints `/users` sont accessibles sur `http://localhost:3000`.

## Notes additionnelles 📌

- La base de données SQLite est créée automatiquement au premier lancement (`database.sqlite`).
- Les migrations ou les changements de schéma sont synchronisés via `Sequelize.sync({alter: true})`.
- Utilisez des variables d'environnement (`.env`)
Notes additionnelles 📌
- La base de données SQLite est créée automatiquement au premier lancement (database.sqlite).
- Les migrations ou les changements de schéma sont synchronisés via Sequelize.sync({alter: true}).
- Utilisez des variables d'environnement (.env) pour les configurations sensibles en production.



