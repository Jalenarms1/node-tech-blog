// Place script code for models here
const { Blog } = require("./Blog");
const { User } = require("./User");
const { Comment } = require("./Comment");

User.hasMany(Blog, {
    foreignKey: 'blogger_id'
})

Blog.belongsTo(User, {
    foreignKey: 'blogger_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Blog, {
    foreignKey: 'blog_id'
})






module.exports = { User, Blog, Comment };