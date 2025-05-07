import {Post} from '../models/post.js';

router.get('/posts', async (req, res) => {
    const posts = await Post.findAll();
    res.render('posts', {
        title: 'Posts',
        desc: 'Aquí puedes ver tus posts',
        posts,
    });
});

router.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    await Post.create({title,content,});
    res.redirect('/posts');
});