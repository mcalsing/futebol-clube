import { Model, DataTypes } from 'sequelize';
import db from '.';
import Team from './TeamModel';

export default class Match extends Model {
  declare id: number;
  declare homeTeamId: string;
  declare homeTeamGoals: number;
  declare awayTeamId: string;
  declare awayTeamGoals: number;
  declare inProgress: string;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: 'matches',
  sequelize: db,
  modelName: 'match',
  underscored: true,
  timestamps: false,
});

Match.belongsTo(Team, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

Match.belongsTo(Team, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

Team.hasMany(Match, {
  foreignKey: 'homeTeamId',
  as: 'matchesHome',
});

Team.hasMany(Match, {
  foreignKey: 'awayTeamId',
  as: 'matchesAway',
});
