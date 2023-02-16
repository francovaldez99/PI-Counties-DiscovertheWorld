import axios from "axios";
export const GET_ALL_COUNTRIES = " GET_ALL_COUNTRIES";
export const GET_FILTER_COUNTRIES_C = "GET_FILTER_COUNTRIES_C";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const GET_FILTER_COUNTRIES=" GET_FILTER_COUNTRIES"
export const INCREMENT_CURRENT_PAGE="INCREMENT_CURRENT_PAGE"
export const DECREMENT_CURRENT_PAGE="DECREMENT_CURRENT_PAGE"
export const UPDATE_CURRENT_PAGE="UPDATE_CURRENT_PAGE"




export const getAllCountries = () => async (dispatch) => {
  //Tu código acá
  try {
    let response = await axios.get("http://localhost:3001/countries");
    return dispatch({ type: GET_ALL_COUNTRIES, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};


export const getCountriesFilter = (data) => (dispatch) => {
  const { continent, subregion, difficulty, duration, season, name } = data;
  if (!name) {
    return fetch(
      `http://localhost:3001/countries/search?continent=${continent}&&subregion=${subregion}&&difficulty=${difficulty}&&duration=${duration}&&season=${season}`
    )
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_FILTER_COUNTRIES_C, payload: data }))
      .catch((err) => console.log(err));
  } else {
    return fetch(`http://localhost:3001/countries/search?name=${name}`)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_FILTER_COUNTRIES_C, payload: data }))
      .catch((err) => console.log(err));
  }
};

export const FinalFiltrado=data=>(dispatch)=>{
  //const {selectName,selectValue}=data
  return dispatch({type:GET_FILTER_COUNTRIES,payload:data})
}


export const getCountryDetail = (id) => (dispatch) => {
  return fetch(`http://localhost:3001/countries/${id}`)
    .then((response) => response.json())
    .then((data) => dispatch({ type: GET_COUNTRY_DETAIL, payload: data }))
    .catch((err) => console.log(err));
};

export const incrementCurrentPage=()=>{
  return (dispatch) =>{
    return dispatch({type:INCREMENT_CURRENT_PAGE })
  }
}
export const decrementCurrentPage=()=>{
  return (dispatch) =>{
    return dispatch({type:DECREMENT_CURRENT_PAGE})
  }
}

export const updateCurrentPage=(data)=>{
  return (dispatch) =>{
    return dispatch({type:UPDATE_CURRENT_PAGE, payload:data})
  }
}