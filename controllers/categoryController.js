const categoriesService = require('../services/categoriesService');

const controller = {
    getAllCategories: async (req, res) => {
        try {
            const allCategories = await categoriesService.fetchAll();
            
            if (!allCategories) {
                res.status(404).json({message: 'No cattegories found'}); 
            }

            res.status(200).json(allCategories);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    getCategoryById: async (req, res) => {
        try {
            const myCategory = await categoriesService.fetchById(req.params.id, req.params.cou);

            if (!myCategory) {
                res.status(404).json({message: 'Category with ' + req.params.id + ' not found'});
            }

            res.status(200).json(myCategory);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },
    createCategory: async (req, res) => {
        console.log('coucou' + req.body.name + '  ');
        try {

            if (!req.body.name) {
                res.status(400 ).json({
                    message: 'Please enter a valid data for category creation',    
                });
            }

            const newCartegory = await categoriesService.create(req.body);

            res.status(201).json(newCartegory);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
};

module.exports = controller;