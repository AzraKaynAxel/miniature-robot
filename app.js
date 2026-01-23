const express = require('express');
const app = express();

const { connectDB } = require('./db/sequelize/database');

// config pour dotenv
require('dotenv').config();

app.use(express.json());

// Import Routes
const authRouter = require('./routes/authRouter');
const courseRouter = require('./routes/courseRouter');
const categoryRouter = require('./routes/categoryRouter');

// Intilize DataBase
connectDB();

// Use Routes
app.use('/api/auth', authRouter);
app.use('/api/courses', courseRouter);
app.use('/api/categories', categoryRouter);

const PORT = process.env.PORT || 3000; // utilsser un .env sur la suite
app.listen(PORT, () => { console.log(`Server running on port ${PORT}, http://localhost${PORT}`)});

/*
// Seed Database
const seedDatabase = require('./db/seed');
// Seed Database (optionnel - commentez si vous ne voulez pas re-seed à chaque démarrage)
if (process.env.SEED_DB === 'true') {
    seedDatabase();
}*/


// Script pour tester
/*if (process.env.NODE_ENV === 'development') {
    seedDatabase();
}*/