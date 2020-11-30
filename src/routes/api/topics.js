const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('api.topics.list', '/', async (ctx) => {
  const topicsList = await ctx.orm.topic.findAll({ include: ctx.orm.stance });

  ctx.body = ctx.jsonSerializer('topic', {
    attributes: ['name', 'description', 'stances'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('api.topics.list')}`,
    },
    dataLinks: {
      self: (dataset, topic) => `${ctx.origin}/api/topics/${topic.id}`,
    },
  }).serialize(topicsList);
});

router.get('api.topic.show', '/:id', async (ctx) => {
  const topic = await ctx.orm.topic.findByPk(ctx.params.id, { include: ctx.orm.stance });
  ctx.body = ctx.jsonSerializer('topic', {
    attributes: ['name', 'description', 'stances'],
    topLevelLinks: {
      self: `${ctx.origin}${ctx.router.url('api.topic.show', { id: topic.id })}`,
    },
  }).serialize(topic);
});

module.exports = router;
