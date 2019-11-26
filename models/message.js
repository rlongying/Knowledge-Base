let db = require("../util/database");


/*
* seeding data
* being used when you need to add dummy data
*/
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

/*
* Get a list of chat room list by current user id with images, name and 
* the last date of message transfered in each chat room
*
*/
const getTalkList = async (currentUserId) => {
    let result = await db.query(`SELECT latestDate, subject, fromUser.first_name fromFName, fromUser.last_name fromLName, user.first_name toFName, user.last_name toLName,
                      fromUser.image fromImage, user.image toImage, user.id toUserId, fromUser.topic_id topic_id
                      FROM message_topic
                      INNER JOIN user
                      ON user.id = message_topic.user_to_id
                      INNER JOIN (select topic_id, max(created_at) latestDate from message
                            group by topic_id) message
                      ON message.topic_id = message_topic.id
                      INNER JOIN (SELECT image, message_topic.id topic_id, first_name, last_name FROM message_topic
                      INNER JOIN user
                      ON user.id = message_topic.user_from_id) fromUser
                      ON message_topic.id = fromUser.topic_id
                      WHERE user_from_id = ${currentUserId} OR user_to_id = ${currentUserId}
                      order by message_topic.id asc`);
                      // sorry guys, just ignore this monstrous sql query. I need it..
    return result;
};


/*
* get the list of messages as per chat room(by topic_id), which is sorted by 
* transfered date.
* this includes user id, images, time, date message and topic_id
*/
const getMessages = async (topic_id) => {
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
const sendMessage = async (topic_id, message) => {
  let date = new Date();
  let minute
  let hour

  //refine minute
  if(date.getMinutes().toString().length == 1){
    minute = "0" + date.getMinutes();
  } else {
    minute = date.getMinutes();
  }
  //refine hour
  if(date.getHours().toString().length == 1){
    hour = "0" + date.getHours();
  } else {
    hour = date.getHours();
  }

  let time =  hour + ":" + minute;
  let created_at = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours()+ ":" + date.getMinutes() + ":" + date.getSeconds();
  let sql = `INSERT INTO 
            message(user_id, topic_id, message, created_at, time)
            VALUES(1, ${topic_id}, "${message}", "${created_at}", "${time}")`;
  await db.execute(sql);
}

const addTopic = async (subject, message, fromUser, toUser) => {
  let sql_topic = `INSERT INTO message_topic(subject, user_from_id, user_to_id) VALUES ("${subject}", ${fromUser}, ${toUser})`;
  await db.execute(sql_topic);
  
  let sql_TopicId = 'SELECT id from message_topic order by id desc limit 1';
  let topicId = await db.query(sql_TopicId).then(([rows, fieldData]) => { return rows});
  
  await sendMessage(topicId[0].id, message);
}



module.exports = {
    getTalkList: getTalkList,
    getMessages: getMessages,
    seed: seedMessages,
    sendMessage: sendMessage,
    addTopic: addTopic
};