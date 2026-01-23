const { myDB } = require('../db/sequelize/database');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const Course = require('../models/courseModel');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Sync database
        await myDB.sync({ force: true });
        console.log('✅ Database synchronized');

        // Seed Users (6 utilisateurs)
        const usersData = [
            {
                username: 'john_doe',
                email: 'john@example.com',
                password: await bcrypt.hash('password123', 10)
            },
            {
                username: 'jane_smith',
                email: 'jane@example.com',
                password: await bcrypt.hash('password123', 10)
            },
            {
                username: 'alex_johnson',
                email: 'alex@example.com',
                password: await bcrypt.hash('password123', 10)
            },
            {
                username: 'maria_garcia',
                email: 'maria@example.com',
                password: await bcrypt.hash('password123', 10)
            },
            {
                username: 'david_wilson',
                email: 'david@example.com',
                password: await bcrypt.hash('password123', 10)
            },
            {
                username: 'sophia_davis',
                email: 'sophia@example.com',
                password: await bcrypt.hash('password123', 10)
            }
        ];

        const users = await User.bulkCreate(usersData);
        console.log(`✅ ${users.length} utilisateurs créés`);

        // Seed Categories (8 catégories)
        const categoriesData = [
            {
                name: 'Web Development',
                description: 'Apprenez à développer des sites web modernes avec HTML, CSS, JavaScript et frameworks populaires'
            },
            {
                name: 'Mobile Development',
                description: 'Développez des applications mobiles pour iOS et Android'
            },
            {
                name: 'Backend Development',
                description: 'Maîtrisez les technologies backend comme Node.js, Python, Java'
            },
            {
                name: 'Data Science',
                description: 'Explorez l\'analyse de données, machine learning et IA'
            },
            {
                name: 'Cloud & DevOps',
                description: 'Déployez et gérez vos applications sur le cloud avec AWS, Azure, GCP'
            },
            {
                name: 'Database Design',
                description: 'Concevez et optimisez des bases de données relationnelles et NoSQL'
            },
            {
                name: 'UI/UX Design',
                description: 'Créez des interfaces utilisateur magnifiques et intuitives'
            },
            {
                name: 'Cybersecurity',
                description: 'Protégez vos applications et données contre les menaces'
            }
        ];

        const categories = await Category.bulkCreate(categoriesData);
        console.log(`✅ ${categories.length} catégories créées`);

        // Seed Courses (20 cours)
        const coursesData = [
            // Web Development (3 courses)
            {
                title: 'React.js Masterclass',
                description: 'Apprenez React de zéro à avancé avec des projets réels',
                duration: 40,
                level: 'Intermediate',
                price: 49.99,
                instructor: 'john_doe',
                published: true,
                categoryId: categories[0].id
            },
            {
                title: 'Vue.js Complet',
                description: 'Maîtrisez Vue.js 3 et construisez des applications SPA',
                duration: 35,
                level: 'Beginner',
                price: 39.99,
                instructor: 'jane_smith',
                published: true,
                categoryId: categories[0].id
            },
            {
                title: 'Angular Avancé',
                description: 'Devenez expert en Angular avec des patterns de production',
                duration: 50,
                level: 'Advanced',
                price: 59.99,
                instructor: 'alex_johnson',
                published: true,
                categoryId: categories[0].id
            },
            // Mobile Development (3 courses)
            {
                title: 'React Native pour iOS & Android',
                description: 'Créez des apps mobiles natives avec React Native',
                duration: 45,
                level: 'Intermediate',
                price: 54.99,
                instructor: 'maria_garcia',
                published: true,
                categoryId: categories[1].id
            },
            {
                title: 'Flutter Bootcamp',
                description: 'Développez des applications Flutter magnifiques et performantes',
                duration: 42,
                level: 'Beginner',
                price: 44.99,
                instructor: 'david_wilson',
                published: true,
                categoryId: categories[1].id
            },
            {
                title: 'iOS Development avec Swift',
                description: 'Maîtrisez Swift et créez des apps iOS professionnelles',
                duration: 48,
                level: 'Intermediate',
                price: 59.99,
                instructor: 'sophia_davis',
                published: true,
                categoryId: categories[1].id
            },
            // Backend Development (3 courses)
            {
                title: 'Node.js & Express.js',
                description: 'Construisez des APIs REST robustes avec Node.js et Express',
                duration: 38,
                level: 'Beginner',
                price: 39.99,
                instructor: 'john_doe',
                published: true,
                categoryId: categories[2].id
            },
            {
                title: 'Python Django Avancé',
                description: 'Créez des applications web complètes avec Django',
                duration: 45,
                level: 'Intermediate',
                price: 49.99,
                instructor: 'jane_smith',
                published: true,
                categoryId: categories[2].id
            },
            {
                title: 'Java Spring Boot Masterclass',
                description: 'Maîtrisez Spring Boot et construisez des microservices',
                duration: 55,
                level: 'Advanced',
                price: 64.99,
                instructor: 'alex_johnson',
                published: true,
                categoryId: categories[2].id
            },
            // Data Science (3 courses)
            {
                title: 'Machine Learning avec Python',
                description: 'Apprenez le machine learning avec scikit-learn et TensorFlow',
                duration: 50,
                level: 'Intermediate',
                price: 59.99,
                instructor: 'maria_garcia',
                published: true,
                categoryId: categories[3].id
            },
            {
                title: 'Data Analysis avec Pandas',
                description: 'Analysez et visualisez des données avec Pandas',
                duration: 35,
                level: 'Beginner',
                price: 34.99,
                instructor: 'david_wilson',
                published: true,
                categoryId: categories[3].id
            },
            {
                title: 'Deep Learning & Neural Networks',
                description: 'Explorez les réseaux de neurones profonds avec TensorFlow',
                duration: 60,
                level: 'Advanced',
                price: 74.99,
                instructor: 'sophia_davis',
                published: true,
                categoryId: categories[3].id
            },
            // Cloud & DevOps (3 courses)
            {
                title: 'AWS Essentials',
                description: 'Apprenez les fondamentaux d\'AWS pour le cloud',
                duration: 40,
                level: 'Beginner',
                price: 49.99,
                instructor: 'john_doe',
                published: true,
                categoryId: categories[4].id
            },
            {
                title: 'Docker & Kubernetes',
                description: 'Maîtrisez la containerization avec Docker et orchestration avec Kubernetes',
                duration: 45,
                level: 'Intermediate',
                price: 54.99,
                instructor: 'jane_smith',
                published: true,
                categoryId: categories[4].id
            },
            {
                title: 'CI/CD avec Jenkins & GitLab',
                description: 'Mettez en place des pipelines CI/CD professionnels',
                duration: 38,
                level: 'Intermediate',
                price: 49.99,
                instructor: 'alex_johnson',
                published: true,
                categoryId: categories[4].id
            },
            // Database Design (2 courses)
            {
                title: 'SQL & PostgreSQL Avancé',
                description: 'Concevez et optimisez des bases de données SQL complexes',
                duration: 42,
                level: 'Intermediate',
                price: 44.99,
                instructor: 'maria_garcia',
                published: true,
                categoryId: categories[5].id
            },
            {
                title: 'MongoDB & NoSQL',
                description: 'Maîtrisez les bases de données NoSQL avec MongoDB',
                duration: 38,
                level: 'Beginner',
                price: 39.99,
                instructor: 'david_wilson',
                published: true,
                categoryId: categories[5].id
            },
            // UI/UX Design (2 courses)
            {
                title: 'Figma for UI Design',
                description: 'Créez des designs UI magnifiques avec Figma',
                duration: 32,
                level: 'Beginner',
                price: 29.99,
                instructor: 'sophia_davis',
                published: true,
                categoryId: categories[6].id
            },
            {
                title: 'UX Research & Testing',
                description: 'Apprenez les principes de l\'UX et testez vos designs',
                duration: 35,
                level: 'Beginner',
                price: 34.99,
                instructor: 'john_doe',
                published: true,
                categoryId: categories[6].id
            },
            // Cybersecurity (1 course)
            {
                title: 'Web Application Security',
                description: 'Sécurisez vos applications web contre les attaques courantes',
                duration: 45,
                level: 'Advanced',
                price: 64.99,
                instructor: 'jane_smith',
                published: true,
                categoryId: categories[7].id
            }
        ];

        const courses = await Course.bulkCreate(coursesData);
        console.log(`✅ ${courses.length} cours créés`);

        console.log('\n🎉 Database seeding completed successfully!');
        console.log(`📊 Summary:`);
        console.log(`   - ${users.length} utilisateurs`);
        console.log(`   - ${categories.length} catégories`);
        console.log(`   - ${courses.length} cours`);

    } catch (error) {
        console.error('❌ Erreur lors du seed:', error);
        process.exit(1);
    }
};

seedDatabase();

module.exports = seedDatabase;
