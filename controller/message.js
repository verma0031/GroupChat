const Message = require('../model/message');
const { Op } = require("sequelize");
const convertIntoSeconds = (time) => {
    return new Date(`${time}`).getTime();
}

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

exports.getOldMessages = async (req, res, next) => {
    console.log("getting msg req");

    const msg = await Message.findAll()
    .then( (msg) => {
        console.log(msg);
        res.status(201).json({success:true, message:'fetched chat successfully',msg})
    })
    .catch( (err) => {
        console.log(err);
    })
}

exports.getNewMessages = async (req, res, next) => {
    console.log("getting new msg req\n\n\n\n\n\n");
    const lastID = req.headers.lastid;
    console.log(lastID);
    const msg = await Message.findAll(
        {
            where:{
                id:{
                    [Op.gt]: lastID
                }
            }
        }
    )
    .then( (msg) => {
        console.log(msg);
        res.status(201).json({success:true, message:'fetched chat successfully',msg})
    })
    .catch( (err) => {
        console.log(err);
    })
}