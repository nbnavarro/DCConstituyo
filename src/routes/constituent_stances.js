const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('constituent_stances.index', '/', async (ctx) => {
  const constituentsList = await ctx.orm.constituent.findAll();
  const stancesList = await ctx.orm.stance.findAll({ include: ctx.orm.constituent });
  await ctx.render('constituent_stances/index', {
    constituentsList,
    stancesList,
    newConstituentStancesPath: ctx.router.url('constituent_stances.create'),
  });
});

router.post('constituent_stances.create', '/', async (ctx) => {
  const constituent = await ctx.orm.constituent.findByPk(ctx.request.body.constituentId);
  const stance = await ctx.orm.stance.findByPk(ctx.request.body.stanceId);
  await constituent.addStance(stance);
  // ctx.redirect(ctx.router.url('stances.list', {id: ctx.request.body.topicId}));
  ctx.redirect(ctx.router.url('topics.list'));
});

router.del('constituent_stances.delete', '/', async (ctx) => {
  const constituent = await ctx.orm.constituent.findByPk(ctx.request.body.constituentId);
  const stance = await ctx.orm.stance.findByPk(ctx.request.body.stanceId);
  await constituent.removeStance(stance);
  // ctx.redirect(ctx.router.url('stances.list', {id: ctx.request.body.topicId}));
  ctx.redirect(ctx.router.url('topics.list'));
});

module.exports = router;
