const { Pool } = require('pg');
const PG_URI = 'postgres://xktugvfp:rmSMarOkmKyZoBKpc_39xq3YtzGrF38u@stampy.db.elephantsql.com/xktugvfp';

const pool = new Pool ({
    connectionString: PG_URI,
});

pool.query('SELECT 1')
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('Error connecting to database', err);
    });







module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    },
};