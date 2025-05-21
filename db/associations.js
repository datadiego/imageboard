import { User } from '../models/user.js';
import { Board } from '../models/board.js';
import { Post } from '../models/post.js';
import { Comment } from '../models/comment.js';

// Asociaciones existentes
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Board.hasMany(Post, { foreignKey: 'boardId', as: 'posts' });
Post.belongsTo(Board, { foreignKey: 'boardId', as: 'board' });

// NUEVAS ASOCIACIONES PARA COMENTARIOS
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });

User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });