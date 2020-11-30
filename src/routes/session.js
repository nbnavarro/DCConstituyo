const KoaRouter = require('koa-router');
// const sendLoginEmail = require('../mailers/login');
// const sendLoginAlertEmail = require('../mailers/login-alert');

const router = new KoaRouter();

router.get('session.new', '/new', (ctx) => ctx.render('session/new', {
  createSessionPath: ctx.router.url('session.create'),
  notice: ctx.flashMessage.notice,
}));

router.put('session.create', '/', async (ctx) => {
  const { email, password } = ctx.request.body;
  const voter = await ctx.orm.voter.findOne({ where: { email } });
  const constituent = await ctx.orm.constituent.findOne({ where: { email } });
  const admin = await ctx.orm.admin.findOne({ where: { email } });

  if (voter) {
    const isPasswordCorrect = voter && await voter.checkPassword(password);
    if (isPasswordCorrect) {
      const token = ctx.orm.token.build({ idUser: voter.id, content: voter.id.toString(), userType: 'voter' });
      await token.save({ fields: ['idUser', 'content', 'userType'] });
      ctx.session.token = token.content;
      // const user = voter;
      // await sendLoginEmail(ctx, user);
      return ctx.redirect('/');
    }
  } else if (constituent) {
    const isPasswordCorrect = constituent && await constituent.checkPassword(password);
    if (isPasswordCorrect) {
      const token = ctx.orm.token.build({ idUser: constituent.id, content: constituent.id.toString(), userType: 'constituent' });
      await token.save({ fields: ['idUser', 'content', 'userType'] });
      ctx.session.token = token.content;
      // const user = constituent;
      // await sendLoginEmail(ctx, user);
      return ctx.redirect('/');
    }
  } else if (admin) {
    const isPasswordCorrect = admin && await admin.checkPassword(password);
    if (isPasswordCorrect) {
      // const user = admin;
      // await sendLoginEmail(ctx, user);
      const token = ctx.orm.token.build({ idUser: admin.id, content: admin.id.toString(), userType: 'admin' });
      await token.save({ fields: ['idUser', 'content', 'userType'] });
      ctx.session.token = token.content;
      return ctx.redirect('/');
    }
  }

  return ctx.render('session/new', {
    email,
    createSessionPath: ctx.router.url('session.create'),
    error: 'Email o contraseña incorrecta',
  });
});

router.delete('session.destroy', '/', async (ctx) => {
  const token = await ctx.orm.token.findOne({ where: { content: ctx.session.token } });
  await token.destroy();
  ctx.session = null;
  ctx.redirect(ctx.router.url('session.new'));
});

module.exports = router;
