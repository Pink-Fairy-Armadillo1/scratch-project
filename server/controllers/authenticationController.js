const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const db = require('../models/models.js');

const authenticationController = {};

const createErr = (errInfo) => {
    const { method, type, err } = errInfo;
    return {
      log: `authenticationController.${method} ${type}: ERROR: ${
        typeof err === 'object' ? JSON.stringify(err) : err
      }`,
      message: {
        err: `Error occurred in authenticationController.${method}. Check server logs for more details.`,
      },
    };
  };

authenticationController.userLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        //retrieve user data 
        const checkUserQuery = 'SELECT * FROM users WHERE username = $1';
        const checkUserResult = await db.query(checkUserQuery, [username]);
        //check if user exists
        if (checkUserResult.rows.length === 0) {
            return res.redirect('/signup');
        }
        const user = checkUserResult.rows[0];
        //compare input password with stored hashed password 
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.redirect('/home');
        } else {
            res.redirect('/login');
        }
    }
    catch (err) {
        return next(
            createErr({
            method: 'userLogin',
            type: 'login process',
            err
        }
        ))
    }
};

authenticationController.userSignup = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        //check if user already exists 
        const checkUserQuery = 'SELECT * FROM users WHERE username = $1';
        const checkUserResult = await db.query(checkUserQuery, [username]);
        if (checkUserResult.rows.length > 0) {
            return res.redirect('/login');
        }

        const insertUserQuery = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id';
        const insertUserResult = await db.query(insertUserQuery, [username, hashedPassword]);

        return res.redirect('/login');
    }
    catch (err) {
        return next(
            createErr({
            method: 'userSignup',
            type: 'creating user',
            err
        }
        ))
    }
};


module.exports = authenticationController;