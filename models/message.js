let db = require("../util/database");

const seedMessages = () => {
  let sql1 =
    "insert into message(user_id, topic_id, message, created_at) values ?";
  // let sql2 = 
  //   "insert into message_topic(subject, user_from_id, user_to_id) values ?";
  let date = new Date();
  date = date.getFullYear()+ '-' +
  (date.getMonth()+1) + '-' +
  date.getDate()       + ' ' +
  date.getHours()      + ':' +
  date.getMinutes();
  console.log(date);


  // let values1 = [
  //   [11, 21, "test test test test", new Date(2019, 08, 15, 10, 30)],
  //   [11, 21, "test test test test", new Date(2019, 08, 15, 10, 31)],
  //   [11, 21, "test test test test", new Date(2019, 08, 16, 10, 32)],
  //   [11, 21, "test test test test", new Date(2019, 08, 16, 10, 33)],
  //   [11, 21, "test test test test", new Date(2019, 08, 16, 10, 34)],
  //   [11, 31, "test test test test", new Date(2019, 08, 15, 10, 31)],
  //   [11, 31, "test test test test", new Date(2019, 08, 15, 10, 32)],
  //   [11, 31, "test test test test", new Date(2019, 08, 16, 10, 33)],
  //   [11, 31, "test test test test", new Date(2019, 08, 16, 10, 34)],
  //   [11, 31, "test test test test", new Date(2019, 08, 16, 10, 35)],
  // ];
  // let values2 = [
  //   ["TESTEST", 11, 1],
  //   ["I want to test again", 11, 1]
  // ];

  // db.query(sql1, [values1]);
  // db.query(sql2, [values2]);
};

const getTalkList = (userId) => {
    // return db.query(`SELECT * FROM message_topic WHERE user_from_id = ${userId} OR user_to_id = ${userId}`);
    return db.query(`SELECT * FROM message_topic
                        INNER JOIN user
                        ON user.id = message_topic.user_from_id
                        WHERE user_from_id = 1 OR user_to_id = 1`);
};
const getMessages = (userId) => {
  // return db.query(`SELECT * FROM message_topic WHERE user_from_id = ${userId} OR user_to_id = ${userId}`);
  return db.query(`SELECT * FROM message
                  INNER JOIN user ON user.id = message.user_id
                  INNER JOIN message_topic ON message_topic.id = message.topic_id
                  WHERE topic_id = 1
                  ORDER BY created_at asc`);
};



module.exports = {
    getTalkList: getTalkList,
    getMessages: getMessages,
    seed: seedMessages,
};