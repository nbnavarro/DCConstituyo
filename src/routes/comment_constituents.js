const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('comment_constituents.new', '/constituent/new', async (ctx) => {
  const comment = ctx.orm.comment_constituent.build();
  const post = await ctx.orm.post.findByPk(ctx.params.id_post);
  await ctx.render('comments/new', {
    comment,
    post,
    submitCommentPath: ctx.router.url('comment_constituents.create', { id_post: ctx.params.id_post, id: ctx.params.id }),
  });
});

router.post('comment_constituents.create', '/constituent', async (ctx) => {
  const comment = ctx.orm.comment_constituent.build(ctx.request.body);
  try {
    await comment.save({ fields: ['postId', 'content', 'authorCommentId'] });
    ctx.redirect(ctx.router.url('comments.list', { id_post: ctx.params.id_post, id: ctx.params.id }));
  } catch (validationError) {
    await ctx.render('comment_constituents.new', {
      comment,
      errors: validationError.errors,
      submitCommentPath: ctx.router.url('comment_constituents.create', { id: ctx.params.id, id_post: ctx.params.id_post }),
    });
  }
});

router.get('comment_constituents.edit', '/constituent/:id_comment/edit', async (ctx) => {
  const comment = await ctx.orm.comment_constituent.findByPk(ctx.params.id_comment);
  const commentType = 'constituent';
  await ctx.render('comments/edit', {
    comment,
    commentType,
    submitCommentPath: ctx.router.url('comment_constituents.update', { id_comment: comment.id, id_post: ctx.params.id_post, id: ctx.params.id }),
  });
});

router.patch('comment_constituents.update', '/constituent/:id_comment', async (ctx) => {
  const comment = await ctx.orm.comment_constituent.findByPk(ctx.params.id_comment);
  try {
    const { content, checked, ruta } = ctx.request.body;
    await comment.update({ content, checked });
    if (ruta === 'adminpage') {
      ctx.redirect('/');
    } else {
      ctx.redirect(ctx.router.url('comments.list', { id_post: ctx.params.id_post, id: ctx.params.id }));
    }
  } catch (validationError) {
    await ctx.render('comment_constituents.new', {
      comment,
      errors: validationError.errors,
      submitCommentPath: ctx.router.url('comment_constituents.update', { id_comment: comment.id, id_post: ctx.params.id_post, id: ctx.params.id }),
    });
  }
});

router.del('comment_constituents.delete', '/constituent/:id_comment', async (ctx) => {
  const comment = await ctx.orm.comment_constituent.findByPk(ctx.params.id_comment);
  await comment.destroy();
  ctx.redirect(ctx.router.url('comments.list', { id_post: ctx.params.id_post, id: ctx.params.id }));
});

module.exports = router;
