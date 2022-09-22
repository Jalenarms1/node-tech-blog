// Place script code for models here
const Blog = require("./Blog");
const User = require("./User");
const Comment = require("./Comment");

User.hasMany(Blog, {
    foreignKey: 'blogger_id'
})

Blog.belongsTo(User, {
    foreignKey: 'blogger_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Blog.hasMany(Comment, {
    foreignKey: 'blog_id'
})

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
})

module.exports = { User, Blog, Comment };