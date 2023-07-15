const db = require('../models/models.js');

const animeController = {}

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
    const { } = req.body;
    const insertFavoriteQuery = '';


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
    const { } = req.body;
    const selectFavoritesQuery = '';


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

  