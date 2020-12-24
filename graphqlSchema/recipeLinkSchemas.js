var RecipeLinkModel = require('../models/recipeLinks');
var TagsModel = require('../models/tag');
const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema
} = require('graphql')

const RecipeLinkType = new GraphQLObjectType({
  name: 'RecipeLink',
  fields: {
    _id: { type: GraphQLString },
    url: { type: GraphQLString },
    owner: { type: GraphQLString },
    logo: { type: GraphQLString },
    description: { type: GraphQLString },
    title: { type: GraphQLString },
    recipe_image: { type: GraphQLString }
  }
});

const TagsType = new  GraphQLObjectType({
  name: 'Tag',
  fields: {
    _id: { type: GraphQLString },
    tag: { type: GraphQLString },
    recipes: { type: GraphQLList }
  }
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function() {
    return  {
      recipes: {
        type: new GraphQLList(RecipeLinkType),
        resolve: async function() {
          const recipes = await RecipeLinkModel.find().exec();
          if (!recipes) {
            throw new Error('Error')
          }
          return recipes;
        }
      },
      recipe: {
        type: RecipeLinkType,
        args: {
          id: {
            type: GraphQLString
          }
    
        },
        resolve: async function (root, params) {
          const recipeDetails = await RecipeLinkModel.findById(params.id).exec()
          if (!recipeDetails) {
            throw new Error('Error')
          }
          return recipeDetails
        }
      },
      recipeByTag: {
        type: new GraphQLList(RecipeLinkType),
        args: {
          tag: {
            type: GraphQLString
          }
        },
        resolve: async  function(root, params) {
          const recipeIdsByTags = await TagsModel.find({'tag':params.tag}).exec();
          let recipes = [];
          if (recipeIdsByTags.length) {
            const linkIds = recipeIdsByTags[0].recipes.map(function(l){
                return l
            });
            recipes = RecipeLinkModel.find({_id: {$in: linkIds}}).exec();
          } else {
            throw new Error('Error')
          }
          return recipes;
        }
      }

    }
  }
})

module.exports = new GraphQLSchema({query: queryType});
