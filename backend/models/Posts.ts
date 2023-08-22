import { Sequelize, DataTypes } from "sequelize";

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  });
  return Posts;
};
