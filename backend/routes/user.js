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
    User.findOne({ userName: req.body.userName })
        .then(user => {
            if (user != null) {
                let password = user.password
                let check = bcrypt.compareSync(req.body.password, password)
                if (check == true) {
                    result.message = 'success'
                    result.status = true
                    result.data = { userId: user._id }
                    res.json(result)
                } else {
                    result.message = 'invalid password'
                    return res.status(422).json(result)
                }
            } else {
                result.message = 'invalid credentials'
                return res.status(422).json(result)
            }
        }).catch(err => {
            res.status(422).json({ err })
        })
    // User.findOne({ email })
    //     .then(user => {
    //         if (!user) {
    //             return res.status(422).json({ message: 'User Does not Exists' })
    //         }
    //         if (user.password == null) {
    //             return res.json({ message: 'set password', userId: user._id })
    //         }
    //         //Validate password
    //         bcrypt.compare(password, user.password)
    //             .then(isMatch => {
    //                 if (!isMatch) return res.status(422).json({ message: 'Password not matched' });
    //                 jwt.sign(
    //                     { id: user.id },
    //                     config.get('jwtSecret'),
    //                     (err, token) => {
    //                         if (err) throw err;
    //                         res.send({ message: 'success', token, data: user._id, email: user.email, category: user.category, name: user.firstname + ' ' + user.lastname })
    //                     }
    //                 )
    //             })
    //     })

})

module.exports = router;