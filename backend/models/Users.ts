import { Sequelize, DataTypes } from "sequelize";

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const Users = sequelize.define("Users", {
    firstName: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: dataTypes.STRING,
      allowNull: true,
    },
  });
  return Users;
};
