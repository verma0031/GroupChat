const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function isstringinvalid(string){
    if(string == undefined ||string.length === 0){
        return true
    } else {
        return false
    }
}

const generateAccessToken = (id, name) => {
    return jwt.sign({userId: id, name:name}, 'secretkey');
}

exports.signup = async (req, res, next)=>{
    try{
    const { name, email, phone, password } = req.body;
    console.log('email', email)
    if(isstringinvalid(name) || isstringinvalid(email || isstringinvalid(password))){
        return res.status(400).json({err: "Bad parameters . Something is missing"})
    }
    const saltrounds = 10;
    bcrypt.hash(password, saltrounds, async (err, hash) => {

        User.findAll({where: {phone: phone}}).then( async (users) => {
            const user = users[0];
            console.log("\nin signup\n",user);
            if (user) {
                res.json({success: false, message: "User Already exist. Please Login"});
            }

            else {
                console.log("password is hashed As : ", hash);
                await User.create({ name, email,phone, password: hash })
                .then(() => {
                    res.status(201).json({success: true, message: "Congratulations!! You have signed up successfully"});
                })
                .catch((err) => {
                    console.log(err);
                    res.json({ success: false, message: "error while registering" });
                });
            }
        })
        // console.log(err)
        // await User.create({ name, email,phone, password: hash })
        // res.status(201).json({message: 'Successfuly create new user'})
    })
}catch(err) {
    res.status(500).json(err);
}

}

exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;
        if(isstringinvalid(email) || isstringinvalid(password)){
            return res.status(400).json({message: 'EMail idor password is missing ', success: false})
        }
        console.log(password);
        const user  = await User.findAll({ where : { email }})
            if(user.length > 0){
               bcrypt.compare(password, user[0].password, (err, result) => {
               if(err){
                throw new Error('Something went wrong')
               }
                if(result === true){
                    return res.status(200).json({success: true, message: "User logged in successfully", token: generateAccessToken(user[0].id, user[0].name)})
                }
                else{
                return res.status(400).json({success: false, message: 'Password is incorrect'})
               }
            })
            } else {
                return res.status(404).json({success: false, message: 'User Doesnot exitst'})
            }
        }catch(err){
            res.status(500).json({message: err, success: false})
        }
}

exports.generateAccessToken = generateAccessToken;