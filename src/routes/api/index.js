const KoaRouter = require('koa-router');
const jwt = require('koa-jwt');

const authApi = require('./auth');
const constituentsApi = require('./constituents');
const topicsApi = require('./topics');
const votersApi = require('./voters');


const router = new KoaRouter();

// unauthenticated endpoints
router.use('/auth', authApi.routes());

// JWT authentication without passthrough (error if not authenticated)
router.use(jwt({ secret: process.env.JWT_SECRET, key: 'authData' }));
router.use(async (ctx, next) => {
  if (ctx.state.authData.userId) {
    if (ctx.state.authData.userType === 'voter') {
      ctx.state.currentUser = await ctx.orm.voter.findByPk(ctx.state.authData.userId);
    } else {
      ctx.state.currentUser = await ctx.orm.constituent.findByPk(ctx.state.authData.userId);
    }
  }
  return next();
});

// authenticated endpoints
router.use('/constituents', constituentsApi.routes());
router.use('/topics', topicsApi.routes());
router.use('/voters', votersApi.routes());

module.exports = router;
