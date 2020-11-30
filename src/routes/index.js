/* eslint no-await-in-loop : "off" */
/* eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }] */
/* eslint no-restricted-syntax: [0, "ForOfStatement"] */

const KoaRouter = require('koa-router');
const { Op } = require('sequelize');

const router = new KoaRouter();

router.get('/', async (ctx) => {
  // FEED
  const actualDate = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(actualDate.getDate() - 7);
  // ultimos10minutos = new Date();
  // ultimos10minutos.setMinutes(actualDate.getMinutes() - 10);
  const allConstituentList = await ctx.orm.constituent.findAll();
  const dicRecomendados = {}; // 1: {objeto:Constituent,lista:[]}
  const dictConstituentList = {};
  const dictFiltroConstituents = {}; // {1:Objeto}

  for (const constituyente of allConstituentList) {
    dictConstituentList[constituyente.id] = constituyente;
  }

  const { currentUser } = ctx.state;
  const { userType } = ctx.state;
  const listadoPublicacionesRecientes = [];

  const temasInteresC = {};
  let listaTemasSeguidos = [];
  let listaConstituentsSeguidos = [];

  if (userType === 'voter') {
    listaConstituentsSeguidos = await currentUser.getConstituents();
    listaTemasSeguidos = await currentUser.getTopics();
    const idsSeguidos = [];
    for (const seguido of listaConstituentsSeguidos) {
      idsSeguidos.push(seguido.id);
    }

    for (const constituyente of listaConstituentsSeguidos) {
      // Sugerencias

      const posturasConstituyente = await constituyente.getStances();
      for (const postura of posturasConstituyente) {
        const constituyentesSimilaresPorPostura = await ctx.orm.constituent.findAll({
          where: { id: { [Op.notIn]: idsSeguidos } },
          include: [{
            model: ctx.orm.stance,
            where: { id: postura.id },
          }],
        });

        for (const constituyenteRecomendado of constituyentesSimilaresPorPostura) {
          const temaAsociado = await postura.getTopic();
          const combi = `${postura.name} (${temaAsociado.name})`;
          if (!(constituyenteRecomendado.id in dicRecomendados)) {
            dicRecomendados[constituyenteRecomendado.id] = {
              objeto: constituyenteRecomendado,
              lista: [],
            };

            dicRecomendados[constituyenteRecomendado.id].lista.push(combi);
          } else if (!(dicRecomendados[constituyenteRecomendado.id].lista.includes(combi))) {
            dicRecomendados[constituyenteRecomendado.id].lista.push(combi);
          }
        }
      }

      // console.log(Object.keys(constituyente.__proto__))
      const susPublicaciones = await ctx.orm.post.findAll({
        where: {
          constituentId: constituyente.id,
          createdAt: { [Op.between]: [lastWeek, actualDate] },
        },
      });

      for (const cadaPublicacion of susPublicaciones) {
        listadoPublicacionesRecientes.push(cadaPublicacion);
        const idFiltroV = cadaPublicacion.constituentId;
        dictFiltroConstituents[idFiltroV] = dictConstituentList[idFiltroV];
      }
    }
  } else if (userType === 'constituent') {
    listaConstituentsSeguidos = await currentUser.getFollowing();
    const misPosturas = await currentUser.getStances();
    for (const cadaPostura of misPosturas) {
      const temaAsociadoC = await cadaPostura.getTopic();
      temasInteresC[temaAsociadoC.id] = temaAsociadoC;
    }
    // console.log(Object.keys(currentUser.__proto__))

    const idsSeguidos = [];
    idsSeguidos.push(currentUser.id);
    for (const seguido of listaConstituentsSeguidos) {
      idsSeguidos.push(seguido.id);
    }

    for (const constituyente of listaConstituentsSeguidos) {
      // Sugerencias

      const posturasConstituyente = await constituyente.getStances();
      for (const postura of posturasConstituyente) {
        const constituyentesSimilaresPorPostura = await ctx.orm.constituent.findAll({
          where: { id: { [Op.notIn]: idsSeguidos } },
          include: [{
            model: ctx.orm.stance,
            where: { id: postura.id },
          }],
        });

        for (const constituyenteRecomendado of constituyentesSimilaresPorPostura) {
          const temaAsociado = await postura.getTopic();
          const combi = `${postura.name} (${temaAsociado.name})`;
          if (!(constituyenteRecomendado.id in dicRecomendados)) {
            dicRecomendados[constituyenteRecomendado.id] = {
              objeto: constituyenteRecomendado,
              lista: [],
            };

            dicRecomendados[constituyenteRecomendado.id].lista.push(combi);
          } else if (!(dicRecomendados[constituyenteRecomendado.id].lista.includes(combi))) {
            dicRecomendados[constituyenteRecomendado.id].lista.push(combi);
          }
        }
      }

      // console.log(Object.keys(constituyente.__proto__))
      const susPublicaciones = await ctx.orm.post.findAll({
        where: {
          constituentId: constituyente.id,
          createdAt: { [Op.between]: [lastWeek, actualDate] },
        },
      });

      for (const cadaPublicacion of susPublicaciones) {
        listadoPublicacionesRecientes.push(cadaPublicacion);
        const idFiltroC = cadaPublicacion.constituentId;
        dictFiltroConstituents[idFiltroC] = dictConstituentList[idFiltroC];
      }
    }
  }
  const reactFiltroConstituents = JSON.stringify(dictFiltroConstituents);
  // Inicio Funcionalidad admin home page
  const allPostList = await ctx.orm.post.findAll({ raw: true });
  let postsPendientes = false;
  const dictPosts = {};
  for (const cadaPost of allPostList) {
    dictPosts[cadaPost.id] = cadaPost;
    if (cadaPost.checked === 'no') {
      postsPendientes = true;
    }
  }

  const allCommentsVotersList = await ctx.orm.comment.findAll({ raw: true });
  let commentsVotersPendientes = false;
  for (const cadaCommentVoter of allCommentsVotersList) {
    if (cadaCommentVoter.checked === 'no') {
      commentsVotersPendientes = true;
    }
  }
  const allCommentsConstsList = await ctx.orm.comment_constituent.findAll({ raw: true });
  let commentsConstPendientes = false;
  for (const cadaCommentConst of allCommentsConstsList) {
    if (cadaCommentConst.checked === 'no') {
      commentsConstPendientes = true;
    }
  }

  const allVotersList = await ctx.orm.voter.findAll({ raw: true });
  const dictAllVoters = {};
  for (const esteVoter of allVotersList) {
    dictAllVoters[esteVoter.id] = esteVoter;
  }

  const allQuestionsVotersList = await ctx.orm.question.findAll({ raw: true });
  let questionsVotersPendientes = false;
  for (const cadaPreguntaVoter of allQuestionsVotersList) {
    if (cadaPreguntaVoter.checked === 'no') {
      questionsVotersPendientes = true;
    }
  }
  const allQuestionsConstsList = await ctx.orm.question_constituent.findAll({ raw: true });
  let questionsConstPendientes = false;
  for (const cadaPreguntaConst of allQuestionsConstsList) {
    if (cadaPreguntaConst.checked === 'no') {
      questionsConstPendientes = true;
    }
  }

  const allAnswersVotersList = await ctx.orm.answer.findAll({ raw: true });
  const allAnswersConstsList = await ctx.orm.answer_constituent.findAll({ raw: true });
  let answersVotersPendientes = false;
  let answersConstPendientes = false;
  const parRespuestaPreguntaVoter = {}; // {idAnswerVoter : ObjetoPregunta}
  const parRespuestaPreguntaConst = {}; // {idAnswerConstituent : ObjetoPregunta}

  for (const cadaAnswerVoter of allAnswersVotersList) {
    const cadaQuestionVoter = await ctx.orm.question.findByPk(
      cadaAnswerVoter.questionId, { raw: true },
    );
    parRespuestaPreguntaVoter[cadaAnswerVoter.id] = cadaQuestionVoter;
    if (cadaAnswerVoter.checked === 'no') {
      answersVotersPendientes = true;
    }
  }

  for (const cadaAnswerConst of allAnswersConstsList) {
    const cadaQuestionConst = await ctx.orm.question_constituent.findByPk(
      cadaAnswerConst.questionId, { raw: true },
    );
    parRespuestaPreguntaConst[cadaAnswerConst.id] = cadaQuestionConst;
    if (cadaAnswerConst.checked === 'no') {
      answersConstPendientes = true;
    }
  }

  // Fin funcionalidad admin homepage
  await ctx.render('index', {
    // Inicio variables admin home page
    postsPendientes,
    commentsVotersPendientes,
    commentsConstPendientes,

    questionsVotersPendientes,
    questionsConstPendientes,
    answersVotersPendientes,
    answersConstPendientes,
    // separador con checks pendientes
    dictPosts,
    parRespuestaPreguntaVoter,
    parRespuestaPreguntaConst,
    allPostList,
    allCommentsVotersList,
    allCommentsConstsList,
    dictAllVoters,

    allQuestionsVotersList,
    allQuestionsConstsList,

    allAnswersVotersList,
    allAnswersConstsList,
    // Fin variables admin home page
    reactFiltroConstituents,
    dictFiltroConstituents,
    temasInteresC,
    listaTemasSeguidos,
    actualDate,
    lastWeek,
    listaConstituentsSeguidos,
    listadoPublicacionesRecientes,
    dictConstituentList,
    dicRecomendados,
    constituentsList: ctx.router.url('constituents.list'),
    votersList: ctx.router.url('voters.list'),
    topicsList: ctx.router.url('topics.list'),
    followsIndex: ctx.router.url('follows.index'),
    newFollowPath: ctx.router.url('follows.create'),
    newConstituentFollowPath: ctx.router.url('follows_constituents.create'),
    profileVoterPath: (voter) => ctx.router.url('voters.profile', { id: voter.id }),
    constituentPath: (constituent) => ctx.router.url('constituents.profile', constituent.id),
    commentsPath: (post) => ctx.router.url('comments.list', { id_post: post.id, id: post.constituentId }),
    stancesPath: (topic) => ctx.router.url('stances.list', { id: topic.id }),
  });
});

module.exports = router;
