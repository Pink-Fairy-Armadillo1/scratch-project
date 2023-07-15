const express = require('express');

const router = express.Router();

const animeController = require('../controllers/animeController');

const authenticationController = require('../controllers/authenticationController');


router.post('/login', authenticationController.userLogin, (req, res) => {
    res.status(200).json({ message: 'Login successful' });
});

router.post('/signup', authenticationController.userSignup, (req, res) => {
    res.status(200).json({ message: 'User created successfully' });
});

router.post('/:mal_id/favorites', animeController.userFavorites, (req, res)=> {
    res.status(200).json({
        message: console.log('created')
    })
});





















module.exports = router;