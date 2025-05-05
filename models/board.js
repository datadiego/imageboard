import { Sequelize } from 'sequelize';
import {sequelize } from '../db/sequelize.js';

export const Board = sequelize.define('Board', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'boards',
})