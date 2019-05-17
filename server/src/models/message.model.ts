import Sequelize, { NumberDataTypeOptions } from 'sequelize';
const DataTypes = Sequelize.DataTypes;

export const fields = {
  user_id: {
    type: DataTypes.INTEGER(11 as NumberDataTypeOptions),
    allowNull: true
  },
  target_id: {
    type: DataTypes.INTEGER(11 as NumberDataTypeOptions),
    allowNull: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: 'json',
    allowNull: false
  },
}

export default function(app) {
  const sequelizeClient = app.get("sequelizeClient");
  const message = sequelizeClient.define("message", fields,
    {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      },
      underscored: true
    }
  );

  // eslint-disable-next-line no-unused-vars
  message.associate = function(models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    message.belongsTo(models.user, { foreignKey: 'user_id', targetKey: 'id' } );
  };

  return message;
}
