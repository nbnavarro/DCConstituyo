module.exports = function sendRegistrationEmail(ctx, user) {
  const { email } = user;
  // you can get all the additional data needed by using the provided one plus ctx
  return ctx.sendMail('registration', { to: email, subject: 'Bienvenida a DCConstituyo' }, { user });
};
