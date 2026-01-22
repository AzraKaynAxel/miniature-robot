const express = require('express');
const app = express();
const { connectDB } = require('./db/sequelize/database');

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

const PORT = 3000; // utilsser un .env sur la suite
app.listen(PORT, () => { console.log(`Server running on port ${PORT}, http://localhost${PORT}`)});