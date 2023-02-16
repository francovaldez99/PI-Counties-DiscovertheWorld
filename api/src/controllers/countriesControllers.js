const { Country, Activity } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const getCountries = async () => {
  let results = (await axios.get(`https://restcountries.com/v3/all`)).data;
  let size = await Country.count();
  console.log(size);

  if (size === 0) {
    results = await results.map((country) => {
      Country.create({
        id: country.cca3 ? country.cca3 : country.ccn3,
        name: country.name.common,
        flagImage: country.flags[0],
        continent: country.region,
        capital: country.capital ? country.capital.join() : "",
        subregion: country.subregion,
        area: country.area + " km²",
        population: country.population,
      });
    });
  }
  const dataBase = await Country.findAll( {
    include: [{ model: Activity }],
  });
  return dataBase;
};

const getCountryByQuery = async (name) => {
  const result = await Country.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } },
  });
  if (result.length ==0) {
    throw Error (`No hay coincidencias con ${name}`)
  }else return result
};

const getCountryById = async (id) => {
  const country = await Country.findByPk(id, {
    include: [{ model: Activity }],
  });

  if (country === null) {
    throw new Error("Country not found");
  } else {
    return country;
  }
};
/****************************************************************** */
// const searchByQuery=async(continent,subregion,difficulty,duration,season,name,nameactivity)=>{
//   const whereConditions = {}
//   let condicion=false
//   if (season || difficulty || duration ) {
//     condicion=true
//   }
//   if(continent) whereConditions.continent = continent;
//   if(subregion) whereConditions.subregion = subregion;
//   if(name)whereConditions.name=  { [Op.iLike]: `%${name}%` };
//   const results = await Country.findAll({
//   where: whereConditions,
//   include: [{
//     model: Activity,
//     required: condicion,
//     where: {
//       difficulty: difficulty || {[Op.ne]: null},
//       duration: duration || {[Op.ne]: null},
//       season: season || {[Op.ne]: null},
    

//       }
//   }]
//   });
//   return results;
// }

const searchByQuery = async (continent, subregion, difficulty, duration, season, name, nameactivity) => {
  const whereConditions = {};
  let condicion = false;
  if (season || difficulty || duration) {
  condicion = true;
  }
  if (continent) whereConditions.continent = continent;
  if (subregion) whereConditions.subregion = subregion;
  if (name) whereConditions.name = { [Op.iLike]: `%${name}%` };
  const results = await Country.findAll({
  where: whereConditions,
  include: [
  {
  model: Activity,
  required: condicion,
  where: {
  difficulty: difficulty || { [Op.ne]: null },
  duration: duration || { [Op.ne]: null },
  season: season || { [Op.ne]: null },
  [Op.or]: [{ name: { [Op.iLike]: `%${nameactivity}% `} } , { name: { [Op.ne]: null } }],},},
  ],
  });
  return results;
  };

module.exports = {
  getCountries,
  getCountryById,
  getCountryByQuery,
  searchByQuery
};
