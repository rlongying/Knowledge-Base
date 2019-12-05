let db = require("../util/database");

/**
 * adds a user to the database
 * this method returns a promise
 * @param {Object} user
 */
const registerUser = async user => {
  const {
    firstname,
    lastname,
    email,
    password,
    img,
    description,
    country,
    dob
  } = user;
  let sql =
    "INSERT INTO user(first_name, last_name, email, password, image, about, country, birth_date) values (?,?,?,?,?,?,?,?)";
  return await db.query(sql, [
    firstname,
    lastname,
    email,
    password,
    img,
    description,
    country,
    dob
  ]);
};

const userLogin = user => {
  const { email, password } = user;
  let sql = "SELECT * FROM user WHERE email = ? AND password = ?";
  return db.query(sql, [email, password]);
};

/**
 * get user with the specified id
 * this method returns a promise
 * @param {Number} userId
 */
const getUserById = async userId => {
  return await db.query(`SELECT * FROM user WHERE id = ${userId}`);
};

/**
 * get a summary of user, including: all field in user table as well as message count and posts count
 * @param {Number} userId
 */
const getUserInfo = userId => {
  let sql = `
        select
            u.*,
            (
                select count(*) 
                from post p 
                where p.user_id = ${userId}
            ) as postCount,
            (
                select count(*) 
                from message_topic as m 
                where m.user_from_id = ${userId} or m.user_to_id = ${userId}
            ) as messageCount
        from user u
        where u.id = ${userId}
        `;
  return db.query(sql);
};

/**
 * like user profile with the specified id
 * this method returns a promise
 * @param {Number} userId
 */
const likeUser = userId => {
  return db.query(`UPDATE user SET likes = likes + 1 WHERE id = ${userId}`);
};

/**
 * edit user profile with current signed in user id
 */

const updateUser = async (userId, userInfo) => {
  return await db.query(`UPDATE user 
                            SET 
                            image = '${userInfo.image}',
                            country = '${userInfo.country}',
                            first_name = '${userInfo.fName}',
                            last_name = '${userInfo.lName}',
                            birth_date = '${userInfo.date}' 
                            WHERE id = ${userId}`);
};

module.exports = {
  getUserById: getUserById,
  likeUser: likeUser,
  registerUser: registerUser,
  userLogin: userLogin,
  updateUser: updateUser,
  getUserInfo: getUserInfo
};
