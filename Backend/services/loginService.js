const db = require('../config/db');



exports.login = (username, password) => {
  return new Promise((resolve, reject) => {

    const sql = 'SELECT * FROM users WHERE name = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });

  });
};
