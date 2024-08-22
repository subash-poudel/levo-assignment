const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../utils/sequelizeUtil");

const Event = sequelize.define(
  "event",
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    participants: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cron: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "event",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Event;
