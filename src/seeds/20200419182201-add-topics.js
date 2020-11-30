module.exports = {
  up: async (queryInterface) => {
    const topicsData = [
      {
        name: 'Aborto',
        description: 'Legalidad del aborto. El aborto fue definido como delito en el Código Penal de 1874. Sin embargo, en 1931 se establecieron excepciones con fines terapéuticos en el Código Sanitario. Dicha excepción se mantuvo hasta 1989, cuando la dictadura militar de Augusto Pinochet penalizó nuevamente todo tipo de interrupción voluntaria del embarazo.  El gobierno de Michelle Bachelet presentó en 2015 un proyecto de ley que despenalizaba parcialmente el aborto, únicamente en las causales de violación, inviabilidad fetal y riesgo para la vida de la madre.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gratuidad educacion superior',
        description: 'Miembros que estudien en instituciones de educacion superior a este beneficio, no deberán pagar el arancel ni la matrícula en su institución durante la duración formal de la carrera.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Sistemas de pensiones / AFP',
        description: 'Las administradoras de fondos de pensiones (AFP) de Chile son instituciones financieras privadas encargadas de administrar los fondos de cuentas individuales de ahorros para pensiones. Establecidas bajo el sistema de capitalización individual, se basa en que cada persona ahorra una parte de sus ingresos para sostener una pensión al momento de su jubilación. Se cuestiona el cambio o mejora del sistema de pensiones',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Matrimonio Igualitario',
        description: 'Aprobar o no el matrimonio entre personas del mismo sexo, también conocido como matrimonio homosexual, matrimonio igualitario o matrimonio gay. Crear la institución que reconoce legal o socialmente un matrimonio formado por dos varones o dos mujeres.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Financiamiento Salud Publica',
        description: 'Los ingresos del sector público de salud se estipulan en el presupuesto nacional y provienen principalmente del aporte fiscal y transferencias de aportes previsionales de salud.El gasto en salud ha mantenido un aumento progresivo en los últimos años, con un crecimiento promedio anual de 9.3%, representando a la fecha un  6,6% del PIB. ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('topics', topicsData);

    const topics = await queryInterface.sequelize.query('SELECT id from TOPICS;');
    const topicRows = topics[0];

    const stancesData = [
      {
        name: 'Provida',
        topicId: topicRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Proaborto',
        topicId: topicRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Aborto en tres causales',
        topicId: topicRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Gratuidad universal',
        topicId: topicRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rechazo',
        topicId: topicRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Eliminar AFP',
        topicId: topicRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Continuar AFP sin cambios',
        topicId: topicRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Continuar AFP con cambios',
        topicId: topicRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Apruebo',
        topicId: topicRows[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rechazo',
        topicId: topicRows[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Se debe aumentar el crecimiento del financiamiento',
        topicId: topicRows[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Se debe mantener el crecimiento del financiamiento',
        topicId: topicRows[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Se debe disminuir el crecimiento del financiamiento',
        topicId: topicRows[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const valorEsperado = await queryInterface.bulkInsert('stances', stancesData);
    return valorEsperado;
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('topics', null, {});
    queryInterface.bulkDelete('stances', null, {});
  },
};
