const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('api.voters.list', '/', async (ctx) => {
  const votersList = await ctx.orm.voter.findAll();
  ctx.body = ctx.jsonSerializer('voter', {
    attributes: ['name', 'age'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('api.voters.list')}`,
    },
    dataLinks: {
      self: (dataset, voter) => `${ctx.origin}/api/voters/${voter.id}`,
    },
  }).serialize(votersList);
});

router.get('api.voter.show', '/:id', async (ctx) => {
  const voter = await ctx.orm.voter.findByPk(ctx.params.id);
  ctx.body = ctx.jsonSerializer('voter', {
    attributes: ['name', 'age'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('api.voter.show', { id: voter.id })}`,
    },
  }).serialize(voter);
});

module.exports = router;
