let db = require("../util/database");
const LATEST_POST = 5;

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

const addPost = post => {
  const { topic, subject, message, created_at, user_id } = post;
  let sql =
    "insert into post(topic, subject, message, created_at, user_id) values (?,?,?,?,?)";
  return db.query(sql, [topic, subject, message, created_at, user_id]);
};

const getLatestPosts = () => {
  let sql = `
          SELECT 
            u.image 		  AS image,
            p.id    		  AS id, 
            p.message		  AS message, 
            p.created_at	AS created_at, 
            p.subject		  AS subject, 
            p.topic			  AS topic,
            p.user_id     AS user_id,
            count(c.id)		AS replies
        FROM post AS p
          JOIN user AS u
            ON p.user_id = u.id
          LEFT JOIN comment AS c
            ON p.id = c.post_id 
        GROUP BY p.id
        ORDER BY created_at
        LIMIT  ${LATEST_POST}
   `;

  return db.query(sql);
};

/**
 * get a post with the specified id
 * this method returns a promise
 * @param {Number} postid
 */
const getPostById = async postId => {
  const [post, postFields] = await db.query(
    `
      SELECT 
          u.image       AS image,
          p.id    		  AS id, 
          p.message		  AS message, 
          p.created_at	AS created_at, 
          p.subject		  AS subject, 
          p.user_id     AS user_id,
          p.topic			  AS topic
      FROM post AS p
      JOIN user AS u
        ON p.user_id = u.id
      WHERE p.id = ${postId}
     `
  );
  const [comments, commentFields] = await db.query(
    `SELECT 
          u.image       AS image,
          c.id    		  AS id, 
          c.message		  AS message, 
          c.created_at	AS created_at, 
          c.post_id		  AS post_id, 
          c.user_id			AS user_id
    FROM comment AS c
    JOIN user AS u
      ON c.user_id = u.id
    WHERE c.post_id = ${postId}`
  );

  return { post: post[0], comments };
};

/**
 * get an array of posts, the message of which contains the keyword passed by msg
 * this method returns a promise
 * @param {string} msg
 */
const getPostsByContent = msg => {
  // single quota around %${msg}% is necessary
  const sql = `
        SELECT 
            u.image 		  AS image,
            p.id    		  AS id, 
            p.message		  AS message, 
            p.created_at	AS created_at, 
            p.subject		  AS subject, 
            p.topic			  AS topic,
            p.user_id     AS user_id,
            count(c.id)		AS replies
        FROM post AS p
          JOIN user AS u
            ON p.user_id = u.id
          LEFT JOIN comment AS c
            ON p.id = c.post_id
        WHERE p.message LIKE '%${msg}%'
        GROUP BY p.id
   `;
  return db.query(sql);
};

/**
 * get all post of the specified topic
 * this method returns a promise
 * @param {string} topic
 */
const getPostsByTopic = topic => {
  // user single quota to wrap string type values when using string template
  const sql = `
        SELECT 
            u.image 		  AS image,
            p.id    		  AS id, 
            p.message		  AS message, 
            p.created_at	AS created_at, 
            p.subject		  AS subject, 
            p.topic			  AS topic,
            p.user_id     AS user_id,
            count(c.id)		AS replies
        FROM post AS p
          JOIN user AS u
            ON p.user_id = u.id
          LEFT JOIN comment AS c
            ON p.id = c.post_id
        WHERE topic = '${topic}'
        GROUP BY p.id
   `;
  return db.query(sql);
};

/**
 * get all post posted by user whose id = userId
 * this method returns a promise
 * @param {Number} userId
 */
const getPostsByUserId = userId => {
  const sql = `
        SELECT 
            u.image 		  AS image,
            p.id    		  AS id, 
            p.message		  AS message, 
            p.created_at	AS created_at, 
            p.subject		  AS subject, 
            p.topic			  AS topic,
            p.user_id     AS user_id,
            count(c.id)		AS replies
        FROM post AS p
          JOIN user AS u
            ON p.user_id = u.id AND u.id = ${userId}
          LEFT JOIN comment AS c
            ON p.id = c.post_id
        GROUP BY p.id
    `;

  return db.query(sql);
};

/**
 * a comment includes: message, created_at, post_id, user_id
 * @param {Object} comment
 */
const addComment = comment => {
  const { message, created_at, post_id, user_id } = comment;
  let sql =
    "insert into comment(message, created_at, post_id, user_id) values (?,?,?,?)";
  return db.query(sql, [message, created_at, post_id, user_id]);
};

const getTopics = () => {
  return db.query("SELECT DISTINCT topic FROM post");
};

module.exports = {
  seedPosts: seedPosts,
  getPost: getPostById,
  getPostsByContent: getPostsByContent,
  getPostsByTopic: getPostsByTopic,
  getPostsByUserId: getPostsByUserId,
  getLatestPosts: getLatestPosts,
  addPost: addPost,
  addComment: addComment,
  getTopics: getTopics
};
