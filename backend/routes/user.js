const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Bring User Model
let User = require('../models/user');

//User login
router.post('/login', (req, res) => {
    var result = {
        message: '',
        data: {},
        status: false,
        error: {},
    }
    User.findOne({ userName: req.body.userName }) //finding user by name
        .then(user => {
            if (user != null) { //if user found
                let password = user.password
                let check = bcrypt.compareSync(req.body.password, password)
                if (check == true) { //if password is valid
                    result.message = 'success'
                    result.status = true
                    result.data = { userId: user._id }
                    res.json(result)
                } else { //if password is NOT valid
                    result.message = 'invalid password'
                    return res.status(422).json(result)
                }
            } else { //if user not found
                result.message = 'invalid credentials'
                return res.status(422).json(result)
            }
        }).catch(err => {
            res.status(422).json({ err })
        })
})

module.exports = router;