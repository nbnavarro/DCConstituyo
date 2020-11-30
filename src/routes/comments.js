/* eslint no-await-in-loop : "off" */
/* eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }] */
/* eslint no-restricted-syntax: [0, "ForOfStatement"] */

const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('comments.list', '/', async (ctx) => {
  const commentsList = await ctx.orm.comment.findAll({ where: { postId: ctx.params.id_post } });
  const commentConstituentsList = await ctx.orm.comment_constituent.findAll({
    where: { postId: ctx.params.id_post },
  });
  const post = await ctx.orm.post.findByPk(ctx.params.id_post);
  const duenoPost = await ctx.orm.constituent.findByPk(post.constituentId);

  const commentVoter = [];
  for (const comment of commentsList) {
    const voter = await ctx.orm.voter.findByPk(comment.authorCommentId);
    commentVoter.push([comment, voter]);
  }

  const commentConstituentList = [];
  for (const comment of commentConstituentsList) {
    const constituent = await ctx.orm.constituent.findByPk(comment.authorCommentId);
    commentConstituentList.push([comment, constituent]);
  }

  await ctx.render('comments/index', {
    commentVoter,
    commentConstituentList,
    post,
    duenoPost,
    postPath: ctx.router.url('posts.list', ctx.params.id),
    newCommentPath: ctx.router.url('comments.new', { id_post: ctx.params.id_post, id: ctx.params.id }),
    newCommentConstituentPath: ctx.router.url('comment_constituents.new', { id_post: ctx.params.id_post, id: ctx.params.id }),
    editCommentPath: (comment) => ctx.router.url('comments.edit', { id_comment: comment.id, id_post: ctx.params.id_post, id: ctx.params.id }),
    editCommentConstituentPath: (comment) => ctx.router.url('comment_constituents.edit', { id_comment: comment.id, id_post: ctx.params.id_post, id: ctx.params.id }),
    deleteCommentPath: (comment) => ctx.router.url('comments.delete', { id_comment: comment.id, id_post: ctx.params.id_post, id: ctx.params.id }),
    deleteCommentConstituentPath: (comment) => ctx.router.url('comment_constituents.delete', { id_comment: comment.id, id_post: ctx.params.id_post, id: ctx.params.id }),
    profilePath: (voter) => ctx.router.url('voters.profile', { id: voter.id }),
    profileConstituentPath: (constituentFunction) => ctx.router.url('constituents.profile', { id: constituentFunction.id }),
  });
});

router.get('comments.new', '/new', async (ctx) => {
  const comment = ctx.orm.comment.build();
  const post = await ctx.orm.post.findByPk(ctx.params.id_post);
  await ctx.render('comments/new', {
    comment,
    post,
    submitCommentPath: ctx.router.url('comments.create', { id_post: ctx.params.id_post, id: ctx.params.id }),
  });
});

router.post('comments.create', '/', async (ctx) => {
  const comment = ctx.orm.comment.build(ctx.request.body);
  try {
    await comment.save({ fields: ['postId', 'content', 'authorCommentId'] });
    ctx.redirect(ctx.router.url('comments.list', { id_post: ctx.params.id_post, id: ctx.params.id }));
  } catch (validationError) {
    await ctx.render('comments.new', {
      comment,
      errors: validationError.errors,
      submitCommentPath: ctx.router.url('comments.create', { id: ctx.params.id, id_post: ctx.params.id_post }),
    });
  }
});

router.get('comments.edit', '/:id_comment/edit', async (ctx) => {
  const comment = await ctx.orm.comment.findByPk(ctx.params.id_comment);
  const commentType = 'voter';
  await ctx.render('comments/edit', {
    comment,
    commentType,
    submitCommentPath: ctx.router.url('comments.update', { id_comment: comment.id, id_post: ctx.params.id_post, id: ctx.params.id }),
  });
});

router.patch('comments.update', '/:id_comment', async (ctx) => {
  const comment = await ctx.orm.comment.findByPk(ctx.params.id_comment);
  try {
    const { content, checked, ruta } = ctx.request.body;
    await comment.update({ content, checked });
    if (ruta === 'adminpage') {
      ctx.redirect('/');
    } else {
      ctx.redirect(ctx.router.url('comments.list', { id_post: ctx.params.id_post, id: ctx.params.id }));
    }
  } catch (validationError) {
    await ctx.render('comments.new', {
      comment,
      errors: validationError.errors,
      submitCommentPath: ctx.router.url('comments.update', { id_comment: comment.id, id_post: ctx.params.id_post, id: ctx.params.id }),
    });
  }
});

router.del('comments.delete', '/:id_comment', async (ctx) => {
  const comment = await ctx.orm.comment.findByPk(ctx.params.id_comment);
  await comment.destroy();
  ctx.redirect(ctx.router.url('comments.list', { id_post: ctx.params.id_post, id: ctx.params.id }));
});

module.exports = router;
