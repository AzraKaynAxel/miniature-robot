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

## Services (Business Logic) 💼

**Répertoire:** `./services/`

Les services contiennent la logique métier et interagissent avec la base de données via les modèles. Ils sont appelés par les contrôleurs.

| Service | Fichier | Fonctions principales | Dépendances |
|---------|---------|----------------------|-------------|
| **AuthService** | `authService.js` | `registerUser()`, `loginUser()` | bcrypt, jsonwebtoken, User |
| **CoursesService** | `coursesService.js` | `fetchAll()`, `fetchById()`, `fetchByLevel()`, `createCourse()`, `updateCourse()`, `deleteCourse()` | Course |
| **CategoriesService** | `categoriesService.js` | `fetchAll()`, `fetchById()`, `create()` | Category, Course |

**Responsabilités principales:**
- **AuthService:** Enregistrement avec hachage bcrypt, connexion avec JWT (1h d'expiration)
- **CoursesService:** CRUD complet sur les cours, filtrage par niveau
- **CategoriesService:** Gestion des catégories avec inclusion des cours associés

## Contrôles, validations et gestion des erreurs 🧪

### Middleware 🔐

**Répertoire:** `./middleware/`

#### AuthMiddleware (`authMiddleware.js`)

Protège les routes nécessitant une authentification.

**Fonctionnement:**
- Récupère le token JWT du header `Authorization` (format: `Bearer <token>`)
- Vérifie l'authenticité du token avec `process.env.JWT_SECRET`
- Attache l'utilisateur décodé à `req.user`
- Codes HTTP:
  - `401` - Token manquant
  - `403` - Token invalide ou expiré

**Utilisation sur les routes:**
```javascript
router.post('/', authMiddleware, courseController.createCourse);
router.put('/:id', authMiddleware, courseController.updateCourse);
router.delete('/:id', authMiddleware, courseController.deleteCourse);
```

---

### Validators ✅

**Répertoire:** `./validators/`

Les validateurs utilisent la bibliothèque `express-validator` pour valider les données des requêtes.

#### AuthValidator (`authValidator.js`)

Valide les données d'inscription et connexion.

#### CourseValidator (`courseValidator.js`)

Valide les données de création/modification de cours.

#### CategoryValidator (`categoryValidator.js`)

Valide les données de création de catégorie.

| Validator | Fichier | Validations | Utilisé sur |
|-----------|---------|------------|-----------|
| **AuthValidator** | `authValidator.js` | `username` (min 3, unique), `email` (format valide), `password` (min 6) | Routes POST/PUT `/api/auth` |
| **CourseValidator** | `courseValidator.js` | `title` (min 3, sanitisé), `description` (min 10, anti-XSS), `duration` (≥1), `level` (ENUM), `price` (≥0), `instructor` (obligatoire), `categoryId` (existe) | Routes POST/PUT `/api/courses` |
| **CategoryValidator** | `categoryValidator.js` | `name` (min 3, unique, sanitisé), `description` (optionnel) | Routes POST/PUT `/api/categories` |
| **Validate Middleware** | `validate.js` | Vérifie tous les résultats de validation via `validationResult()` | Utilisé après tous les validators |


#### Validate Middleware (`validate.js`)

Middleware général qui vérifie les résultats de validation.

**Fonctionnement:**
- Récupère les erreurs de validation via `validationResult(req)`
- Retourne `400` avec le détail des erreurs si validation échouée
- Appelle `next()` si tous les critères sont respectés

**Flux de validation typique:**
```javascript
router.post('/', authMiddleware, courseBodyValidate, validate, courseController.createCourse);
```

---

### Contrôles dans les services

- **Authentification (authService):**
  - Vérification de l'existence de l'utilisateur avant enregistrement
  - Validation du mot de passe avec bcrypt
  - Génération de JWT avec expiration (1h)

- **Création/mise à jour:**
  - Vérification de l'unicité des noms/titres
  - Vérification de l'existence des ressources avant modification
  - Lancement d'erreurs explicites en cas de violation

- **Relations:**
  - Inclusion automatique des données associées (ex: cours pour une catégorie)

### Gestion des erreurs

- Les services lancent des `Error` avec messages explicites
- Les contrôleurs capturent ces erreurs et retournent les codes HTTP appropriés
- Les validateurs retournent les erreurs de validation au format express-validator
- Codes d'erreur principaux:
  - `400` - Validation échouée ou données invalides
  - `401` - Token manquant (authentification)
  - `403` - Token invalide ou expiré (autorisation)
  - `404` - Ressource non trouvée
  - `500` - Erreur serveur


## Base de données 🗄️

**Configuration:** `db/sequelize/database.js`

- **Système:** SQLite (stockage local en fichier `database.sqlite`).
- **Initialisation automatique** via `connectDB()` qui:
  - Établit la connexion à SQLite.
  - Synchronise les modèles avec le schéma (mode `alter` pour développement).
  - Affiche un message de confirmation en console.

## Seed (Données initiales) 🌱

**Fichier:** `seed/seed.js` - Initialise la BD avec 6 utilisateurs, 8 catégories et 20 cours. Utilise `force: true` pour recréer complètement les tables.

**Commande:** `npm run devSeed`

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
├── .env
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
├── services/
│   ├── authService.js
│   ├── coursesService.js
│   └── categoriesService.js
├── middleware/
│   └── authMiddleware.js
├── validators/
│   ├── authValidator.js
│   ├── categoryValidator.js
│   ├── courseValidator.js
│   └── validate.js
├── node_modules/
└── .git/
```

## Lancement de l'application 🚀

### 1️⃣ Installation des dépendances

```bash
npm install
```

### 2️⃣ Initialiser la base de données (seed)
```bash
npm run devSeed
```

### 3️⃣ Démarrer l'application

**Mode développement (avec nodemon):**
```bash
npm run dev
```

**Mode production:**
```bash
node app.js
```

### 📍 Endpoints disponibles

Une fois démarrée, l'application est accessible sur `http://localhost:3000`:
- `/api/auth` - Authentification (inscription, connexion)
- `/api/courses` - Gestion des cours (CRUD)
- `/api/categories` - Gestion des catégories

## Notes additionnelles 📌

- La base de données SQLite est créée automatiquement au premier lancement (`database.sqlite`)
- Les migrations et changements de schéma sont synchronisés via `Sequelize.sync({alter: true})`
- Utilisez des variables d'environnement (`.env`) pour les configurations sensibles en production