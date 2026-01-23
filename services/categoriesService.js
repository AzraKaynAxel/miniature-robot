const { Category, Course} = require('../models/association');

const categoriesService = {
    fetchAll: async () => {
        return await Category.findAll({});
    },
    fetchById: async (id) => {
        return await Category.findByPk((id), {
            include: [{
                model: Course,
                as: 'courses'
            }]
        });
    },
    create: async (categoryData) => {
        const categoryIsExist = await Category.findOne({ where: { name: categoryData.name } });
        
        if (categoryIsExist) {
            throw new Error('Category with name ' + categoryData.name + ' already exists')
        };

        const newCategory = await Category.create(categoryData);
         console.log('Service terminer');
         console.log(newCategory);
         
        return newCategory;    
    }
};

module.exports = categoriesService;