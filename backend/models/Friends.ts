import { Sequelize, DataTypes } from "sequelize";

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const Friends = sequelize.define(
    "Friends",
    {
      myId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Replace with the actual table name for events
          key: "id", // Replace with the actual primary key name for events
        },
      },
      friendId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Replace with the actual table name for participants
          key: "id", // Replace with the actual primary key name for participants
        },
      },
    },
    {
      // Define a composite primary key with both columns using indexes
      indexes: [
        {
          unique: true, // Ensure uniqueness for the combination
          fields: ["myId", "friendId"],
        },
      ],
    }
  );

  return Friends;
};
