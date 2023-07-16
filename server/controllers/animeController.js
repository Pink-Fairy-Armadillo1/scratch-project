const db = require('../models/models.js');

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
    const { user_id, mal_id, title, image } = req.body;
    //check if item exists in favorites table
    const checkItemQuery = 'SELECT * FROM favorites WHERE item_id = $1'
    const checkItemResult = await db.query(checkItemQuery, [mal_id]);
    //add item if it does not exist
    if (checkItemResult.rows.length === 0) {
      const insertItemQuery = 'INSERT INTO favorites (item_id, title, image) VALUES ($1, $2, $3)';
      await db.query(insertItemQuery, [mal_id, title, image]);
    }
    //add user-item relationship to users_favorites table 
    const insertFavoriteQuery = 'INSERT INTO users_favorites (user_id, item_id) VALUES ($1, $2)';
    await db.query(insertFavoriteQuery, [user_id, mal_id])

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
    const { user_id } = req.body;
    const selectFavoritesQuery = 'SELECT * FROM users_favorites WHERE user_id = $1';
    const selectFavoritesResult = await db.query(selectFavoritesQuery, [user_id]);

    res.locals.favorites = selectFavoritesResult;

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

  