const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        blogId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'blog',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        model: 'comments'
    }
)

module.exports = {
    Comment
};