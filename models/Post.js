const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Post extends Model {}

Post.init(
  {
    // With relationship defined in index.js, primary key (id) will be created automatically at runtime
    title: DataTypes.STRING,
    body: DataTypes.STRING
    // With relationship defined in index.js, foreign keys will be automatically created at runtime

  },
  {
    sequelize,
    // timestamps: false,
    freezeTableName: true,
    underscored: true
  }
);

module.exports = Post;
