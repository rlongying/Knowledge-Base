let messageModel = require('../models/message');

 
exports.messagePage = async(req, res) => {
    messageModel.seed();
    let talkList = await messageModel.getTalkList().then(([rows, fieldData]) => {
        return rows;
    });         
    let messageList = await messageModel.getMessages().then(([rows, fieldData]) => {
        return rows;
    });
    console.log(talkList);

    
    res.render('message', { chatList: talkList, messageList: messageList, messageCSS: true }); 
};

