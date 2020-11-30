const KoaRouter = require('koa-router');

const router = new KoaRouter();
const fetch = require('node-fetch');
const xmlParser = require('xml2json');

router.get('senators.list', '/', async (ctx) => {
  const response = await fetch('https://www.senado.cl/wspublico/senadores_vigentes.php');
  const data = await response.text();
  const xmlRecibido = xmlParser.toJson(data);
  const objetoXML = JSON.parse(xmlRecibido);
  const allSenatorsList = objetoXML.senadores.senador;
  await ctx.render('senators/index', {
    allSenatorsList,
  });
});


module.exports = router;
