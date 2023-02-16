import React from "react";
import { connect } from "react-redux";
import { FinalFiltrado} from "../redux/actions/actions";
import styles from "./Navbar2.module.css"
import { useNavigate } from "react-router-dom";

import { useState } from "react";
export const Navbar2 = (props) => {
  const navigate = useNavigate();
  const continentNames = Object.keys(props.continents);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [disabledOption, setDisabledOption] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedValue, setSelectedValue] = useState({
    name:"",
    continent: "",
    subregion: "",
    difficulty: "",
    duration: "",
    season: "",
    activity:""
  },);
  const handleSubmitInput = (event) => {
    event.preventDefault();
    setSelectedValue({
        name:"",
        continent: "",
        subregion: "",
        difficulty: "",
        duration: "",
        season: "",
        activity:""
    })
    props.FinalFiltrado({selectName:"searchTerm",selectValue:searchTerm})
    props.setPagina(1)
   
  };


  const handleChangeActivity = (event) => {
 
    
    const { value, name } = event.target;
    if (continentNames.includes(value)) {
    setSelectedContinent(value);
    setSelectedValue({
    name:"",
    continent: "",
    subregion: "",
    difficulty: "",
    duration: "",
    season: "",
    activity:"",
    [name]:value})
    }

    if (name === "subregion" && value !== "") {
        setDisabledOption(true);

        setSelectedValue({
                            name:"",
                    difficulty: "",
                    duration: "",
                    season: "",
                    activity:"",
                continent: selectedContinent,
                subregion:value

        })
        
    }else{
        setDisabledOption(false)
        
        setSelectedValue({
            name:"",
            continent: "",
            subregion: "",
            difficulty: "",
            duration: "",
            season: "",
            activity:"",
            [name]:value
        })
    }
    props.FinalFiltrado({selectName:name,selectValue:value})
    props.setPagina(1)

};


  return (
    <div>
        <h1 className={styles.NavTitle}>Discover the World</h1>
       

      
      <section className={styles.filters}>

     <select name="continent" value={selectedValue.continent} onChange={handleChangeActivity}>
     <option value="" disabled={disabledOption}>Filter by Continent</option>
            {continentNames.map((value, index) =>(
      <option key={index} value={value} disabled={disabledOption}>{value}</option>))}
</select>

  
    <select name="subregion" value={selectedValue.subregion} onChange={handleChangeActivity}>
      <option value="">Filter by Subregion</option>
      {props.continents[selectedContinent] &&
        props.continents[selectedContinent].map((subregion) => (
          <option key={subregion} value={subregion}>
            {subregion}
          </option>
        ))}
    </select>
     


     
<select name="duration" onChange={handleChangeActivity} value={selectedValue.duration}>
  <option value="">Filter by duration</option>
  <option key={"One day"} value={"One day"}>One day</option>
  <option key={"Two to three days"} value={"Two to three days"}>Two to three days</option>
  <option key={"Two weeks or more"} value={"Two weeks or more"}>Two weeks or more</option>
  <option key={"Several months"} value={"Several months"}>Several months</option>
</select>
      
      
<select name="difficulty" onChange={handleChangeActivity} value={selectedValue.difficulty}>
  <option value="">Filter by difficulty</option>
  <option key={"Relaxed"} value={"Relaxed"}>Relaxed</option>
  <option key={"Adventure"} value={"Adventure"}>Adventure</option>
  <option key={"Extreme"} value={"Extreme"}>Extreme</option>
  <option key={"Survival"} value={"Survival"}>Survival</option>
  <option key={"Elite"} value={"Elite"}>Elite</option>
</select>

<select name="season" onChange={handleChangeActivity} value={selectedValue.season}>
  <option value="">Filter by season </option>
  <option key={"Summer"} value={"Summer"}>Summer</option>
  <option key={"Autumn"} value={"Autumn"}>Autumn</option>
  <option key={"Winter"} value={"Winter"}>Winter</option>
  <option key={"Spring"} value={"Spring"}> Spring</option>
</select>


  
<div className={styles.SearchandFilterAct}>
<div>
  <button className={styles.BtnCreateAct} onClick={()=>navigate("/form")}>Create Activity</button>
</div>
  <form onSubmit={handleSubmitInput}>
        <input type="text" placeholder="Search..." value={searchTerm} className={styles.inputSearch} onChange={(event) => setSearchTerm(event.target.value)}/>
  
       <button type="submit" className={styles.BtnSearch}> <span class="material-symbols-outlined" >search</span></button>
  </form>
  <select name="activity"  onChange={handleChangeActivity} value={selectedValue.activity}>
      <option value="">Filter by Activity</option>
      {props.activities.map(activity=>(<option key={activity} value={activity}>{activity}</option>))}
      </select>
</div>  
</section>

      
    </div>
  );
};

const mapStateToProps = (state) => ({
  continents: state.continents,
  activities:state.activities
});

const mapDispatchToProps = (dispatch) => {
  return {
    FinalFiltrado:(data)=>dispatch(FinalFiltrado(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar2);
