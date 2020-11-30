const KoaRouter = require('koa-router');

const hello = require('./routes/hello');
const index = require('./routes/index');
const constituents = require('./routes/constituents');
const voters = require('./routes/voters');
const follows = require('./routes/follows');
const followsConstituents = require('./routes/follows_constituents');
const interests = require('./routes/interests');
const topics = require('./routes/topics');
const admins = require('./routes/admins');
const session = require('./routes/session');
const constituentStances = require('./routes/constituent_stances');
const errors = require('./routes/errors');
const api = require('./routes/api');
const senators = require('./routes/senators');

const router = new KoaRouter();

router.use(async (ctx, next) => {
  const token = ctx.session.token && await ctx.orm.token.findOne({
    where: { content: ctx.session.token },
  });

  if (token) {
    if (token.userType === 'voter') {
      Object.assign(ctx.state, {
        userType: 'voter',
        currentUser: ctx.session.token && (await ctx.orm.voter.findByPk(token.idUser)),
        destroySessionPath: ctx.router.url('session.destroy'),
        constituentsIndexPath: ctx.router.url('constituents.list'),
        topicsIndexPath: ctx.router.url('topics.list'),
        perfilPath: (currentUser) => ctx.router.url('voters.profile', { id: currentUser.id }),
      });
    } else if (token.userType === 'constituent') {
      Object.assign(ctx.state, {
        userType: 'constituent',
        currentUser: ctx.session.token && (await ctx.orm.constituent.findByPk(token.idUser)),
        destroySessionPath: ctx.router.url('session.destroy'),
        constituentsIndexPath: ctx.router.url('constituents.list'),
        topicsIndexPath: ctx.router.url('topics.list'),
        perfilPath: (currentUser) => ctx.router.url('constituents.profile', { id: currentUser.id }),
        publicacionesPath: (currentUser) => ctx.router.url('posts.list', { id: currentUser.id }),
        preguntasPath: (currentUser) => ctx.router.url('questions.list', { id: currentUser.id }),
      });
    } else if (token.userType === 'admin') {
      Object.assign(ctx.state, {
        userType: 'admin',
        currentUser: ctx.session.token && (await ctx.orm.admin.findByPk(token.idUser)),
        destroySessionPath: ctx.router.url('session.destroy'),
        constituentsIndexPath: ctx.router.url('constituents.list'),
        votersIndexPath: ctx.router.url('voters.list'),
        topicsIndexPath: ctx.router.url('topics.list'),
      });
    }
  } else {
    Object.assign(ctx.state, {
      currentUser: null,
      userType: null,
      newSessionPath: ctx.router.url('session.new'),
      destroySessionPath: ctx.router.url('session.destroy'),
      newConstituentPath: ctx.router.url('constituents.new'),
      newVoterPath: ctx.router.url('voters.new'),
    });
  }
  return next();
});

router.use('/api', api.routes());
router.use('/', index.routes());
router.use('/hello', hello.routes());
router.use('/constituents', constituents.routes());
router.use('/voters', voters.routes());
router.use('/follows', follows.routes());
router.use('/follows_constituents', followsConstituents.routes());
router.use('/interests', interests.routes());
router.use('/topics', topics.routes());
router.use('/admins', admins.routes());
router.use('/session', session.routes());
router.use('/constituent_stances', constituentStances.routes());
router.use('/errors', errors.routes());
router.use('/senators', senators.routes());


module.exports = router;
