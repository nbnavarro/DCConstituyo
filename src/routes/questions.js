/* eslint no-await-in-loop : "off" */
/* eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }] */
/* eslint no-restricted-syntax: [0, "ForOfStatement"] */

const KoaRouter = require('koa-router');

const router = new KoaRouter();

const answers = require('./answers');

router.use('/voter/:id_question/answers', answers.routes(), answers.allowedMethods());

router.get('questions.list', '/', async (ctx) => {
  const questionsList = await ctx.orm.question.findAll({
    where: { constituentId: ctx.params.id },
  });
  const constituentQuestionsList = await ctx.orm.question_constituent.findAll({
    where: { constituentId: ctx.params.id },
  });
  const preguntasRespondidas = {};
  const preguntasRespondidasConstituents = {};
  const questionVoter = [];
  const questionConstituentList = [];

  for (const question of questionsList) {
    const respuesta = await question.getAnswer();
    const unVoter = await ctx.orm.voter.findByPk(question.authorId);
    if (respuesta !== null) {
      preguntasRespondidas[respuesta.questionId] = respuesta;
    }

    questionVoter.push([question, unVoter]);
  }
  /* eslint-disable camelcase */
  for (const question_constituent of constituentQuestionsList) {
    const respuesta = await question_constituent.getAnswer_constituent();
    const unConstituent = await ctx.orm.constituent.findByPk(question_constituent.authorId);
    if (respuesta !== null) {
      preguntasRespondidasConstituents[respuesta.questionId] = respuesta;
    }
    questionConstituentList.push([question_constituent, unConstituent]);
  }
  /* eslint-enable camelcase */


  const token = ctx.session.token && await ctx.orm.token.findOne({
    where: { content: ctx.session.token },
  });
  const idUser = token ? token.idUser : null;
  const userType = token ? token.userType : null;
  const constituent = await ctx.orm.constituent.findByPk(ctx.params.id);
  await ctx.render('questions/index', {
    preguntasRespondidas,
    preguntasRespondidasConstituents,
    constituent,
    idUser,
    userType,
    questionVoter,
    questionConstituentList,
    constituentPath: ctx.router.url('constituents.profile', ctx.params.id),

    newQuestionPath: ctx.router.url('questions.new', ctx.params.id),
    newConstituentQuestionPath: ctx.router.url('question_constituents.new', ctx.params.id),

    profileVoterPath: (voter) => ctx.router.url('voters.profile', { id: voter.id }),
    profileConstituentPath: (constituentFunction) => ctx.router.url('constituents.profile', { id: constituentFunction.id }),

    editQuestionPath: (question) => ctx.router.url('questions.edit', { id_question: question.id, id: ctx.params.id }),
    editQuestionConstituentPath: (question) => ctx.router.url('question_constituents.edit', { id_question: question.id, id: ctx.params.id }),
    deleteQuestionPath: (question) => ctx.router.url('questions.delete', { id_question: question.id, id: ctx.params.id }),
    deleteQuestionConstituentPath: (question) => ctx.router.url('question_constituents.delete', { id_question: question.id, id: ctx.params.id }),
    answersPath: (question) => ctx.router.url('answers.list', { id_question: question.id, id: ctx.params.id }),
    answersConstituentPath: (question) => ctx.router.url('answer_constituents.list', { id_question: question.id, id: ctx.params.id }),
  });
});

router.get('questions.new', '/voter/new', async (ctx) => {
  if (ctx.state.userType === 'voter') {
    const question = ctx.orm.question.build();
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
      submitQuestionPath: ctx.router.url('questions.create', ctx.params.id),
    });
  } else if (ctx.state.userType === 'admin' || ctx.state.userType === 'constituent') {
    ctx.throw(403);
  } else {
    ctx.redirect(ctx.router.url('errors.401'));
  }
});

router.post('questions.create', '/voter', async (ctx) => {
  const question = ctx.orm.question.build(ctx.request.body);
  try {
    await question.save({ fields: ['constituentId', 'content', 'authorId'] });
    ctx.redirect(ctx.router.url('questions.list', ctx.params.id));
  } catch (validationError) {
    await ctx.render('questions.new', {
      question,
      errors: validationError.errors,
      submitQuestionPath: ctx.router.url('questions.create', ctx.params.id),
    });
  }
});

router.get('questions.edit', '/voter/:id_question/edit', async (ctx) => {
  const question = await ctx.orm.question.findByPk(ctx.params.id_question);
  if (ctx.state.userType === null) {
    ctx.redirect(ctx.router.url('errors.401'));
  } else if (ctx.state.currentUser.id === question.authorId && ctx.state.userType === 'voter') {
    const token = ctx.session.token && await ctx.orm.token.findOne({
      where: { content: ctx.session.token },
    });
    const idUser = token ? token.idUser : null;
    const userType = token ? token.userType : null;

    const questionType = 'voter';
    await ctx.render('questions/edit', {
      question,
      idUser,
      userType,
      questionType,
      submitQuestionPath: ctx.router.url('questions.update', { id_question: question.id, id: ctx.params.id }),
    });
  } else {
    ctx.throw(403);
  }
});

router.patch('questions.update', '/voter/:id_question', async (ctx) => {
  const question = await ctx.orm.question.findByPk(ctx.params.id_question);
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
      submitQuestionPath: ctx.router.url('questions.update', { id_question: question.id, id: ctx.params.id }),
    });
  }
});

router.del('questions.delete', '/voter/:id_question', async (ctx) => {
  const question = await ctx.orm.question.findByPk(ctx.params.id_question);
  await question.destroy();
  ctx.redirect(ctx.router.url('questions.list', ctx.params.id));
});

module.exports = router;
