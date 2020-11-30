const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('answers.list', '/', async (ctx) => {
  const answer = await ctx.orm.answer.findOne({ where: { questionId: ctx.params.id_question } });
  const question = await ctx.orm.question.findByPk(ctx.params.id_question);
  await ctx.render('answers/index', {
    question,
    answer,
    newAnswerPath: ctx.router.url('answers.new', { id_question: ctx.params.id_question, id: ctx.params.id }),
    questionPath: ctx.router.url('questions.list', ctx.params.id),
    editAnswerPath: (answerFunction) => ctx.router.url('answers.edit', {
      id_answer: answerFunction.id, id_question: ctx.params.id_question, id: ctx.params.id,
    }),
    deleteAnswerPath: (answerFunction) => ctx.router.url('answers.delete', {
      id_answer: answerFunction.id, id_question: ctx.params.id_question, id: ctx.params.id,
    }),
  });
});

router.get('answers.new', '/new', async (ctx) => {
  let answer = await ctx.orm.answer.findOne({ where: { questionId: ctx.params.id_question } });
  if (!answer) {
    answer = ctx.orm.answer.build();
    const existeRespuesta = null;
    const question = await ctx.orm.question.findByPk(ctx.params.id_question);
    await ctx.render('answers/new', {
      existeRespuesta,
      answer,
      question,
      submitAnswerPath: ctx.router.url('answers.list', { id_question: ctx.params.id_question, id: ctx.params.id }),
    });
  } else {
    const existeRespuesta = true;
    const question = await ctx.orm.question.findByPk(ctx.params.id_question);
    await ctx.render('answers/new', {
      existeRespuesta,
      answer,
      question,
      submitAnswerPath: ctx.router.url('answers.list', { id_question: ctx.params.id_question, id: ctx.params.id }),
    });
  }
});

router.post('answers.create', '/', async (ctx) => {
  const answer = ctx.orm.answer.build(ctx.request.body);
  try {
    await answer.save({ fields: ['questionId', 'description', 'authorId'] });
    ctx.redirect(ctx.router.url('answers.list', { id_question: ctx.params.id_question, id: ctx.params.id }));
  } catch (validationError) {
    await ctx.render('answers.new', {
      answer,
      errors: validationError.errors,
      submitAnswerPath: ctx.router.url('answers.create', { id: ctx.params.id, id_question: ctx.params.id_question }),
    });
  }
});


router.get('answers.edit', '/:id_answer/edit', async (ctx) => {
  const answer = await ctx.orm.answer.findByPk(ctx.params.id_answer);
  await ctx.render('answers/edit', {
    answer,
    submitAnswerPath: ctx.router.url('answers.update', { id_answer: answer.id, id_question: ctx.params.id_question, id: ctx.params.id }),
  });
});

router.patch('answers.update', '/:id_answer', async (ctx) => {
  const answer = await ctx.orm.answer.findByPk(ctx.params.id_answer);
  try {
    const { description, checked, ruta } = ctx.request.body;
    await answer.update({ description, checked });
    if (ruta === 'adminpage') {
      ctx.redirect('/');
    } else {
      ctx.redirect(ctx.router.url('answers.list', { id_question: ctx.params.id_question, id: ctx.params.id }));
    }
  } catch (validationError) {
    await ctx.render('answers.new', {
      answer,
      errors: validationError.errors,
      submitAnswerPath: ctx.router.url('answers.update', { id_answer: answer.id, id_question: ctx.params.id_question, id: ctx.params.id }),
    });
  }
});

router.del('answers.delete', '/:id_answer', async (ctx) => {
  const answer = await ctx.orm.answer.findByPk(ctx.params.id_answer);
  await answer.destroy();
  ctx.redirect(ctx.router.url('answers.list', { id_question: ctx.params.id_question, id: ctx.params.id }));
});

module.exports = router;
