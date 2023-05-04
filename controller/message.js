const Message = require('../model/message');

exports.sendMessage = async (req, res, next) => {
    const { message_text} = req.body;
    console.log(message_text, req.user);
    try {
        const result = await req.user.createMessage({message_text: message_text, message_sender_name: req.user.name})
        res.status(200).json({messageInfo: result.dataValues, success: true, message: 'Message sent succesfully!!'})
    
    } catch (err) {
        console.log(err, 'err')
    }
}