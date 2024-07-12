const express = require('express');
const router = express.Router();
const User = require('../models/Auth'); // Assuming Auth.js contains User model
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// User signup
router.post('/user/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err + "Hash error"
            });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                fullName: req.body.fullName,
                email: req.body.email,
                password: hash
            });

            user.save()
                .then(result => {
                    res.status(200).json({
                        newUser: result
                    });
                })
                .catch(error => {
                    console.log(error);
                    res.status(500).json({
                        error: error
                    });
                });
        }
    });
});

// User login
router.post('/user/login', (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (!result) {
                    return res.status(404).json({
                        message: 'Password not matching'
                    });
                }

                const token = jwt.sign({
                    email: user.email,
                    fullName: user.fullName,
                    userType: 'User'
                }, 'i am musa', {
                    expiresIn: '365d'
                });

                res.status(200).json({
                    email: user.email,
                    fullName: user.fullName,
                    token: token
                });
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            });
        });
});

// Admin login
router.post('/admin/login', (req, res) => {
    if (req.body.userName == 'musa@123' && req.body.password == '123456') {
        const token = jwt.sign({
            email: 'abcd@gmail.com',
            fullName: 'musaddique',
            userType: 'admin'
        }, 'i am musa', {
            expiresIn: '365d'
        });

        res.status(200).json({
            fullName: 'musaddique',
            email: 'abcd@gmail.com',
            token: token
        });
    } else {
        res.status(404).json({
            msg: 'Auth request fail'
        });
    }
});

module.exports = router;
