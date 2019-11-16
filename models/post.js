let db = require("../util/database");

const seedPosts = () => {
  let sql =
    "insert into post(topic, subject, message, created_at, user_id) values ?";

  let values = [
    ["java", "java topic 1", "java message 1", new Date(2019, 08, 15), 11],
    ["java", "java topic 2", "java message 2", new Date(2019, 08, 15), 11],
    ["java", "java topic 3", "java message 3", new Date(2019, 08, 15), 11]
  ];

  return db.query(sql, [values]);
};

/**
 * get a post with the specified id
 * this method returns a promise
 * @param {Number} postid
 */
const getPostById = postId => {
  return db.query(`SELECT * FROM post WHERE id = ${postId}`);
};

/**
 * get an array of posts, the message of which contains the keyword passed by msg
 * this method returns a promise
 * @param {string} msg
 */
const getPostsByContent = msg => {
  // single quota around %${msg}% is necessary
  return db.query(`SELECT * FROM post WHERE message LIKE '%${msg}%'`);
};

/**
 * get all post of the specified topic
 * this method returns a promise
 * @param {string} topic
 */
const getPostsByTopic = topic => {
  // user single quota to wrap string type values when using string template
  return db.query(`SELECT * FROM post WHERE topic = '${topic}'`);
};

/**
 * get all post posted by user whose id = userId
 * this method returns a promise
 * @param {Number} userId
 */
const getPostsByUserId = userId => {
  return db.query(`SELECT * FROM post WHERE user_id = ${userId}`);
};

module.exports = {
  seedPosts: seedPosts,
  getPost: getPostById,
  getPostsByContent: getPostsByContent,
  getPostsByTopic: getPostsByTopic,
  getPostsByUserId: getPostsByUserId
};
