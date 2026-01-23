// Exo SQlite
const { Sequelize } = require('sequelize');

const myDB = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

const connectDB = async () => {
    try {
        await myDB.authenticate();
        console.log('Connection to SQLite has been established successfuly.');
        
        // Viens vérifier les models existant et les mets à jour
        await myDB.sync();

        console.log('All models were synchronized succesfully');
    } catch (error) {
        console.error(('Unable to connect to databse: ' + error));             
    }
};

module.exports = {myDB, connectDB};