// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
import Sequelize, { NumberDataTypeOptions } from 'sequelize';
import { Application } from '../declarations';
const DataTypes = Sequelize.DataTypes;

export const fields = {
  group_id: {
    type: DataTypes.INTEGER(11 as NumberDataTypeOptions),
    allowNull: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gate: {
    type: 'json',
    allowNull: true
  },
  unlocked: {
    type: 'json',
    allowNull: true
  },
  world: {
    type: 'json',
    allowNull: true
    /**
     * {
     *  planet: string,
     *  pos: { x, y },
     *  map: []
     * }
     * 
     */
  },
}

export default function(app: Application) {
  const sequelizeClient = app.get('sequelizeClient');
  const user = sequelizeClient.define('user', fields, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  user.associate = function (models) {
    user.belongsTo(models.group, { foreignKey: 'group_id', targetKey: 'id' } );
    //user.hasMany(models.message);
  };

  return user;
};

export function canAccess( user, target ) {
  if (user.id === target.id) return true;
  const unlocked = user.unlocked || [];
  return unlocked.filter( (u) => u.target === target.id ).length > 0;
}

export function canEdit( user, target ) {
  return (user.id === target.id);
}
