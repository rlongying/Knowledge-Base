let db = require('../util/database');

async function test() {
    console.log("passing")
    let query = 'select * from user'
    await db.execute(query).then(([row,someData]) => {
        console.log(row); 
    });
}

/**
 * get user with the specified id
 * this method returns a promise
 * @param {Number} userId
 */
const getUserById = userId => {
    return db.query(`SELECT * FROM user WHERE id = ${userId}`);
};

/**
 * like user profile with the specified id
 * this method returns a promise
 * @param {Number} userId
 */
const likeUser = userId => {
    return db.query(`UPDATE user SET likes = likes + 1 WHERE id = ${userId}`);
};
  
module.exports = {
    test : test,
    getUserById : getUserById,
    likeUser : likeUser
};