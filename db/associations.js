import { User } from '../models/user.js';
import { Board } from '../models/board.js';
import { Post } from '../models/post.js';
import { Comment } from '../models/comment.js';

// Definir asociaciones
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Board.hasMany(Post, { foreignKey: 'boardId', as: 'posts' });
Post.belongsTo(Board, { foreignKey: 'boardId', as: 'board' });

Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
