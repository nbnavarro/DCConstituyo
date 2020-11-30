/* global sendRegistrationEmail */
/* eslint no-await-in-loop : "off" */
/* eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }] */
/* eslint no-restricted-syntax: [0, "ForOfStatement"] */

const KoaRouter = require('koa-router');
const posts = require('./posts');
const questions = require('./questions');
const questionsConstituent = require('./question_constituents');

const router = new KoaRouter();

router.use('/:id/posts', posts.routes(), posts.allowedMethods());
router.use('/:id/questions', questions.routes(), questions.allowedMethods());
router.use('/:id/questions', questionsConstituent.routes(), questionsConstituent.allowedMethods());

/*
Ese :id es el id del constituyente, hay que tener ojo
cuando en el hijo se quiere usar denuevo una variable id,
como en /posts/:id, pues se podría redefinir la variable.
hay que usar /posts/:id_post para prevenir.
*/

router.get('constituents.filterAge', '/filterAge', async (ctx) => {
  ctx.redirect(ctx.router.url('constituents.list'));
});

router.get('constituents.filterTopic', '/filterTopic', async (ctx) => {
  ctx.redirect(ctx.router.url('constituents.list'));
});

router.get('constituents.list', '/', async (ctx) => {
  const constituentsList = await ctx.orm.constituent.findAll();
  const seguidos = {};
  if (ctx.state.currentUser) {
    for (const constituent of constituentsList) {
      if (ctx.state.userType === 'constituent') {
        seguidos[constituent.id] = await constituent.hasFollower(ctx.state.currentUser);
      } else if (ctx.state.userType === 'voter') {
        seguidos[constituent.id] = await ctx.state.currentUser.hasConstituent(constituent);
      }
    }
  }

  const allTopicsList = await ctx.orm.topic.findAll();

  // Nuevo
  const dictConstTema = {}; // 1:[2,3]
  for (const cadaConstituent of constituentsList) {
    dictConstTema[cadaConstituent.id] = [];
    const posturasConstituent = await cadaConstituent.getStances();
    for (const cadaPostura of posturasConstituent) {
      const temaAsociadoC = await cadaPostura.getTopic();
      dictConstTema[cadaConstituent.id].push(temaAsociadoC.id);
    }
  }

  await ctx.render('constituents/index', {
    dictConstTema,
    seguidos,
    constituentsList,
    allTopicsList,

    newFollowPath: ctx.router.url('follows.create'),
    removeFollowPath: ctx.router.url('follows.delete'),

    newConstituentFollowPath: ctx.router.url('follows_constituents.create'),
    removeConstituentFollowPath: ctx.router.url('follows_constituents.delete'),
    newConstituentPath: ctx.router.url('constituents.new'),
    editConstituentPath: (constituent) => ctx.router.url('constituents.edit', { id: constituent.id }),
    deleteConstituentPath: (constituent) => ctx.router.url('constituents.delete', { id: constituent.id }),
    profileConstituentPath: (constituent) => ctx.router.url('constituents.profile', { id: constituent.id }),

    filterConstituentAge: ctx.router.url('constituents.filterAge'),
    filterConstituentTopic: ctx.router.url('constituents.filterTopic'),

  });
});

router.get('constituents.new', '/new', async (ctx) => {
  const constituent = ctx.orm.constituent.build();
  await ctx.render('constituents/new', {
    constituent,
    submitConstituentPath: ctx.router.url('constituents.create'),
  });
});

