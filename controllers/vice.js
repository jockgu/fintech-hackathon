// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
/*
exports.postVices = function(req, res) {

    user = {};

    var vices = req.body.vices;
    
    console.log('POST /api/users/' + req.params.user_id + '/vices req.body: ');
    console.log(req.body);

    user.vices = vices.replace(/\s/g, '').split(",").map(function(vice) {
        return {
            "name": vice
        };
    });   

    User.update({
        profileid: req.params.user_id
    }, user, function(err, num, raw) {

        if (err) {
            res.send(err);
        }

        res.json({
            message: num + ' updated'
        });
    });

};
*/

exports.postVices = function(req, res) {

    user = {};
    user.vices = [];

    console.log(req.body);

    var vices = req.body.vices;

    for(var i = 0; i<vices.length; i++) {
        user.vices.push({'name': vices[i]});
    };

    User.update({
        profileid: req.params.user_id
    }, user, function(err, num, raw) {

        if (err) {
            res.send(err);
        }

        res.json({
            message: num + ' updated'
        });
    });

};