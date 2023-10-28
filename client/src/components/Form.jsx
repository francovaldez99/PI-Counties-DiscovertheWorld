import React from "react";
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { getCountriesFilter,getAllCountries } from "../redux/actions/actions";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import validate from "./utils/validate";
import axios from "axios";

export const Form = (props) => {
  const navigate = useNavigate();
  const continentNames = Object.keys(props.continents);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedSubregion, setSelectedSubregion] = useState("");
  const [FormStylesError, setFormStylesError] = useState({
    name: false,
    CountryId: false,
    duration:false,
    season:false,
    difficulty:false
  });


  const [form, setForm] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    CountryId: [],
  });
  const [errors, setErrors] = useState({
    name:"",
    difficulty:"",
    duration:"",
    season:"",
    CountryId:"",
  });

  const [selectedValue, setSelectedValue] = useState({
    continent: "",
    subregion: "",
    name: "",
  });
  
  useEffect(() => {
    props.getAllCountries()
    validate(form,setErrors)
  }, [form]);

  const handleChangeCountry = (event) => {
    const { value } = event.target;
    if (form.CountryId.includes(value)) {
      setForm({
        ...form,
        CountryId: [...form.CountryId].filter((element) => element !== value),
      });
    } else if (value !== "") {
      setForm({ ...form, CountryId: [...form.CountryId, value] });
      setSelectedValue({
        ...selectedValue,
        name: "",
        continent: "",
        subregion: "",
      });
      setSelectedSubregion("");
      setSelectedContinent("");
    }
  };
  const BtnCountry = (event) => {
    const { value } = event.target;
    setForm({
      ...form,
      CountryId: [...form.CountryId].filter((element) => element !== value),
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
    

  };
  const submitHandler = (event) => {
    event.preventDefault();
    const errorsArrays=Object.keys(errors)
    console.log(errors)
   if (errors.name || errors.CountryId || errors.difficulty || errors.duration || errors.season) {
   for (const element of errorsArrays) {
    if(errors[element])FormStylesError[element]=true
   }
   console.log(FormStylesError)
  
   }else{
    console.log(form);
 axios
      .post("/activities", form)
      .then((res) => alert("Actividad Creada Exitosamente"))
      .catch((err) => alert(err));
  
  
  setForm({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    CountryId: [],  
  })  
  setFormStylesError({
    name: false,
    CountryId: false,
    duration:false,
    season:false,
    difficulty:false
  })
}
};
  
  
    

      
  
   

  const HandleContinent = (event) => {
    setSelectedContinent(event.target.value);
    setSelectedValue({ ...selectedValue, continent: event.target.value });
  };
  const HandleSubregion = (event) => {
    const { value } = event.target;
    setSelectedSubregion(value);
    setSelectedValue({ ...selectedValue, subregion: value });
  };


  return (
    <>
    <h1 className={styles.NavTitle}>Create Activity</h1>
      <div className={styles.form}>
        <button onClick={() => navigate("/")} className={styles.BtnBack}>
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
      
          <form onSubmit={submitHandler} className={styles.Form}>
            <div className="Input">
              <label htmlFor="name" className={styles.LabelForm}>Nombre de la actividad:</label>
              <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="off"
                  onChange={handleChange}
                  className={styles.InputForm}
                  value={form.name}
                  placeholder="Ingrese Actividad"
                />
            </div>
            {FormStylesError.name && <p className={styles.pErrors}>{errors.name}</p>}
      
            <div className={styles.SectionSelectCountry}>
      
              <div className="SectionContinent">
                <select name="continent" onChange={HandleContinent} value={selectedValue.continent}>
                  <option value="" >Filter by Continent</option>
                  {continentNames.map((value, index) => (
                    <option key={index} value={value} >
                      {value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="Selectsubregion">
                <select
                  name="subregion"
                  onChange={HandleSubregion}
                  value={selectedValue.subregion}
                >
                  <option value="">Filter by Subregion</option>
                  {props.continents[selectedContinent] &&
                    props.continents[selectedContinent].map((subregion,index) => (
                      <option key={subregion} value={subregion} id={index}>
                        {subregion}
                      </option>
                    ))}
                </select>
              </div>
              <div className="SelectCountry">
                <select
                  name="country"
                  onChange={handleChangeCountry}
                  value={selectedValue.continent}
                  className={errors.CountryId && styles.SelectCountry}
                >
                  <option value="">Select a Country</option>
                  {[...props.countries].filter((country) =>
                        country.subregion === selectedSubregion ||
                        (country.continent === "Antarctic" &&
                          selectedContinent === "Antarctic"))
                    .map((country,index) => (
                      <option
                        key={country.name}
                        value={country.id}
                        name={country.name}
                        id={index}>{country.name}</option>
                    ))}
                </select>
              </div>
            </div>
            <div className="CountryBtn">
              {[...form.CountryId].map((country,index) => (
                <>
                  <button onClick={BtnCountry} value={country} key={country} id={index}>{country}</button>
                </>
      
               ))}
               {FormStylesError.CountryId && <p className={styles.pErrors}>{errors.CountryId}</p>}
      
            </div>
            <div className="Selectduration">
              <select
                name="duration"
                onChange={handleChange}
                value={form.duration}>
                <option value="">Select a duration</option>
                <option key={"One day"} value={"One day"}>One day</option>
                <option key={"Two to three days"} value={"Two to three days"}>Two to three days</option>
                <option key={"Two weeks or more"} value={"Two weeks or more"}>Two weeks or more</option>
                <option key={"Several months"} value={"Several months"}>Several months</option>
              </select>
            </div>
            {FormStylesError.duration && <p className={styles.pErrors}>{errors.duration}</p>}
      
            <div className="SelectDifficulty">
              <select
                name="difficulty"
                onChange={handleChange}
                value={form.difficulty}
              >
                <option value="">Select a difficulty</option>
                <option key={"Relaxed"} value={"Relaxed"}>Relaxed</option>
                <option key={"Adventure"} value={"Adventure"}>Adventure</option>
                <option key={"Extreme"} value={"Extreme"}>Extreme</option>
                <option key={"Survival"} value={"Survival"}>Survival</option>
                <option key={"Elite"} value={"Elite"}>Elite</option>
              </select>
            {FormStylesError.difficulty && <p className={styles.pErrors}>{errors.difficulty}</p>}
            </div>
      
            <div className="SelectSeason">
              <select
                name="season"
                onChange={handleChange}
                value={form.season}
              >
                <option value="">Select a season </option>
                <option key={"Summer"} value={"Summer"}>Summer</option>
                <option key={"Autumn"} value={"Autumn"}>Autumn</option>
                <option key={"Winter"} value={"Winter"}>Winter</option>
                <option key={"Spring"} value={"Spring"}>Spring</option>
              </select>
            {FormStylesError.season && <p className={styles.pErrors}>{errors.season}</p>}
            </div>
      
            <button type="submit" >
              SUBMIT
            </button>
          </form>
      
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  countries: state.allCountries,
  continents: state.continents,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCountriesFilter: (value) => dispatch(getCountriesFilter(value)),
    getAllCountries: () => dispatch(getAllCountries()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
