const mongoose = require('mongoose');

var RecipeLinkSchema = new mongoose.Schema({
  id: String,
  url: String,
  owner: String,
  logo: String,
  description: String,
  title: String,
  recipe_image: String
});

module.exports = mongoose.model('RecipeLink', RecipeLinkSchema,'recipe_links');