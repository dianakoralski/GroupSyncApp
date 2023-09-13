import { Sequelize, DataTypes } from "sequelize";

module.exports = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  const EventParticipants = sequelize.define(
    "EventParticipants",
    {
      eventId: {
        type: dataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Posts", // Replace with the actual table name for events
          key: "id", // Replace with the actual primary key name for events
        },
      },
      participantId: {
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
          fields: ["eventId", "participantId"],
        },
      ],
    }
  );

  return EventParticipants;
};
