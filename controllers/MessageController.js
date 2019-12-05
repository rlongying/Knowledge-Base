let messageModel = require("../models/message");

exports.messagePage = async (req, res) => {
  console.log("message url: " + req.url);
  // messageModel.seed();
  let currentUserId = req.params.userId;
  let topic_id = req.params.topicId;
  let messageList;
  if (topic_id) {
    messageList = await messageModel
      .getMessages(topic_id)
      .then(([rows, fieldData]) => {
        return rows;
      });
  }

  let talkList = await messageModel
    .getTalkList(currentUserId)
    .then(([rows, fieldData]) => {
      return rows;
    });
  console.log(talkList);

  // handling talk list
  talkList.forEach(data => {
    var tmp = new Date(data.latestDate);
    var month = tmp.toLocaleString("default", { month: "short" });
    var date = tmp.getDate();
    data.latestDate = month + " " + date;

    if (data.fromUserId != currentUserId) {
      data.toFName = data.fromFName;
      data.toLName = data.fromLName;
      data.toImage = data.fromImage;
    }
  });

  // handling message list
  let refinedList;
  let eachDay;
  let createdAt;
  if (topic_id) {
    refinedList = new Array();
    eachDay = new Array();
    messageList[0].created_at = messageList[0].created_at.slice(0, 10);
    eachDay.push(messageList[0]);
    createdAt = messageList[0].created_at;

    for (let i = 1; i < messageList.length; i++) {
      messageList[i].created_at = messageList[i].created_at.slice(0, 10);
      if (createdAt == messageList[i].created_at) {
        eachDay.push(messageList[i]);
      } else {
        createdAt = messageList[i].created_at;
        refinedList.push(eachDay);
        eachDay = [];
        eachDay.push(messageList[i]);
      }
    }
    refinedList.push(eachDay);
  }

  res.render("message", {
    chatList: talkList,
    messageList: refinedList,
    userId: currentUserId,
    messageCSS: true
  });
};

exports.messageSend = async (req, res) => {
  let createdAt = req.body.createdAt;
  let message = req.body.message;
  let topic_id = req.params.topicId;
  let userId = req.params.userId;
  await messageModel.sendMessage(userId, topic_id, message, createdAt);
  res.redirect(301, `/messages/list/${userId}/${topic_id}`);
};
