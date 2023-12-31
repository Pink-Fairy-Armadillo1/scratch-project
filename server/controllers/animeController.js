const db = require('../models/models.js');
const jwt = require('jsonwebtoken');
//const { secretKey } = require('./authenticationController.js');

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
    console.log('hi from addFavorite')
    const secretKey = 'a2ZthjPpKi79jLOk41jkUP4BduEsIqq3';
    const token = req.cookies.authToken;

    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, secretKey);
    const user_id = decodedToken.userId;

    const { mal_id, title, image } = req.body;
    //console.log('score:' , score)
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
    const favorite_id = getFavoritesIdResult.rows[0].id;

    //add user-item relationship to users_favorites table 

    const insertFavoriteQuery = 'INSERT INTO users_favorites (user_id, favorite_id) VALUES ($1, $2)';
    await db.query(insertFavoriteQuery, [user_id, favorite_id]);

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
    console.log('hi from getFavorites')
    const secretKey = 'a2ZthjPpKi79jLOk41jkUP4BduEsIqq3';
    const token = req.cookies.authToken;
    // // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, secretKey);
    const user_id = decodedToken.userId;
    
    const selectFavoritesQuery = `
    SELECT f.mal_id, f.item_title, f.item_image
    FROM favorites AS f
    JOIN users_favorites AS uf ON f.id = uf.favorite_id
    WHERE uf.user_id = $1
    `;
    console.log('hi from get favorites')
    const selectFavoritesResult = await db.query(selectFavoritesQuery, [user_id]);
    //console.log('data: ' , selectFavoritesResult.rows);
    //res.locals.favorites = selectFavoritesResult;
    res.status(200).json(selectFavoritesResult.rows);
    // res.status(200).json([{'hi': 'hello'}]);


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

animeController.checkFavorite = async (req, res, next) => {
  try {
    console.log('checking favorite');
    const secretKey = 'a2ZthjPpKi79jLOk41jkUP4BduEsIqq3';
    const token = req.cookies.authToken;

    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, secretKey);
    const user_id = decodedToken.userId;

    const { mal_id } = req.body;

    // Get the favorite_id from the favorites table
    const getFavoritesIdQuery = 'SELECT id FROM favorites WHERE mal_id = $1';
    const getFavoritesIdResult = await db.query(getFavoritesIdQuery, [mal_id]);
    const favorite_id = getFavoritesIdResult.rows[0].id;

    //check if user-item relationship exists users_favorites table
    const checkUserFavoriteQuery = 'SELECT * FROM users_favorites WHERE (user_id = $1 AND favorite_id = $2)'
    const checkUserFavoriteResult = await db.query(checkUserFavoriteQuery, [user_id, favorite_id]); 

  if (checkUserFavoriteResult.rows.length > 0) {
    res.status(200).json({ isFavorite: true });
  } else {
    res.status(200).json({ isFavorite: false });
  }
  } catch (err) {
    return next(
      createErr({
        method: 'checkFavorite',
        log: 'reading database',
        err
      })
    )
  }

};

animeController.deleteFavorite = async (req, res, next) => {
  try {
    console.log('hi from deleteFavorite')
    const secretKey = 'a2ZthjPpKi79jLOk41jkUP4BduEsIqq3';
    const token = req.cookies.authToken;

    // Verify the token and extract the user ID
    const decodedToken = jwt.verify(token, secretKey);
    const user_id = decodedToken.userId;

    const { mal_id } = req.body;
    console.log(mal_id)

    // Get the favorite_id from the favorites table
    const getFavoritesIdQuery = 'SELECT id FROM favorites WHERE mal_id = $1';
    const getFavoritesIdResult = await db.query(getFavoritesIdQuery, [mal_id]);
    const favorite_id = getFavoritesIdResult.rows[0].id;

    //check if user-item relationship exists users_favorites table
    // const checkUserFavoriteQuery = 'SELECT * FROM users_favorites WHERE (user_id = $1 AND favorite_id = $2)'
    // const checkUserFavoriteResult = await db.query(checkUserFavoriteQuery, [user_id, favorite_id]);
    
    // if (checkUserFavoriteResult.rows.length > 0) {
    //   //delete user-item relationship from users_favorites table 
    //   const deleteUserFavoriteQuery = 'DELETE FROM users_favorites WHERE (user_id = $1 AND favorite_id = $2)';
    //   await db.query(deleteUserFavoriteQuery, [user_id, favorite_id]);
    //   res.status(200).json({ message: 'Deleted from favorites' });
    // }

    const deleteUserFavoriteQuery = 'DELETE FROM users_favorites WHERE (user_id = $1 AND favorite_id = $2)';
    await db.query(deleteUserFavoriteQuery, [user_id, favorite_id]);
    res.status(200).json({ message: 'Deleted from favorites' });

  } catch (err) {
    return next(
      createErr({
        method: 'deleteFavorite',
        log: 'updating database',
        err
      })
    )
  }
};


  module.exports = animeController;

  