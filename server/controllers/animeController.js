const db = require('../models/models.js');
const jwt = require('jsonwebtoken');
const secretKey = require('./authenticationController.js');

const animeController = {};

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `animeController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in animeController.${method}. Check server logs for more details.`,
    },
  };
};

animeController.addFavorite = async (req, res, next) => {
  try {
    console.log('---');
    const token = req.cookies.authToken;

    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, secretKey);
    const user_id = decodedToken.userId;

    const { mal_id, title, image } = req.body;
    //check if item exists in favorites table
    const checkItemQuery = 'SELECT * FROM favorites WHERE mal_id = $1'
    const checkItemResult = await db.query(checkItemQuery, [mal_id]);
    //add item if it does not exist
    if (checkItemResult.rows.length === 0) {
      const insertItemQuery = 'INSERT INTO favorites (mal_id, item_title, item_image) VALUES ($1, $2, $3)';
      await db.query(insertItemQuery, [mal_id, title, image]);

    }

    // Get the favorite_id from the favorites table
    const getFavoritesIdQuery = 'SELECT id FROM favorites WHERE mal_id = $1';
    const getFavoritesIdResult = await db.query(getFavoritesIdQuery, [mal_id]);
    const favorites_id = getFavoritesIdResult.rows[0].id;

    //add user-item relationship to users_favorites table 
    const insertFavoriteQuery = 'INSERT INTO users_favorites (user_id, favorites_id) VALUES ($1, $2)';
    await db.query(insertFavoriteQuery, [user_id, favorites_id]);

    res.status(200).json({ message: 'Added to favorites' });

  } catch (err) {
    return next(
      createErr({
        method: 'addFavorite',
        log: 'updating database',
        err
      })
    )
  }
};

animeController.getFavorites = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;
    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, secretKey);
    const user_id = decodedToken.userId;

    const selectFavoritesQuery = 'SELECT * FROM users_favorites WHERE user_id = $1';
    const selectFavoritesResult = await db.query(selectFavoritesQuery, [user_id]);

    res.locals.favorites = selectFavoritesResult;
    res.status(200).json(res.locals.favorites);

  } catch (err) {
    return next(
      createErr({
        method: 'getFavorites',
        log: 'reading database',
        err
      })
    )
  }

};









  module.exports = animeController;

  