const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('api.constituents.list', '/', async (ctx) => {
  const constituentsList = await ctx.orm.constituent.findAll({
    include: [
      ctx.orm.voter,
      { model: ctx.orm.constituent, as: 'Follower' },
    ],
  });

  ctx.body = ctx.jsonSerializer('constituent', {
    attributes: ['name', 'age', 'description', 'resume', 'voters', 'Follower'],
    keyForAttribute(attribute) {
      if (attribute === 'voters') {
        return 'votersFollowing';
      } if (attribute === 'Follower') {
        return 'constituentsFollowing';
      }
      return attribute;
    },
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('api.constituents.list')}`,
    },
    dataLinks: {
      self: (dataset, constituent) => `${ctx.origin}/api/constituents/${constituent.id}`,
    },
  }).serialize(constituentsList);
});

router.get('api.constituent.show', '/:id', async (ctx) => {
  const constituent = await ctx.orm.constituent.findByPk(ctx.params.id, {
    include: [
      ctx.orm.voter,
      { model: ctx.orm.constituent, as: 'Follower' },
    ],
  });
  ctx.body = ctx.jsonSerializer('constituent', {
    attributes: ['name', 'age', 'description', 'resume', 'voters', 'Follower'],
    keyForAttribute(attribute) {
      if (attribute === 'voters') {
        return 'votersFollowing';
      } if (attribute === 'Follower') {
        return 'constituentsFollowing';
      }
      return attribute;
    },
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('api.constituent.show', { id: constituent.id })}`,
    },
  }).serialize(constituent);
});

module.exports = router;
