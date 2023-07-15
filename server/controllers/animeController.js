const db = require('../models/models.js');

const animeController = {

 
async userFavorites(req,res,next){
   const {name} = req.body
  try{
    const insertIntoFavorites= 'INSERT INTO favorites (favoriteItem) VALUES($1)'

    await db.query(insertIntoFavorites,[name]) ;
     
    const userID = req.params.userID;


    const updateUserFavorites = 'SELECT (id) FROM favorites WHERE name = $2';

    const retrieveFavoritesID = await db.query(updateUserFavorites, [name], (error,data)=>{
      if (error){
        console.log(error)
      }else{
        const insertNewUserFavorites = 'INSERT INTO userFavorites (userid,favoriteid) VALUES($3,$4)'

        db.query(insertNewUserFavorites, [userID, data.ID])

      }
    })
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

  