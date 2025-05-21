import { Sequelize } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

export const Comment = sequelize.define('Comment', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'posts',
            key: 'id',
        }
    },
}, {
    tableName: "comments",
});