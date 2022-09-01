'use strict';

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
    },
    published: {
        type: DataTypes.DATE,
      },
      updated: {
        type: DataTypes.DATE,
      },
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: "id",
      as: "userId",
    });
  };

  return BlogPost;
};
