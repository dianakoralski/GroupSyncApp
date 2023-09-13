import { Sequelize, DataTypes } from "sequelize";
//Change data types later
//Add RSVPd boolean
module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: dataTypes.STRING,
    },
    time: {
      type: dataTypes.STRING,
    },
    description: {
      type: dataTypes.STRING,
      defaultValue:
        "There is no description for this event, please contact the host for further information",
    },

    isPublic: {
      type: dataTypes.BOOLEAN,
      defaultValue: true,
    },
    hostId: {
      type: DataTypes.INTEGER,
      //allowNull: false,
      defaultValue: 0,
      references: {
        model: "Users", // Make sure this matches your Users model name
        key: "id",
      },
    },
  });
  return Posts;
};
