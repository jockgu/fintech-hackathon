// Load required packages
var User = require('../models/user');

// POST /api/users/:user_id/viceevents
// Params: vice: "Beer"
exports.postViceEvent = function (req, res) {

    User.findOne({profileid: req.params.user_id})
            .populate('viceEvents')
            .exec(function (err, user) {
                
        if (err) {
            console.error(err);
            res.send(err);
        }

        var newVice = { 
            "vice": req.body.vice,
            "created_at": new Date()
        };        

        // {"vice": {"name": "Ferrari"}} 
        user.viceEvents.push(newVice);
        
        User.update({profileid: req.params.user_id}, user, function (err, num, raw) {

            if (err) {
                res.send(err);
            }

            res.json({
                message: num + ' updated'
            });
        });
        res.json(user);
    });
};

// GET /api/users/:user_id/viceevents
exports.getViceEvents = function (req, res) {

    User.find({profileid: req.params.user_id}, function (err, user) {
        if (err) {
            console.error(err);
            res.send(err);
        }
        res.json(user.viceEvents);
    });
};
