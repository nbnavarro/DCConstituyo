const KoaRouter = require('koa-router');

const router = new KoaRouter();

const answers = require('./answer_constituents');

router.use('/constituent/:id_question/answers', answers.routes(), answers.allowedMethods());

router.get('question_constituents.new', '/constituent/new', async (ctx) => {
  if (ctx.state.userType === 'constituent') {
    const question = ctx.orm.question_constituent.build();
    const constituent = await ctx.orm.constituent.findByPk(ctx.params.id);
    const token = ctx.session.token && await ctx.orm.token.findOne({
      where: { content: ctx.session.token },
    });
    const idUser = token ? token.idUser : null;
    const userType = token ? token.userType : null;
    await ctx.render('questions/new', {
      question,
      constituent,
      idUser,
      userType,
      submitQuestionPath: ctx.router.url('question_constituents.create', ctx.params.id),
    });
  } else if (ctx.state.userType === 'admin' || ctx.state.userType === 'voter') {
    ctx.throw(403);
  } else {
    ctx.redirect(ctx.router.url('errors.401'));
  }
});

router.post('question_constituents.create', '/constituent', async (ctx) => {
  const question = ctx.orm.question_constituent.build(ctx.request.body);
  try {
    await question.save({ fields: ['constituentId', 'content', 'authorId'] });
    ctx.redirect(ctx.router.url('questions.list', ctx.params.id));
  } catch (validationError) {
    await ctx.render('questions.new', {
      question,
      errors: validationError.errors,
      submitQuestionPath: ctx.router.url('question_constituents.create', ctx.params.id),
    });
  }
});

router.get('question_constituents.edit', '/constituent/:id_question/edit', async (ctx) => {
  const question = await ctx.orm.question_constituent.findByPk(ctx.params.id_question);
  if (ctx.state.userType === null) {
    ctx.redirect(ctx.router.url('errors.401'));
  } else if (ctx.state.currentUser.id === question.authorId && ctx.state.userType === 'constituent') {
    const token = ctx.session.token && await ctx.orm.token.findOne({
      where: { content: ctx.session.token },
    });
    const idUser = token ? token.idUser : null;
    const userType = token ? token.userType : null;
    const questionType = 'constituent';
    await ctx.render('questions/edit', {
      question,
      idUser,
      userType,
      questionType,
      submitQuestionPath: ctx.router.url('question_constituents.update', { id_question: question.id, id: ctx.params.id }),
    });
  } else {
    ctx.throw(403);
  }
});

router.patch('question_constituents.update', '/constituent/:id_question', async (ctx) => {
  const question = await ctx.orm.question_constituent.findByPk(ctx.params.id_question);
  try {
    const { content, checked, ruta } = ctx.request.body;
    await question.update({ content, checked });
    if (ruta === 'adminpage') {
      ctx.redirect('/');
    } else {
      ctx.redirect(ctx.router.url('questions.list', ctx.params.id));
    }
  } catch (validationError) {
    await ctx.render('questions.new', {
      question,
      errors: validationError.errors,
      submitQuestionPath: ctx.router.url('question_constituents.update', { id_question: question.id, id: ctx.params.id }),
    });
  }
});

router.del('question_constituents.delete', '/constituent/:id_question', async (ctx) => {
  const question = await ctx.orm.question_constituent.findByPk(ctx.params.id_question);
  await question.destroy();
  ctx.redirect(ctx.router.url('questions.list', ctx.params.id));
});

module.exports = router;
