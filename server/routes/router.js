const express = require('express');

const router = express.Router();

const animeController = require('../controllers/animeController');

const authenticationController = require('../controllers/authenticationController');


router.post('/login', authenticationController.userLogin);

router.post('/signup', authenticationController.userSignup);


// router.post('/:mal_id/favorites', animeController.userFavorites, (req, res)=> {
//     res.status(200).json({
//         message: console.log('created')
//     })
// });





















module.exports = router;