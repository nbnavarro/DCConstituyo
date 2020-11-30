const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.post('follows.create', '/', async (ctx) => {
  const voter = await ctx.orm.voter.findByPk(ctx.request.body.voterId);
  const constituent = await ctx.orm.constituent.findByPk(ctx.request.body.constituentId);
  await constituent.addVoter(voter);
  if (ctx.request.body.ruta === 'profileVoter') {
    ctx.redirect(ctx.router.url('voters.profile', { id: voter.id }));
  } else if (ctx.request.body.ruta === 'constituentIndex') {
    ctx.redirect(ctx.router.url('constituents.list', { id: voter.id }));
  } else if (ctx.request.body.ruta === 'userFeed') {
    ctx.redirect('/');
  }
});

router.del('follows.delete', '/', async (ctx) => {
  const voter = await ctx.orm.voter.findByPk(ctx.request.body.voterId);
  const constituent = await ctx.orm.constituent.findByPk(ctx.request.body.constituentId);
  await voter.removeConstituent(constituent);
  if (ctx.request.body.ruta === 'profileVoter') {
    ctx.redirect(ctx.router.url('voters.profile', { id: voter.id }));
  } else if (ctx.request.body.ruta === 'constituentIndex') {
    ctx.redirect(ctx.router.url('constituents.list', { id: voter.id }));
  }
});

module.exports = router;
