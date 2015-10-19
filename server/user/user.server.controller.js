'use strict';

// var User = require('../model/User.js'),
var User = require('./user.server.model').User;
var Boom = require('boom');
var config = require("../config/config");
var request = require('request');

/** create function to create User. */
exports.create = function (req, res, next) {
    User.create(req.body, function(err, data) {
        if (!err) {
            console.log("user created successfully")
            // return res.json(data);
        } else {
            return res.send(Boom.badImplementation(err)); // 500 error
        }
    });
};



/** getUser function to get User by id. */
exports.get = function (req, res, next) {
    User.get({email: req.params.email}, function(err, result) {
        if (!err) {
            if(result == null) return res.json({exist:false});
            return res.json(result);
        } else {
            return res.send(Boom.badImplementation(err)); // 500 error
        }
    });
};

/** getAll function to get all Users. */
exports.getAll = function (req, res, next) {
    User.getAll({}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(Boom.badImplementation(err)); // 500 error
        }
    });
};


/** updateUser function to update User by id. */
exports.update = function (req, res, next) {
    User.update({_id: req.params.id}, req.body, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(Boom.badImplementation(err)); // 500 error
        }
    });
};

/** updateUser function to update User by id. */
exports.remove = function (req, res, next) {
    User.remove({_id: req.params.id}, function(err, result) {
        if (!err) {
            return res.json(result);
        } else {
            return res.send(Boom.badImplementation(err)); // 500 error
        }
    });
};



exports.logout = function (req, res) {
    req.session.advertiser = null
    req.session.influencer = null
    req.session.passport = null;
    req.session.admin= null;
    req.session.destroy(); 
    res.redirect('/#!/home');
};

exports.login = function (req, res) {
    if(req.user == "Unknown user"){
        return res.json({status:"Not Exist"});
    }
    else if(req.user == "Invalid password"){
        return res.json({status:"Invalid Username and Password"});
    }
    else{
        User.get({email: req.body.email}, function(err, result) {
            if (!err) {
                req.session.admin = {
                    id: result._id,
                    email: result.email
                };
                return res.json(result);
            } else {
                return res.send(Boom.badImplementation(err));
            }
        });
    }
};



