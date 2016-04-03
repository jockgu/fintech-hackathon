// Load required packages
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {

  console.log(req.body.profileid);

  var user = new User({
    profileid: req.body.profileid,
    vices: [],
    viceEvents: []
  });

  user.save(function(err) {

    if (err) {
      console.log(err);
      res.send(err);
    }

    res.json({ message: 'New savegen user added.' });
  });
};

// Create endpoint /api/content/:content_id for DELETE
exports.deleteUser = function(req, res) {
  User.remove({ _id: req.params.user_id }, function(err) {
    
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Savegen user removed.' });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

// Create endpoint /api/user for GET
exports.getUser = function(req, res) {
  User.find({profileid: req.params.user_id }, function(err, content) {
    if (err)
      res.send(err);

    res.json(content);
  });
};