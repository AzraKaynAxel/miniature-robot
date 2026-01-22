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

**Répertoire:** `app.js`
 - **Base d'URL:**
   - `/api/auth`
   - `/api/courses`
   - `/api/categories`

**Répertoire:** `./controllers/`

#### AuthController (`authController.js`)

Gère l'authentification des utilisateurs.

- **Méthodes:**
  - `SingIn(req, res)` - Inscription utilisateur (crée un nouvel utilisateur)
  - `SingUp(req, res)` - Connexion utilisateur (génère un token JWT)

#### CourseController (`courseController.js`)

Gère toutes les opérations CRUD sur les cours.

- **Méthodes:**
  - `getAllCourses(req, res)` - Récupère tous les cours
  - `getCourseById(req, res)` - Récupère un cours par ID
  - `getCoursesByLevel(req, res)` - Filtre les cours par niveau (Beginner, Intermediate, Advanced)
  - `createCourse(req, res)` - Crée un nouveau cours
  - `updateCourse(req, res)` - Met à jour un cours existant
  - `deleteCourse(req, res)` - Supprime un cours

#### CategoryController (`categoryController.js`)

Gère les opérations sur les catégories.

- **Méthodes:**
  - `getAllCategories(req, res)` - Récupère toutes les catégories
  - `getCategoryById(req, res)` - Récupère une catégorie par ID
  - `createCategory(req, res)` - Crée une nouvelle catégorie

## Routes 🛣️

**Répertoire:** `./routes/`

Les routes sont organisées par domaine fonctionnel et font appel aux contrôleurs correspondants:

| Route | Fichier | Contrôleur | Description |
|-------|---------|-----------|-------------|
| `/api/auth` | `authRouter.js` | `authController.js` | Authentification (inscription, connexion) |
| `/api/courses` | `courseRouter.js` | `courseController.js` | Gestion des cours (CRUD complet) |
| `/api/categories` | `categoryRouter.js` | `categoryController.js` | Gestion des catégories (CRUD partiel) |

## Modèles (Models) 👤

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
├── routes/
│   ├── authRouter.js
│   ├── courseRouter.js
│   └── categoryRouter.js
├── controllers/
│   ├── authController.js
│   ├── courseController.js
│   └── categoryController.js
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

Une fois l'application démarrée, les endpoints sont accessibles sur `http://localhost:3000`:
- `/api/auth` pour l'authentification
- `/api/courses` pour les cours
- `/api/categories` pour les catégories

## Notes additionnelles 📌

- La base de données SQLite est créée automatiquement au premier lancement (`database.sqlite`).
- Les migrations ou les changements de schéma sont synchronisés via `Sequelize.sync({alter: true})`.
- Utilisez des variables d'environnement (`.env`)
Notes additionnelles 📌
- La base de données SQLite est créée automatiquement au premier lancement (database.sqlite).
- Les migrations ou les changements de schéma sont synchronisés via Sequelize.sync({alter: true}).
- Utilisez des variables d'environnement (.env) pour les configurations sensibles en production.