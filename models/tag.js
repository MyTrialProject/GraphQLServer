const mongoose = require('mongoose');

var TagsSchema = new mongoose.Schema({
  tag: String,
  recipes: Array
});

module.exports = mongoose.model('Tags', TagsSchema,'tags');