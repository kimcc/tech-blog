const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Get all posts
router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'user_id',
          'post_id',
          'comment_text',
          'created_at'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
   // Take each post and serialize it with get() so that it only has the info we need
   .then(dbPostData => {
    const posts = dbPostData.map(post => post.get({ plain: true }));

    res.render('homepage', {
      posts, 
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// Get single post
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'user_id',
          'post_id',
          'comment_text',
          'created_at'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  // Use express-session to see if loggedIn is true. If so, redirect them to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// Signup page 
router.get('/signup', (req, res) => {
  if(req.session.loggedIn) {
      res.redirect('/')
      return
  }
  res.render('signup');
})

module.exports = router;
