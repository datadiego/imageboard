import { Sequelize } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

export const Board = sequelize.define('Board', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: "boards",
});