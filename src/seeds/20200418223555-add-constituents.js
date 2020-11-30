const bcrypt = require('bcrypt');

const PASSWORD_SALT = 10;


module.exports = {
  up: async (queryInterface) => {
    const constituentsData = [
      {
        name: 'Matías Walker',
        age: 46,
        email: 'matias.walker@gmail.com',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        description: 'Me encantaría ver en la convención constituyente a alguien como James Hamilton o Cristián Warnken. Tiene que ser una convención que refleje al país, con profesores y profesoras de derechos constitucional, con cuotas de género y también con una mirada que interprete a las regiones',
        resume: 'Militante demócrata cristiano, Diputado de la República por el Distrito Nº8 que comprende las comunas de Coquimbo, Ovalle, Río Hurtado. A los 23 años fui elegido concejal por la comuna de Lo Barnechea. De profesión abogado, me he especializado en el Derecho del Trabajo.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Fernando Atria',
        age: 51,
        email: 'fern.atria@gmail.com',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        description: 'No creo que haya un perfil prefijable para la convención porque el sentido no es de expertos en derecho constitucional. Se trata de que represente al pueblo de Chile. Tiene que tener la diversidad que tiene el país. Si no hay criterio paritaria, si no hay indígenas y hay pocos independientes se cuestionará la legitimidad. Vamos a levantar candidaturas desde Casa Común',
        resume: ' Licenciado en Ciencias Jurídicas y Sociales por la Universidad de Chile y Doctor en Derecho por la Universidad de Edimburgo. Actualmente me desempeño como profesor de la Facultad de Derecho de la Universidad de Chile.​ Antes fui profesor de la Universidad de Talca y la Universidad Adolfo Ibáñez.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Paulina Veloso',
        age: 63,
        email: 'paulina.veloso@gmail.com',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        description: 'Alguien como Verónica Undurraga. Liberal, mujer, progresista, académica, joven, feminista',
        resume: ' Abogada, académica, investigadora y política chilena. Me desempeñe como ministra secretaria general de la Presidencia durante el primer gobierno de Michelle Bachelet. Integrante del Consejo Asesor Presidencial contra los conflictos de interés, el tráfico de influencias y la corrupción.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alvaro Elizalde',
        age: 50,
        email: 'aelizalde@gmail.com',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        description: 'Nosotros estamos proponiendo que en la elección de los delegados a la convención se incorpore el criterio de igualdad de género y representación de pueblos originarios. Si estas modificaciones no prosperan por negativa del oficialismo, de todas formas serán criterios que aplicaremos en la conformación de nuestra lista. Asimismo incorporaremos candidaturas de independientes',
        resume: 'Abogado y político chileno. Es senador por la Región del Maule y es militante y presidente del Partido Socialista (PS).Fui ministro Secretario General de Gobierno en la segunda presidencia de Michelle Bachelet entre los años 2014 y 2015. Anteriormente fui superintendente de Seguridad Social, del primer gobierno de Bachelet, entre 2008 y 2010, además fui Secretario General del Partido Socialista entre 2010 y 2014.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Jaime Quintana',
        age: 52,
        email: 'jaimecito@gmm.com',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        description: 'Me gustaría que la convención reflejara al conjunto de la sociedad. Apuesto por un profesor, alguien joven y de región. Si es mapuche mejor.',
        resume: 'Licenciado en letras y político chileno miembro del Partido por la Democracia. Fui diputado por el distrito N° 49, por dos periodos consecutivos, de 2002 a 2010. Desde 2010 soy senador por la 11 Circunscripción, correspondiente a la Región de la Araucanía.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Alessia Injoque',
        age: 35,
        email: 'alessia@gmm.com',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        description: 'Tiene que ser alguien que tiende puentes, dialogante, que no se enfoque en las divisiones históricas sino en los objetivos y valores que compartimos y que nos van a permitir construir un futuro juntos. Me gustaría también que fuera alguien de la diversidad sexual y de género, que ayude a derrumbar prejuicios y vele por la igualdad real de acceso a derechos, libertades y oportunidades.',
        resume: 'Ahora conjugo mis oficios del mundo de la ingeniería con el activismo, la política y las letras. He dado charlas sobre diversidad en otras empresas, soy parte del directorio de la Fundación Iguales y recientemente me sumé al Partido Liberal porque quiero incidir en la agenda de la diversidad. El año pasado escribí y publiqué Crónicas de una infiltrada.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Juan Antonio Coloma',
        age: 63,
        email: 'jac@gmm.com',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        description: 'Ojalá las personas en la convención tengan conciencia clara del rol que tiene y de la tarea de la Constitución en una sociedad. Ojála haya incluya personas con formación jurídica. Darle una lógica de una elección parlamentaria o municipal a este tema no me parece correcto. Ojalá que se elijan a las personas más capacitadas, porque es una elección de quienes van a tratar de generar reglas del juego por los próximos treinta y tantos años, si es que gana la alternativa de una nueva Constitución.',
        resume: 'Militante del partido Unión Demócrata Independiente (UDI), me desempeñé como su secretario general, vicepresidente y presidente. Fui diputado por el Distrito Nº 31 entre 1990 y 2002. A partir de 2002 he ejercido como senador por la 10ª Circunscripción de la Región del Maule.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Heraldo Muñoz',
        age: 72,
        email: 'heralmun@hotmailer.com',
        password: bcrypt.hashSync('123456', PASSWORD_SALT),
        description: 'La convencion tiene que ser ciudadana para partir, con cuotas de género y pueblos indígenas. Con muchos independientes. Ya hice un llamado como presidente del PPD -respaldado por Directiva Nacional- a incluir independientes , y he recibido expresiones de interés de algunas personalidades y líderes independientes.',
        resume: 'Cientista político y político chileno, miembro del Partido por la Democracia, partido del cual soy su presidente desde julio de 2018. Soy especialista en relaciones internacionales. Ejercí como ministro de Relaciones Exteriores del segundo gobierno de Michelle Bachelet.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('constituents', constituentsData);

    const constituents = await queryInterface.sequelize.query('SELECT id from  CONSTITUENTS;');
    const constituentRows = constituents[0];

    const postsData = [
      {
        content: 'Las críticas a la legitimidad que tienen las colectividades para elegir al elenco y las dificultades que impone el sistema a los candidatos independientes tiene hoy a todas las tiendas discutiendo propuestas para la integración de la sociedad civil en el proceso.',
        constituentId: constituentRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Me gustaría trabajar y ayudar todo lo posible para que sea un lugar de conversación sensata, donde todos se escuchen, donde la gente le ponga más atención a lo que dice el otro que a lo que piensa ella misma',
        constituentId: constituentRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'La convencion debe reflejar a la sociedad',
        constituentId: constituentRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Todavía no se definen por completo las reglas del juego del itinerario constituyente.',
        constituentId: constituentRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Si resulta vencedora la opción de reformar la Carta Magna a través de la convención constituyente, los partidos deberán encontrar 155 candidatos',
        constituentId: constituentRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Las críticas a la legitimidad que tienen las colectividades para elegir al elenco y las dificultades que impone el sistema a los candidatos independientes tiene hoy a todas las tiendas discutiendo propuestas para la integración de la sociedad civil en el proceso.',
        constituentId: constituentRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'El PPD, el PR y la DC anunciaron que propondrán a la futura comisión técnica del proceso constituyente que se prohíban los pactos entre partidos para potenciar la presencia de candidatos sin militancia.',
        constituentId: constituentRows[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Lo único imposible es aquello que no intentas',
        constituentId: constituentRows[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Para mí el constituyente modelo no es el que más sabe de Derecho Constitucional ni necesariamente el que representa solamente a los suyos, para mí es un tipo que entendiendo la discusión de fondo y tratando de representar a quienes lo eligieron, al mismo tiempo es capaz de sentarse a conversar y llegar a acuerdos con aquellos que no piensan igual',
        constituentId: constituentRows[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'En los partidos ya discuten cómo se definirá la selección de candidatos para la convención constituyente (100% ciudadana) o para la convención mixta (ciudadanía y parlamentarios)',
        constituentId: constituentRows[5].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'En la convencion me gustaria que las ONGs y fundaciones con prestigio social puedan estar presentes. También que las agrupaciones gremiales estén presentes',
        constituentId: constituentRows[5].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'En un momento tan decisivo como el que estamos viviendo en Chile, nadie puede restarse, y los que creamos que hay algo que aportar, hay que hacerlo',
        constituentId: constituentRows[6].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Hay que tener capacidad de escuchar visiones distintas.',
        constituentId: constituentRows[7].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'En general se trata de que la pluralidad y diversidad de la sociedad pueda expresarse y dialogar sus coincidencias y diferencias en función del bien común.',
        constituentId: constituentRows[7].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const valorEsperado = await queryInterface.bulkInsert('posts', postsData);
    return valorEsperado;
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('constituents', null, {});
    queryInterface.bulkDelete('posts', null, {});
  },
};
