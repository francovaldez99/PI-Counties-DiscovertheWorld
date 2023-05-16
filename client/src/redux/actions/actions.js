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
    let response = await axios.get("/countries");
    return dispatch({ type: GET_ALL_COUNTRIES, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};


export const getCountriesFilter = (data) => (dispatch) => {
  const { continent, subregion, difficulty, duration, season, name } = data;
  if (!name) {
    return axios.get(
      `/countries/search?continent=${continent}&&subregion=${subregion}&&difficulty=${difficulty}&&duration=${duration}&&season=${season}`
    )
     
      .then((response) => dispatch({ type: GET_FILTER_COUNTRIES_C, payload: response.data }))
      .catch((err) => console.log(err));
  } else {
    return axios.get(`/countries/search?name=${name}`)
      .then((response) => dispatch({ type: GET_FILTER_COUNTRIES_C, payload: response.data }))
      .catch((err) => console.log(err));
  }
};

export const FinalFiltrado=data=>(dispatch)=>{
  //const {selectName,selectValue}=data
  return dispatch({type:GET_FILTER_COUNTRIES,payload:data})
}


export const getCountryDetail = (id) => (dispatch) => {
  return axios.get(`/countries/${id}`)
    .then((response) => dispatch({ type: GET_COUNTRY_DETAIL, payload: response.data }))
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