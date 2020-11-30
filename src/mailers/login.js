module.exports = function sendLoginEmail(ctx, user) {
  const { email } = user;
  // you can get all the additional data needed by using the provided one plus ctx
  return ctx.sendMail('login', { to: email, subject: 'Haz iniciado sesion en DCConstituyo' }, { user });
};
