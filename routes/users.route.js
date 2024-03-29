let User = require('../models/user.model').User;
let express = require('express');
let router = express.Router();
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

router.post('/login', async (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;

    let users = await User.find().where({email: email});

    if(users.length > 0){
        let comparisonResult = await bcrypt.compare(password, users[0].password)
        if(comparisonResult){
            let token = auth.generateToken(users[0]);
            res.cookie('auth_token', token)
            res.send({
                redirectURL: '/admin',
                message: 'Success'
            });
        } else {
            res.send({message: 'Rejected'});
        }
    } else {
        res.send({message: 'Rejected'});
    }
})

router.post('/register', async (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;

    let users = await User.find().where({email: email});

    if(users.length === 0){
        let encryptedPass = await bcrypt.hash(password, 12)
        let newUser = new User({
            email,
            password: encryptedPass
        })
        await newUser.save();
        res.send({message: 'Done'});
    } else {
        res.send({message: 'Rejected'});
    }
})

module.exports = router;