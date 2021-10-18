// Import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

// Create associations
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE' // Will delete the child data (comment) when the parent data (post) is deleted
});

module.exports = { User, Post, Comment };
