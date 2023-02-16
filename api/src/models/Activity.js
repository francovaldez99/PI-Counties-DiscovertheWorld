/**Actividad Turística con las siguientes propiedades:
ID
Nombre
Dificultad (Entre 1 y 5)
Duración
Temporada (Verano, Otoño, Invierno o Primavera) */

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Activity",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 100],
        },
      },
      difficulty: {
        type: DataTypes.ENUM,
        values: ["Relaxed", "Adventure", "Extreme", "Survival", "Elite"],
        allowNull: false,
      },
      duration: {
        type: DataTypes.ENUM,
        values: [
          "One day",
          "Two to three days",
          "One week",
          "Two weeks or more",
          "Several months",
        ],
        allowNull: false,
      },
      season: {
        type: DataTypes.ENUM,
        values: ["Summer", "Autumn", "Winter", "Spring"],
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

/*dificultad:
Relaxed: This level of difficulty is designed for people who prefer a more relaxed and easy-going tourism experience. The activities at this level focus on easy to reach destinations, basic sightseeing, and simple activities like hiking, bike rides, and cultural visits.

Adventure: This level of difficulty is designed for people who are looking for more adventurous activities. The activities at this level focus on more challenging destinations, adventure sports and off-the-beaten-path experiences.

Extreme: This level of difficulty is designed for experienced travelers who are looking for more extreme and remote destinations, activities like rock climbing, rafting, and backpacking in remote areas.

Survival: This level of difficulty is for the most skilled and experienced travelers who are looking for extremely challenging destinations, activities such as trekking in high altitude, exploring remote wilderness, and engaging in survival skills.

Elite: This level of difficulty is for the best of the best, the ones who have already mastered all the concepts, they are looking for extremely hard, unique and exclusive experiences that push the boundaries of what is currently possible, such as climbing the highest peaks, and visiting the most remote places. */

/*Duracion */
/*One day: This type of activity lasts for one day, usually it starts early in the morning and finish by late evening.

Two to three days: This type of activity lasts for two or three days, usually it starts on Friday evening and ends on Sunday evening.

One week : This type of activity lasts for one week, usually it starts on Monday or Friday evening and ends on Friday or Monday evening.

Two weeks or more: This type of activity lasts for two weeks or more, usually it starts on a weekend and ends on a weekend.

Several months: This type of activity lasts for several months, it is a journey that takes travelers around the world visiting multiple destinations in different countries. */



/*
Visitar lugares y monumentos históricos como las Grandes Pirámides de Egipto, el Coliseo de Roma y el Taj Mahal de la India.
Ir de safari para ver la vida silvestre en parques nacionales como el Parque Nacional Serengeti en Tanzania, el Parque Nacional Kruger en Sudáfrica y el Maasai Mara en Kenia.

Tomar un crucero para explorar hermosas regiones costeras como los mares Mediterráneo y Caribe.

Esquí y snowboard en centros turísticos famosos como Aspen, Vail y Zermatt.

Visitar museos famosos como el Smithsonian en Washington, DC, el Museo Británico en Londres y el Louvre en París.

Disfrutando de las playas en lugares como Bali, Tailandia y las islas del Caribe.

Compras en ciudades como Nueva York, París y Tokio.

Explorando sitios religiosos como el Vaticano en Roma, La Meca y Medina en Arabia Saudita y el Templo Dorado en India.
Disfrutando de parques temáticos como Disneyworld y Universal Studios.
Realizar visitas guiadas para explorar maravillas naturales como el Gran Cañón y el Parque Nacional de Yellowstone. */