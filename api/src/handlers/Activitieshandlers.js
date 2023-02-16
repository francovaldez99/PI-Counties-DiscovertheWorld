const { postActivity ,GetActivities} = require("../controllers/activitiesControllers");
const { Activity } = require("../db");

const activitieshandler = async (req, res) => {
  //mandare los paises
  const { name, difficulty, duration, season, CountryId } = req.body;

  try {
    const results = await postActivity(
      name,
      difficulty,
      duration,
      season,
      CountryId
    
    );
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const activitieshandlerget=async (req,res)=>{
  try {
    const results =await  GetActivities()
    res.status(200).json(results)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = { activitieshandler,activitieshandlerget };
