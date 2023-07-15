const db = require('../models/models.js');

const animeController = {

 
async userFavorites(req,res,next){
   
  try{
    const getShows= ''

    await db.query



  }
  catch(err){
    return next({
    log: 'Error occured at animeController.userFavorites' + err,
    status: 400,
    message: { err: 'Error when adding to favorites' }})
    }
  }
}







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


  module.exports = animeController;

  