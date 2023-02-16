const { json } = require("body-parser");
const {
  getCountries,
  getCountryById,
  getCountryByQuery,
  searchByQuery
} = require("../controllers/countriesControllers");

const countrieshandler = async (req, res) => {
  //mandare los paises
  const { name } = req.query;
  try {
    const results = name ? await getCountryByQuery(name) : await getCountries();
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/****************************************************************** */

const countryidhandler = async (req, res) => {
  //mandare el pais por id
  const { id } = req.params;

  try {
    const results = await getCountryById(id);
    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
/****************************************************************** */

const countryfilterhandler=async(req, res)=>{
  const {continent,subregion,difficulty,duration,season,name,nameactivity}=req.query;

try {
  const results = await searchByQuery(continent,subregion,difficulty,duration,season,name,nameactivity);
    res.status(200).json(results);
} catch (error) {
  res.status(404).json({ error: error.message });
  
}
}
module.exports = {
  countrieshandler,
  countryidhandler,
  countryfilterhandler
};
