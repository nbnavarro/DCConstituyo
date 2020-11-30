/* eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }] */

const KoaRouter = require('koa-router');

const router = new KoaRouter();

async function loadAdmin(ctx, next) {
  ctx.state.admin = await ctx.orm.admin.findByPk(ctx.params.id);
  return next();
}

router.get('admins.list', '/', async (ctx) => {
  const adminsList = await ctx.orm.admin.findAll();
  if (ctx.state.userType === 'admin') {
    await ctx.render('admins/index', {
      adminsList,
      newAdminPath: ctx.router.url('admins.new'),
      editAdminPath: (admin) => ctx.router.url('admins.edit', { id: admin.id }),
      deleteAdminPath: (admin) => ctx.router.url('admins.delete', { id: admin.id }),
    });
  } else {
    // await ctx.redirect(ctx.router.url('errors.403'));
    ctx.throw(403);
  }
});

router.get('admins.new', '/new', async (ctx) => {
  const admin = ctx.orm.admin.build();
  if (ctx.state.userType === 'admin') {
    await ctx.render('admins/new', {
      admin,
      submitAdminPath: ctx.router.url('admins.create'),
    });
  } else {
    ctx.throw(403);
  }
});

router.post('admins.create', '/', async (ctx) => {
  const admin = ctx.orm.admin.build(ctx.request.body);
  const { email } = ctx.request.body;
  const anyVoter = await ctx.orm.voter.findOne({ where: { email } });
  const anyConstituent = await ctx.orm.constituent.findOne({ where: { email } });
  const anyAdmin = await ctx.orm.admin.findOne({ where: { email } });
  if (!anyVoter && !anyConstituent && !anyAdmin) {
    try {
      await admin.save({ fields: ['name', 'email', 'password'] });
      ctx.redirect(ctx.router.url('admins.list'));
    } catch (validationError) {
      await ctx.render('admins/new', {
        admin,
        errors: validationError.errors,
        submitAdminPath: ctx.router.url('admins.create'),
      });
    }
  } else {
    await ctx.render('admins/new', {
      emailError: true,
      admin,
      submitAdminPath: ctx.router.url('admins.create'),
    });
  }
});

router.get('admins.edit', '/:id/edit', loadAdmin, async (ctx) => {
  if (ctx.state.userType === 'admin') {
    const { admin } = ctx.state;
    await ctx.render('admins/edit', {
      admin,
      submitAdminPath: ctx.router.url('admins.update', { id: admin.id }),
    });
  } else {
    ctx.throw(403);
  }
});

router.patch('admins.update', '/:id', loadAdmin, async (ctx) => {
  const { admin } = ctx.state;
  try {
    const { name, email, password } = ctx.request.body;
    await admin.update({ name, email, password });
    ctx.redirect(ctx.router.url('admins.list'));
  } catch (validationError) {
    await ctx.render('admins/edit', {
      admin,
      errors: validationError.errors,
      submitAdminPath: ctx.router.url('admins.update', { id: admin.id }),
    });
  }
});

router.del('admins.delete', '/:id', loadAdmin, async (ctx) => {
  const token = await ctx.orm.token.findOne({ where: { idUser: ctx.params.id } });
  token && await token.destroy();
  const { admin } = ctx.state;
  await admin.destroy();
  ctx.redirect(ctx.router.url('admins.list'));
});

module.exports = router;
