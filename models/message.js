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

const getTalkList = async () => {
    // return db.query(`SELECT * FROM message_topic WHERE user_from_id = ${userId} OR user_to_id = ${userId}`);
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
                      WHERE user_from_id = 1 OR user_to_id = 1
                      order by message_topic.id asc`);
                      // sorry guys, just ignore this monstrous sql query. I need it..
    return result;
};
const getMessages = async (topic_id) => {
  let result = await db.query(`SELECT * FROM message
                  INNER JOIN user ON user.id = message.user_id
                  INNER JOIN message_topic ON message_topic.id = message.topic_id
                  WHERE topic_id = ${topic_id}
                  ORDER BY created_at asc, time asc`);
  return result;
};



const sendMessage = (topic_id, message) => {
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
  let created_at = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  let sql = `INSERT INTO 
            message(user_id, topic_id, message, created_at, time)
            VALUES(1, ${topic_id}, "${message}", "${created_at}", "${time}")`;
  db.execute(sql);
}


module.exports = {
    getTalkList: getTalkList,
    getMessages: getMessages,
    seed: seedMessages,
    sendMessage: sendMessage
};