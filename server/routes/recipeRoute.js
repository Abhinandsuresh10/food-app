const express = require('express');
const router = express.Router();

const recipeController = require('../controllers/recipeController');


router.get('/',recipeController.homepage); 
router.get('/categories', recipeController.loadCategory);
router.get('/recipe/:id', recipeController.loadSingleRecipe);
router.get('/categories/:id', recipeController.loadCategoryById);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);


module.exports = router;