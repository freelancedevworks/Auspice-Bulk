/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
const { v4: uuidv4 } = require('uuid');

const materialsData = {
  "materials": [
    {
      "type": "Coal",
      "description": "Coal is a combustible black or brownish-black sedimentary rock used as a fuel source in industries, power generation, and metallurgy.",
      "subcategories": [
        { "name": "Coking Coal", "image": "/assets/coal1.jpg", "description": "Used primarily in steel production due to its high carbon content and low ash residue." },
        { "name": "Thermal Coal", "image": "../assets/coal2.jpg", "description": "Mainly used for electricity generation in power plants through combustion." },
        { "name": "Pet Coke", "image": "../assets/coal3.jpg", "description": "A carbon-rich solid derived from oil refining, used as a fuel and in industrial processes." },
        { "name": "Lam Coke", "image": "../assets/coal4.jpg", "description": "Low-ash metallurgical coke used in the ferroalloy industry and blast furnaces." }
      ]
    },
    {
      "type": "Mineral Ores",
      "description": "Mineral ores are naturally occurring solid materials from which metals or minerals can be profitably extracted.",
      "subcategories": [
        { "name": "Iron Ore", "image": "../assets/ironOre.jpg", "description": "A key raw material in steel production, containing iron minerals like hematite and magnetite." },
        { "name": "Bauxite", "image": "../assets/bauxite.jpg", "description": "An ore rich in aluminum, processed to produce alumina and eventually aluminum metal." },
        { "name": "Limestone", "image": "../assets/limestone.jpg", "description": "A sedimentary rock used in cement production, steel manufacturing, and soil conditioning." },
        { "name": "Gypsum", "image": "../assets/gypsum.jpg", "description": "A mineral used in plaster, drywall, and cement manufacturing." }
      ]
    },
    {
      "type": "Construction Materials",
      "description": "Construction materials include raw materials used in building infrastructure and structures.",
      "subcategories": [
        { "name": "Clay", "image": "../assets/clay.jpg", "description": "A natural material used in ceramics, bricks, and pottery production." },
        { "name": "Clinker", "image": "../assets/clinker.jpg", "description": "An intermediate product in cement manufacturing, produced by heating limestone and clay." }
      ]
    },
    {
      "type": "Fertilizers",
      "description": "Fertilizers are substances used to enhance soil fertility and promote plant growth.",
      "subcategories": [
        { "name": "DAP (Diammonium Phosphate)", "image": "../assets/dap.jpg", "description": "A widely used phosphorus fertilizer that enhances root development and crop yield." },
        { "name": "Urea", "image": "../assets/urea.jpg", "description": "A nitrogen-rich fertilizer essential for plant growth and increased agricultural productivity." },
        { "name": "Rock Phosphate", "image": "../assets/redp.jpg", "description": "A natural mineral used as a source of phosphorus in organic farming." }
      ]
    },
    {
      "type": "Others",
      "description": "Other materials that do not fit into primary categories but are essential for various industries.",
      "subcategories": [
        { "name": "Logs", "image": "../assets/logs.jpg", "description": "Timber logs used in construction, furniture making, and paper production." },
        { "name": "Steel Products", "image": "../assets/steelp.jpg", "description": "Processed steel used in infrastructure, automobile, and machinery industries." },
        { "name": "Silica Sand", "image": "../assets/slicasand.jpg", "description": "A high-purity sand used in glass making, casting, and industrial applications." }
      ]
    }
  ]
};

module.exports = {
  up: async (queryInterface) => {
    const materials = materialsData.materials.map(material => ({
      id: uuidv4(),
      type: material.type,
      description: material.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('materials', materials);

    const insertedMaterials = await queryInterface.sequelize.query(
      `SELECT id, type FROM materials`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const subcategories = [];
    materialsData.materials.forEach(material => {
      const materialRecord = insertedMaterials.find(m => m.type === material.type);
      if (materialRecord) {
        material.subcategories.forEach(sub => {
          subcategories.push({
            id: uuidv4(),
            materialId: materialRecord.id,
            name: sub.name,
            description: sub.description,
            image: sub.image,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        });
      }
    });

    await queryInterface.bulkInsert('material_subcategories', subcategories);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('material_subcategories', null, {});
    await queryInterface.bulkDelete('materials', null, {});
  }
}; 