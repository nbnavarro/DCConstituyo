/* global sendRegistrationEmail */
/* eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }] */
/* eslint no-restricted-syntax: [0, "ForOfStatement"] */

const KoaRouter = require('koa-router');
const { Op } = require('sequelize');

const router = new KoaRouter();

router.get('voters.list', '/', async (ctx) => {
  const votersList = await ctx.orm.voter.findAll();
  await ctx.render('voters/index', {
    votersList,
    newVoterPath: ctx.router.url('voters.new'),
    editVoterPath: (voter) => ctx.router.url('voters.edit', { id: voter.id }),
    deleteVoterPath: (voter) => ctx.router.url('voters.delete', { id: voter.id }),
    profileVoterPath: (voter) => ctx.router.url('voters.profile', { id: voter.id }),

  });
});

router.get('voters.new', '/new', async (ctx) => {
  const voter = ctx.orm.voter.build();
  await ctx.render('voters/new', {
    voter,
    submitVoterPath: ctx.router.url('voters.create'),
  });
});

router.post('voters.create', '/', async (ctx) => {
  const voter = ctx.orm.voter.build(ctx.request.body);
  const { email } = ctx.request.body;
  const anyVoter = await ctx.orm.voter.findOne({ where: { email } });
  const anyConstituent = await ctx.orm.constituent.findOne({ where: { email } });
  const anyAdmin = await ctx.orm.admin.findOne({ where: { email } });

  if (!anyVoter && !anyConstituent && !anyAdmin) {
    try {
      await voter.save({ fields: ['name', 'age', 'email', 'password'] });
      ctx.redirect('/session/new');

      const user = voter;
      await sendRegistrationEmail(ctx, user);
    } catch (validationError) {
      await ctx.render('voters/new', {
        voter,
        errors: validationError.errors,
        submitVoterPath: ctx.router.url('voters.new'),
      });
    }
  } else {
    await ctx.render('voters/new', {
      emailError: true,
      voter,
      submitVoterPath: ctx.router.url('voters.create'),
    });
  }
});

router.get('voters.edit', '/:id/edit', async (ctx) => {
  const voter = await ctx.orm.voter.findByPk(ctx.params.id);
  const token = ctx.session.token && await ctx.orm.token.findOne({
    where: { content: ctx.session.token },
  });
  const idUser = token ? token.idUser : null;
  const userType = token ? token.userType : null;
  // token ? idUser = token.idUser : idUser = null;
  // token ? userType = token.userType : userType = null;
  await ctx.render('voters/edit', {
    voter,
    idUser,
    userType,
    submitVoterPath: ctx.router.url('voters.update', { id: voter.id }),
  });
});

router.patch('voters.update', '/:id', async (ctx) => {
  const voter = await ctx.orm.voter.findByPk(ctx.params.id);
  try {
    const {
      name, age, email, password,
    } = ctx.request.body;
    await voter.update({
      name, age, email, password,
    });
    ctx.redirect(ctx.router.url('voters.profile', { id: voter.id }));
  } catch (validationError) {
    await ctx.render('voters.new', {
      voter,
      errors: validationError.errors,
      submitVoterPath: ctx.router.url('voters.update', { id: voter.id }),
    });
  }
});

router.del('voters.delete', '/:id', async (ctx) => {
  const token = await ctx.orm.token.findOne({ where: { idUser: ctx.params.id } });
  token && await token.destroy();
  const voter = await ctx.orm.voter.findByPk(ctx.params.id);
  await voter.destroy();
  ctx.redirect(ctx.router.url('voters.list'));
});

router.get('voters.profile', '/:id', async (ctx) => {
  const voter = await ctx.orm.voter.findByPk(ctx.params.id);
  const votersList = await ctx.orm.voter.findAll({ include: ctx.orm.constituent });
  const constituentsList = []; // [[constituentObject, constituentPathProfile], [], ...]
  const ids = [];
  votersList.forEach((votante) => {
    const idFromUrl = parseInt(ctx.params.id, 10);
    if (votante.id === idFromUrl) {
      votante.constituents.forEach((constituent) => {
        const path = ctx.router.url('constituents.profile', { id: constituent.id });
        constituentsList.push([constituent, path]);
        ids.push(constituent.id);
      });
    }
  });

  const topicWithPath = [];
  const idTemasSeguidos = [];
  const topicsList = await voter.getTopics();
  for (const topic of topicsList) {
    idTemasSeguidos.push(topic.id);
    const path2 = ctx.router.url('topics.profile', { id: topic.id });
    topicWithPath.push([topic, path2]);
  }

  const listaSeguidos = await voter.getConstituents();
  const idConstituyentesSeguidos = [];
  for (const cadaConstituyente of listaSeguidos) {
    idConstituyentesSeguidos.push(cadaConstituyente.id);
  }
  const allConstituentsList = await ctx.orm.constituent.findAll({
    where: { id: { [Op.notIn]: idConstituyentesSeguidos } },
  });

  for (const cadaConstituyente of listaSeguidos) {
    idConstituyentesSeguidos.push(cadaConstituyente.id);
  }
  const allTopicsList = await ctx.orm.topic.findAll({
    where: { id: { [Op.notIn]: idTemasSeguidos } },
  });

  const token = ctx.session.token && await ctx.orm.token.findOne({
    where: { content: ctx.session.token },
  });
  const idUser = token ? token.idUser : null;
  const userType = token ? token.userType : null;
  // token ? idUser = token.idUser : idUser = null;
  // token ? userType = token.userType : userType = null;

  await ctx.render('voters/profile', {
    voter,
    idUser,
    userType,
    constituentsList,
    topicWithPath,
    deleteInterestPath: ctx.router.url('interests.delete'),
    deleteFollowPath: ctx.router.url('follows.delete'),
    allConstituentsList,
    allTopicsList,
    newFollowPath: ctx.router.url('follows.create'),
    newInterestPath: ctx.router.url('interests.create'),
    editVoterPath: (voterFunction) => ctx.router.url('voters.edit', { id: voterFunction.id }),
    deleteVoterPath: (voterFunction) => ctx.router.url('voters.delete', { id: voterFunction.id }),
  });
});

module.exports = router;
