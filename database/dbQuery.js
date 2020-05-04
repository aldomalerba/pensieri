const pool = require('./pool');

function query(queryText, params) {
    return new Promise((resolve, reject) => {
      pool.query(queryText,params)
          .then((res) => {
              resolve(res);
          })
          .catch((err) => {
              reject(err);
          })
          .finally(() => { })
    });
}

module.exports = { query };