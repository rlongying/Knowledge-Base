let messageModel = require('../models/message');

 
exports.messagePage = async(req, res) => {

    // messageModel.seed();

    let topic_id = req.params.topicId;
    let talkList = await messageModel.getTalkList().then(([rows, fieldData]) => {
        return rows;
    });         
    let messageList = await messageModel.getMessages(topic_id).then(([rows, fieldData]) => {
        return rows;
    });


    // handling talk list
    talkList.forEach(data => {
        var tmp = new Date(data.latestDate)
        var month = tmp.toLocaleString("default",{month: 'short'});
        var date = tmp.getDate() + 1;
        data.latestDate = month + " " + date; 
        
        if(data.toUserId == 1){
            data.toFName = data.fromFName
            data.toLName = data.fromLName
            data.toImage = data.fromImage
        }
    });
    
    // handling message list
    let refinedList = new Array();
    let eachDay = new Array();
    eachDay.push(messageList[0])
    var createdAt = messageList[0].created_at

    for(let i = 1; i < messageList.length; i++){
        if(createdAt == messageList[i].created_at){
            eachDay.push(messageList[i])
        } else {
            createdAt = messageList[i].created_at;
            refinedList.push(eachDay);
            eachDay = [];
            eachDay.push(messageList[i])
        }
    }
    refinedList.push(eachDay);

    res.render('message', { chatList: talkList, messageList: refinedList, messageCSS: true }); 
};

exports.messageSend = (req, res) => {
    let topic_id = req.params.topicId;

    res.redirect(301,`/messages/list/${topic_id}`)
}