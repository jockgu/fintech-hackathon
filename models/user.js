// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var ViceSchema = new mongoose.Schema({
    name: { type: String }
});

var ViceEventSchema = new mongoose.Schema({
    vice: ViceSchema,
    created_at: { type: Date }
});

ViceEventSchema.pre('save', function(next){
  now = new Date();
  this.created_at = now;
  next();
});

var UserMetric = new mongoose.Schema({
  name: {
    type: String
  },
  value: {
    type: Number
  }
});

// Define our user schema
var UserSchema = new mongoose.Schema({
  profileid: {
    type: String,
    unique: true,
    required: true
  },
  metrics: [UserMetric],
  vices: [ViceSchema],
  viceEvents: [ViceEventSchema]
}, { collection: 'userinfo' });

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);