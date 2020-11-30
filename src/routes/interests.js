const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('interests.index', '/', async (ctx) => {
  const topicsList = await ctx.orm.topic.findAll();
  // const votersList = await ctx.orm.voter.findAll();
  const votersList = await ctx.orm.voter.findAll({ include: ctx.orm.topic });
  await ctx.render('interests/index', {
    topicsList,
    votersList,
    newInterestPath: ctx.router.url('interests.create'),
    deleteInterestPath: ctx.router.url('interests.delete'),
  });
});


router.post('interests.create', '/', async (ctx) => {
  const voter = await ctx.orm.voter.findByPk(ctx.request.body.voterId);
  const topic = await ctx.orm.topic.findByPk(ctx.request.body.topicId);
  await topic.addVoter(voter);
  ctx.redirect(ctx.router.url('voters.profile', { id: voter.id }));
});

router.del('interests.delete', '/', async (ctx) => {
  const voter = await ctx.orm.voter.findByPk(ctx.request.body.voterId);
  const topic = await ctx.orm.topic.findByPk(ctx.request.body.topicId);
  await voter.removeTopic(topic);
  ctx.redirect(ctx.router.url('voters.profile', { id: voter.id }));
});


module.exports = router;
