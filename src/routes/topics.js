/* eslint no-await-in-loop : "off" */
/* eslint no-restricted-syntax: [0, "ForOfStatement"] */

const KoaRouter = require('koa-router');

const router = new KoaRouter();

const stances = require('./stances');

router.use('/:id/stances', stances.routes(), stances.allowedMethods());

router.get('topics.list', '/', async (ctx) => {
  const topicsList = await ctx.orm.topic.findAll();

  const topicWithStances = [];
  for (const topic of topicsList) {
    const stancesOfTopic = await topic.getStances();

    const stanceConst = [];
    let sigoAlguna = false;
    for (const unaStance of stancesOfTopic) {
      if (ctx.state.currentUser && ctx.state.userType === 'constituent') {
        const laSigo = await ctx.state.currentUser.hasStance(unaStance);
        if (laSigo) {
          sigoAlguna = true;
        }
        stanceConst.push([unaStance, laSigo]);
      } else {
        stanceConst.push([unaStance, false]);
      }
    }

    topicWithStances.push([topic, stanceConst, sigoAlguna]);
  }

  await ctx.render('topics/index', {
    topicsList,
    topicWithStances,
    newTopicPath: ctx.router.url('topics.new'),
    editTopicPath: (topic) => ctx.router.url('topics.edit', { id: topic.id }),
    deleteTopicPath: (topic) => ctx.router.url('topics.delete', { id: topic.id }),
    profileTopicPath: (topic) => ctx.router.url('topics.profile', { id: topic.id }),
    stancesPath: (topic) => ctx.router.url('stances.list', { id: topic.id }),

    newStancePath: (topic) => ctx.router.url('stances.new', topic.id),
    newConstituentStancesPath: ctx.router.url('constituent_stances.create'),
    deleteConstituentStancesPath: ctx.router.url('constituent_stances.delete'),
    editStancePath: (topic, stance) => ctx.router.url('stances.edit', { id_stance: stance.id, id: topic.id }),
    deleteStancePath: (topic, stance) => ctx.router.url('stances.delete', { id_stance: stance.id, id: topic.id }),

  });
});

router.get('topics.new', '/new', async (ctx) => {
  const topic = ctx.orm.topic.build();
  await ctx.render('topics/new', {
    topic,
    submitTopicPath: ctx.router.url('topics.create'),
  });
});

router.post('topics.create', '/', async (ctx) => {
  const topic = ctx.orm.topic.build(ctx.request.body);
  try {
    await topic.save({ fields: ['name', 'description'] });
    ctx.redirect(ctx.router.url('topics.list'));
  } catch (validationError) {
    await ctx.render('topics.new', {
      topic,
      errors: validationError.errors,
      submitTopicPath: ctx.router.url('topics.create'),
    });
  }
});

router.get('topics.edit', '/:id/edit', async (ctx) => {
  const topic = await ctx.orm.topic.findByPk(ctx.params.id);
  await ctx.render('topics/edit', {
    topic,
    submitTopicPath: ctx.router.url('topics.update', { id: topic.id }),
  });
});

router.patch('topics.update', '/:id', async (ctx) => {
  const topic = await ctx.orm.topic.findByPk(ctx.params.id);
  try {
    const { name, description } = ctx.request.body;
    await topic.update({ name, description });
    ctx.redirect(ctx.router.url('topics.list'));
  } catch (validationError) {
    await ctx.render('topics.new', {
      topic,
      errors: validationError.errors,
      submitTopicPath: ctx.router.url('topics.update', { id: topic.id }),
    });
  }
});

router.del('topics.delete', '/:id', async (ctx) => {
  const topic = await ctx.orm.topic.findByPk(ctx.params.id);
  await topic.destroy();
  ctx.redirect(ctx.router.url('topics.list'));
});

router.get('topics.profile', '/:id', async (ctx) => {
  const topic = await ctx.orm.topic.findByPk(ctx.params.id);
  await ctx.render('topics/profile', { topic, topicsListPath: ctx.router.url('topics.list') });
});

module.exports = router;
