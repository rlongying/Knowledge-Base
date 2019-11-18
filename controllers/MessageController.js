let messageModel = require('../models/message');

 
exports.messagePage = async(req, res) => {
    messageModel.seed();
    let talkList = await messageModel.getTalkList().then(([rows, fieldData]) => {
        return rows;
    });         
    let messageList = await messageModel.getMessages().then(([rows, fieldData]) => {
        return rows;
    });
    let refinedList = new Array();
    let eachDay = new Array();
    let tmpDate = messageList[0].created_at.slice(8,10);
    eachDay.push(messageList[0]);
    for(let i = 1; i < messageList.length; i++){
        if(tmpDate != messageList[i].created_at.slice(8,10)){
            refinedList.push(eachDay);
            eachDay = [];
            tmpDate = messageList[i].created_at.slice(8,10)
        } else {
            eachDay.push(messageList[i]);
        }
    }
    refinedList.push(eachDay);

    console.log(refinedList[1]);
    
    res.render('message', { chatList: talkList, messageList: refinedList, messageCSS: true }); 
};

