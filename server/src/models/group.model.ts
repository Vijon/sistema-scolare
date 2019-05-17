// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize, { NumberDataTypeOptions } from 'sequelize';
const DataTypes = Sequelize.DataTypes;

export const fields = {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: 'json',
    allowNull: true
  },
}

export default function(app) {
  const sequelizeClient = app.get('sequelizeClient');
  const group = sequelizeClient.define('group', fields, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  return group;
};