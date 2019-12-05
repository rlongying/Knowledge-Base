gilet db = require("../util/database");

/*
 * Get a list of chat room list by current user id with images, name and
 * the last date of message transfered in each chat room
 *
 */
const getTalkList = async currentUserId => {
  let result = await db.query(`SELECT latestDate, subject, fromUser.first_name fromFName, fromUser.last_name fromLName, user.first_name toFName, user.last_name toLName,
                                fromUser.image fromImage, user.image toImage, fromUser.id fromUserId, fromUser.topic_id topic_id
                                FROM message_topic
                                INNER JOIN user
                                ON user.id = message_topic.user_to_id
                                INNER JOIN (select topic_id, max(created_at) latestDate from message
                                      group by topic_id) message
                                ON message.topic_id = message_topic.id
                                INNER JOIN (SELECT user.id id, image, message_topic.id topic_id, first_name, last_name FROM message_topic
                            INNER JOIN user
                            ON user.id = message_topic.user_from_id) fromUser
                                ON message_topic.id = fromUser.topic_id
                                WHERE user_from_id = ${currentUserId} OR user_to_id = ${currentUserId}
                                order by message_topic.id asc`);
  return result;
};

/*
 * get the list of messages as per chat room(by topic_id), which is sorted by
 * transfered date.
 * this includes user id, images, time, date message and topic_id
 */
const getMessages = async topic_id => {
  let result = await db.query(`SELECT * FROM message
                  INNER JOIN user ON user.id = message.user_id
                  INNER JOIN message_topic ON message_topic.id = message.topic_id
                  WHERE topic_id = ${topic_id}
                  ORDER BY created_at asc, time asc`);
  return result;
};

/*
 * 1. Store a message requested by user.
 * 2. Refine data by the standard of database
 */
const sendMessage = async (userId, topic_id, message, createdAt) => {
  let date = new Date(parseInt(createdAt));
  let minute;
  let hour;

  //refine minute
  if (date.getMinutes().toString().length == 1) {
    minute = "0" + date.getMinutes();
  } else {
    minute = date.getMinutes();
  }
  //refine hour
  if (date.getHours().toString().length == 1) {
    hour = "0" + date.getHours();
  } else {
    hour = date.getHours();
  }

  let time = hour + ":" + minute;
  let created_at =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  let sql = `INSERT INTO 
            message(user_id, topic_id, message, created_at, time)
            VALUES(${userId}, ${topic_id}, "${message}", "${created_at}", "${time}")`;
  await db.execute(sql);
};

const addTopic = async (subject, message, fromUser, toUser, createdAt) => {
  let sql_topic = `INSERT INTO message_topic(subject, user_from_id, user_to_id) VALUES ("${subject}", ${fromUser}, ${toUser})`;
  await db.execute(sql_topic);

  let sql_TopicId = "SELECT id from message_topic order by id desc limit 1";
  let topicId = await db.query(sql_TopicId).then(([rows, fieldData]) => {
    return rows;
  });

  await sendMessage(fromUser, topicId[0].id, message, createdAt);
};

module.exports = {
  getTalkList: getTalkList,
  getMessages: getMessages,
  sendMessage: sendMessage,
  addTopic: addTopic
};
