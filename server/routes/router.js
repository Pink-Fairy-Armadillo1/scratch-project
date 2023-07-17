const express = require('express');

const router = express.Router();

const animeController = require('../controllers/animeController');

const authenticationController = require('../controllers/authenticationController');


router.post('/login', authenticationController.userLogin);

router.post('/signup', authenticationController.userSignup);

router.post('/addFavorites', animeController.addFavorite);

router.get('/favorites', animeController.getFavorites);





















module.exports = router;