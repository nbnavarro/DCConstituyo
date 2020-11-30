const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.post('follows_constituents.create', '/', async (ctx) => {
  const constituentFollower = await ctx.orm.constituent.findByPk(ctx.state.currentUser.id);
  const constituentFollowing = await ctx.orm.constituent.findByPk(
    ctx.request.body.constituentFollowingId,
  );
  await constituentFollowing.addFollower(constituentFollower);
  if (ctx.request.body.ruta === 'constituentList') {
    ctx.redirect(ctx.router.url('constituents.list'));
  } else {
    ctx.redirect('/');
  }
});

router.del('follows_constituents.delete', '/', async (ctx) => {
  const constituentFollower = await ctx.orm.constituent.findByPk(
    ctx.state.currentUser.id,
  );
  const constituentFollowing = await ctx.orm.constituent.findByPk(
    ctx.request.body.constituentFollowingId,
  );
  await constituentFollowing.removeFollower(constituentFollower);

  if (ctx.request.body.ruta === 'profileConstituent') {
    ctx.redirect(ctx.router.url('constituents.profile', { id: constituentFollower.id }));
  } else {
    ctx.redirect(ctx.router.url('constituents.list'));
  }
});

module.exports = router;
