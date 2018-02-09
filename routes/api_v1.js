const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

var express = require('express');
var router = express.Router();
var foodsController = require('../controllers/foodsController')
var mealsController = require('../controllers/mealsController')

router.get('/foods', foodsController.index);
router.get('/foods/:id', foodsController.show);
router.post('/foods', foodsController.create);
router.delete('/foods/:id', foodsController.destroy);
router.patch('/foods/:id', foodsController.update);

router.get('/meals', mealsController.index)
router.get('/meals/:id/foods', mealsController.show)
router.post('/meals/:meal_id/foods/:id', mealsController.create)
router.delete('/meals/:meal_id/foods/:id', mealsController.destroy)


module.exports = router;
