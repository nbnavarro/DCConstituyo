/* eslint no-await-in-loop : "off" */
/* eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }] */
/* eslint no-restricted-syntax: [0, "ForOfStatement"] */

const KoaRouter = require('koa-router');

const router = new KoaRouter();

const comments = require('./comments');
const commentConstituents = require('./comment_constituents');

router.use('/:id_post/comments', comments.routes(), comments.allowedMethods());
router.use('/:id_post/comments', commentConstituents.routes(), commentConstituents.allowedMethods());

router.get('posts.list', '/', async (ctx) => {
  const postsList = await ctx.orm.post.findAll({ where: { constituentId: ctx.params.id } });
  const constituent = await ctx.orm.constituent.findByPk(ctx.params.id);
  const token = ctx.session.token && await ctx.orm.token.findOne({
    where: { content: ctx.session.token },
  });
  const idUser = token ? token.idUser : null;
  const userType = token ? token.userType : null;


  const postsWithComments = [];
  for (const post of postsList) {
    const commentAuthorType = []; // [['que buen post', 'Juana', 'voter'], [], ...]
    const voterComments = await post.getComments();
    for (const comment of voterComments) {
      const author = await ctx.orm.voter.findByPk(comment.authorCommentId);
      commentAuthorType.push([comment, author, 'voter']);
    }
    const constituentComments = await post.getComment_constituents();
    for (const comment of constituentComments) {
      const author = await ctx.orm.constituent.findByPk(comment.authorCommentId);
      commentAuthorType.push([comment, author, 'constituent']);
    }
    postsWithComments.push([post, commentAuthorType]);
  }


  await ctx.render('posts/index', {
    postsList,
    postsWithComments,
    constituent,
    idUser,
    userType,
    constituentPath: ctx.router.url('constituents.profile', ctx.params.id),
    newPostPath: ctx.router.url('posts.new', ctx.params.id),
    editPostPath: (post) => ctx.router.url('posts.edit', { id_post: post.id, id: ctx.params.id }),
    deletePostPath: (post) => ctx.router.url('posts.delete', { id_post: post.id, id: ctx.params.id }),
    commentsPath: (post) => ctx.router.url('comments.list', { id_post: post.id, id: ctx.params.id }),

    newCommentPath: (post) => ctx.router.url('comments.new', { id_post: post.id, id: ctx.params.id }),
    newCommentConstituentPath: (post) => ctx.router.url('comment_constituents.new', { id_post: post.id, id: ctx.params.id }),
    editCommentPath: (post, comment) => ctx.router.url('comments.edit', { id_comment: comment.id, id_post: post.id, id: ctx.params.id }),
    editCommentConstituentPath: (post, comment) => ctx.router.url('comment_constituents.edit', { id_comment: comment.id, id_post: post.id, id: ctx.params.id }),
    deleteCommentPath: (post, comment) => ctx.router.url('comments.delete', { id_comment: comment.id, id_post: post.id, id: ctx.params.id }),
    deleteCommentConstituentPath: (post, comment) => ctx.router.url('comment_constituents.delete', { id_comment: comment.id, id_post: post.id, id: ctx.params.id }),
    profilePath: (voter) => ctx.router.url('voters.profile', { id: voter.id }),
    profileConstituentPath: (constituentFunction) => ctx.router.url('constituents.profile', { id: constituentFunction.id }),
  });
});

router.get('posts.new', '/new', async (ctx) => {
  const post = ctx.orm.post.build();
  const constituent = await ctx.orm.constituent.findByPk(ctx.params.id);
  const token = ctx.session.token && await ctx.orm.token.findOne({
    where: { content: ctx.session.token },
  });
  const idUser = token ? token.idUser : null;
  const userType = token ? token.userType : null;
  await ctx.render('posts/new', {
    post,
    constituent,
    idUser,
    userType,
    submitPostPath: ctx.router.url('posts.create', ctx.params.id),
  });
});

router.post('posts.create', '/', async (ctx) => {
  const post = ctx.orm.post.build(ctx.request.body);
  try {
    await post.save({ fields: ['constituentId', 'content'] });
    ctx.redirect(ctx.router.url('posts.list', ctx.params.id));
  } catch (validationError) {
    await ctx.render('posts.new', {
      post,
      errors: validationError.errors,
      submitPostPath: ctx.router.url('posts.create', ctx.params.id),
    });
  }
});

router.get('posts.edit', '/:id_post/edit', async (ctx) => {
  const post = await ctx.orm.post.findByPk(ctx.params.id_post);
  const constituent = await ctx.orm.constituent.findByPk(ctx.params.id);
  const token = ctx.session.token && await ctx.orm.token.findOne({
    where: { content: ctx.session.token },
  });
  const idUser = token ? token.idUser : null;
  const userType = token ? token.userType : null;
  await ctx.render('posts/edit', {
    post,
    constituent,
    idUser,
    userType,
    submitPostPath: ctx.router.url('posts.update', { id_post: post.id, id: ctx.params.id }),
  });
});

router.patch('posts.update', '/:id_post', async (ctx) => {
  const post = await ctx.orm.post.findByPk(ctx.params.id_post);
  try {
    const { content, checked, ruta } = ctx.request.body;
    await post.update({ content, checked });
    if (ruta === 'adminpage') {
      ctx.redirect('/');
    } else {
      ctx.redirect(ctx.router.url('posts.list', ctx.params.id));
    }
  } catch (validationError) {
    await ctx.render('posts.new', {
      post,
      errors: validationError.errors,
      submitPostPath: ctx.router.url('posts.update', { id_post: post.id, id: ctx.params.id }),
    });
  }
});

router.del('posts.delete', '/:id_post', async (ctx) => {
  const post = await ctx.orm.post.findByPk(ctx.params.id_post);
  await post.destroy();
  ctx.redirect(ctx.router.url('posts.list', ctx.params.id));
});

module.exports = router;
