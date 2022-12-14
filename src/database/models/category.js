'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  Category.associate = (models) => {
    Category.hasMany(models.PostCategory, {
      foreignKey: "categoryId",
      as: "category",
    });
  };

  return Category;
};
