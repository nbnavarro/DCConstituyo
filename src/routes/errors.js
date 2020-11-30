const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('errors.401', '/401', async (ctx) => {
  await ctx.render('errors/401');
});

router.get('errors.403', '/403', async (ctx) => {
  await ctx.render('errors/403');
});

router.get('errors.404', '/404', async (ctx) => {
  await ctx.render('errors/404');
});

router.get('errors.500', '/500', async (ctx) => {
  await ctx.render('errors/500');
});

module.exports = router;
