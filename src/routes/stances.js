/* eslint no-await-in-loop : "off" */
/* eslint no-restricted-syntax: [0, "ForOfStatement"] */

const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('stances.list', '/', async (ctx) => {
  const stancesList = await ctx.orm.stance.findAll({ where: { topicId: ctx.params.id } });
  const topic = await ctx.orm.topic.findByPk(ctx.params.id);
  const stanceConst = [];
  let sigoAlguna = false;
  for (const unaStance of stancesList) {
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

  await ctx.render('stances/index', {
    stancesList,
    stanceConst,
    topic,
    sigoAlguna,
    topicPath: ctx.router.url('topics.profile', ctx.params.id),
    newStancePath: ctx.router.url('stances.new', ctx.params.id),
    newConstituentStancesPath: ctx.router.url('constituent_stances.create'),
    deleteConstituentStancesPath: ctx.router.url('constituent_stances.delete'),
    editStancePath: (stance) => ctx.router.url('stances.edit', { id_stance: stance.id, id: ctx.params.id }),
    deleteStancePath: (stance) => ctx.router.url('stances.delete', { id_stance: stance.id, id: ctx.params.id }),
  });
});

router.get('stances.new', '/new', async (ctx) => {
  const stance = ctx.orm.stance.build();
  const topic = await ctx.orm.topic.findByPk(ctx.params.id);
  await ctx.render('stances/new', {
    stance,
    topic,
    submitStancePath: ctx.router.url('stances.create', ctx.params.id),
  });
});

router.post('stances.create', '/', async (ctx) => {
  const stance = ctx.orm.stance.build(ctx.request.body);
  try {
    await stance.save({ fields: ['topicId', 'name'] });
    ctx.redirect(ctx.router.url('stances.list', ctx.params.id));
  } catch (validationError) {
    await ctx.render('stances.new', {
      stance,
      errors: validationError.errors,
      submitStancePath: ctx.router.url('stances.create', ctx.params.id),
    });
  }
});

router.get('stances.edit', '/:id_stance/edit', async (ctx) => {
  const stance = await ctx.orm.stance.findByPk(ctx.params.id_stance);
  await ctx.render('stances/edit', {
    stance,
    submitStancePath: ctx.router.url('stances.update', { id_stance: stance.id, id: ctx.params.id }),
  });
});

router.patch('stances.update', '/:id_stance', async (ctx) => {
  const stance = await ctx.orm.stance.findByPk(ctx.params.id_stance);
  try {
    const { name } = ctx.request.body;
    await stance.update({ name });
    ctx.redirect(ctx.router.url('stances.list', ctx.params.id));
  } catch (validationError) {
    await ctx.render('stances.new', {
      stance,
      errors: validationError.errors,
      submitStancePath: ctx.router.url('stances.update', { id_stance: stance.id, id: ctx.params.id }),
    });
  }
});

router.del('stances.delete', '/:id_stance', async (ctx) => {
  const stance = await ctx.orm.stance.findByPk(ctx.params.id_stance);
  await stance.destroy();
  ctx.redirect(ctx.router.url('stances.list', ctx.params.id));
});

module.exports = router;
