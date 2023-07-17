const express = require('express');

const router = express.Router();

const animeController = require('../controllers/animeController');

const authenticationController = require('../controllers/authenticationController');


router.post('/login', authenticationController.userLogin);

router.post('/signup', authenticationController.userSignup);

router.post('/addFavorites', animeController.addFavorite);

router.get('/favorites', animeController.getFavorites);

router.post('/checkFavorite', animeController.checkFavorite);

router.post('/deleteFavorites', animeController.deleteFavorite);





















module.exports = router;