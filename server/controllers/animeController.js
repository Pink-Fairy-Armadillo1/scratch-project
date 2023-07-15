const db = require('../models/models.js');

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

  