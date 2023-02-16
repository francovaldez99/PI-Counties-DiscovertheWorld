const { Activity } = require("../db");
const { Country } = require("../db");



const postActivity = async (name, difficulty, duration, season, CountryId) => {
    if (!name || !difficulty || !duration || !season || !CountryId) {
      throw Error("faltan datos");
    } else {
      const results = await Activity.create({ name, difficulty, duration, season });
  
      if (typeof CountryId === "string") {
        const resultCountry = await Country.findByPk(CountryId);
        resultCountry.addActivities(results);
      }else {
        for (let i = 0; i < CountryId.length; i++) {
            let resultCountry = await Country.findByPk(CountryId[i]);
            resultCountry.addActivities(results);
      }
  
    }
    return results;
  }}
  

const GetActivities=async ()=>{
const results=await Activity.findAll({
  include: [{ model: Country }],
})
if(!results) throw Error("NO SE ENCUENTRA LAS ACTIVITIES")
return results
}


module.exports = {
    postActivity,GetActivities
}