router.post('constituents.create', '/', async (ctx) => {
  const constituent = ctx.orm.constituent.build(ctx.request.body);
  const { email } = ctx.request.body;
  const anyVoter = await ctx.orm.voter.findOne({ where: { email } });
  const anyConstituent = await ctx.orm.constituent.findOne({ where: { email } });
  const anyAdmin = await ctx.orm.admin.findOne({ where: { email } });
  if (!anyVoter && !anyConstituent && !anyAdmin) {
    try {
      await constituent.save({ fields: ['name', 'age', 'email', 'description', 'resume', 'password'] });
      ctx.redirect('/session/new');

      const user = constituent;
      await sendRegistrationEmail(ctx, user);
    } catch (validationError) {
      await ctx.render('constituents/new', {
        constituent,
        errors: validationError.errors,
        submitConstituentPath: ctx.router.url('constituents.create'),
      });
    }
  } else {
    await ctx.render('constituents/new', {
      emailError: true,
      constituent,
      submitConstituentPath: ctx.router.url('constituents.create'),
    });
  }
});


router.get('constituents.edit', '/:id/edit', async (ctx) => {
  const constituent = await ctx.orm.constituent.findByPk(ctx.params.id);
  const token = ctx.session.token && await ctx.orm.token.findOne({
    where: { content: ctx.session.token },
  });
  const idUser = token ? token.idUser : null;
  const userType = token ? token.userType : null;
  if (constituent) {
    await ctx.render('constituents/edit', {
      constituent,
      idUser,
      userType,
      submitConstituentPath: ctx.router.url('constituents.update', { id: constituent.id }),
    });
  } else {
    ctx.redirect('/');
  }
});

router.patch('constituents.update', '/:id', async (ctx) => {
  const constituent = await ctx.orm.constituent.findByPk(ctx.params.id);
  try {
    const {
      name, age, email, description, resume, password,
    } = ctx.request.body;
    await constituent.update({
      name, age, email, description, resume, password,
    })
    ctx.redirect(ctx.router.url('constituents.profile', { id: constituent.id }));
  } catch (validationError) {
    await ctx.render('constituents.new', {
      constituent,
      errors: validationError.errors,
      submitConstituentPath: ctx.router.url('constituents.update', { id: constituent.id }),
    });
  }
});

router.del('constituents.delete', '/:id', async (ctx) => {
  const token = await ctx.orm.token.findOne({ where: { idUser: ctx.params.id } });
  token && await token.destroy();
  const constituent = await ctx.orm.constituent.findByPk(ctx.params.id);
  await constituent.destroy();
  ctx.redirect(ctx.router.url('constituents.list'));
});

router.get('constituents.profile', '/:id', async (ctx) => {
  const constituent = await ctx.orm.constituent.findByPk(ctx.params.id);
  const listaSeguidos = await constituent.getFollowing();
  // console.log(Object.keys(constituent.__proto__))
  const listaPosturas = await constituent.getStances();
  const topicoPostura = [];

  for (const postura of listaPosturas) {
    const topico = await ctx.orm.topic.findByPk(postura.topicId);
    topicoPostura.push([topico, postura]);
  }

  const token = ctx.session.token && await ctx.orm.token.findOne({
    where: { content: ctx.session.token },
  });
  const idUser = token ? token.idUser : null;
  const userType = token ? token.userType : null;
  if (constituent) {
    await ctx.render('constituents/profile', {
      topicoPostura,
      listaSeguidos,
      constituent,
      idUser,
      userType,
      PostsPath: ctx.router.url('posts.list', ctx.params.id),
      QuestionsPath: ctx.router.url('questions.list', ctx.params.id),
      deleteConstituentFollowPath: ctx.router.url('follows_constituents.delete'),
      deleteConstituentStancesPath: ctx.router.url('constituent_stances.delete'),
      editConstituentPath: (constituentFunction) => ctx.router.url('constituents.edit', { id: constituentFunction.id }),
      deleteConstituentPath: (constituentFunction) => ctx.router.url('constituents.delete', { id: constituentFunction.id }),
      profileConstituentPath: (constituentFunction) => ctx.router.url('constituents.profile', { id: constituentFunction.id }),
      profileTopicPath: (topic) => ctx.router.url('topics.profile', { id: topic.id }),
    });
  } else {
    ctx.redirect('/');
  }
});

module.exports = router;
