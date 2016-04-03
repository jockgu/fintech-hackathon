// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.getUserMetric = function(req, res) {
  User.findOne({profileid: req.params.user_id })
      .populate('metrics')
      .exec(function(err, content) {
        res.json(content.metrics);
      });
};

exports.getUserMetricScore = function(req, res) {
  User.findOne({profileid: req.params.user_id })
      .populate('metrics')
      .exec(function(err, content) {
        var total = 0;

        for(var i = 0; i<content.metrics.length; i++) {
          total = total + content.metrics[i].value;
        }

        res.json({score: total});
      });
};


var checkExists = function(key, obj) {
  for(var i = 0; i<obj.length; i++) {
    if(obj[i]['name'] == key) {
      return true;
    }
  }

  return false;
};

exports.postUserMetric = function(req, res) {

  User.findOne({profileid: req.params.user_id })
      .populate('metrics')
      .exec(function(err, content) {

        if (err) {
          res.send(err);
        }

        var user = {};
        user.metrics = [];

        if(content.metrics) {
          user.metrics = content.metrics;
        }

        for(var i = 0; i<req.body.metrics.length; i++) {
          if(checkExists(req.body.metrics[i].name, user.metrics)) {
            user.metrics[i].value = req.body.metrics[i].value;
          } else {
            user.metrics.push({
              'name': req.body.metrics[i].name,
              'value': req.body.metrics[i].value
            });
          }
        }

        User.update({ profileid: req.params.user_id }, user, 
          function(err, num, raw) {
            if (err) {
              res.send(err);
            }    
            res.json({ message: num + ' updated' });
        });  
    });    
}