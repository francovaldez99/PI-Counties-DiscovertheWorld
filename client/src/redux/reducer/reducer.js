import { GET_ALL_COUNTRIES,GET_COUNTRY_DETAIL,GET_FILTER_COUNTRIES,UPDATE_CURRENT_PAGE,DECREMENT_CURRENT_PAGE,INCREMENT_CURRENT_PAGE} from "../actions/actions";

const initialState = {
  countries: [],
  allCountries: [],
  detail: {},
continents: {
    Asia: [
      "Eastern Asia",
      "Southern Asia",
      "Western Asia",
      "South-Eastern Asia",
      "Central Asia",
    ],
    Africa: [
      "Western Africa",
      "Northern Africa",
      "Middle Africa",
      "Eastern Africa",
      "Southern Africa",
    ],
    Americas: [
      "Central America",
      "Caribbean",
      "South America",
      "North America",
    ],
    Europe: [
      "Western Europe",
      "Eastern Europe",
      "Northern Europe",
      "Central Europe",
      "Southern Europe",
      "Southeast Europe",
    ],
    Oceania: [
      "Australia and New Zealand",
      "Polynesia",
      "Melanesia",
      "Micronesia",
    ],
    Antarctic: [],
  },
  activities:[],
  currentPage : 1,
  pageSize :10,

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      let activitiesArray=[]
      action.payload.forEach(element => {
        element.Activities.forEach((actividad)=>{
          if(!activitiesArray.includes(actividad.name))activitiesArray.push(actividad.name)
        })
      });
      return {
        ...state,
        countries:action.payload,
        allCountries: action.payload,
        activities:activitiesArray
      };
     case GET_COUNTRY_DETAIL:
      return{
        ...state,
        detail:action.payload
      }   
      case INCREMENT_CURRENT_PAGE:
        return{
          ...state,
          currentPage:state.currentPage+1
        }

        case DECREMENT_CURRENT_PAGE:
          return{
            ...state,
            currentPage:state.currentPage-1
          }
          case UPDATE_CURRENT_PAGE:
            return{
              ...state,
              currentPage:action.payload
            }  
      case GET_FILTER_COUNTRIES:
      const {selectName,selectValue}=action.payload
      if (selectName==="continent") return {...state,countries:state.allCountries.filter((el)=>el.continent===selectValue || selectValue==="")}
      if (selectName==="subregion") return {...state,countries:state.allCountries.filter((el)=>el.subregion===selectValue || selectValue==="") }
      if (selectName==="duration") return {...state,countries:state.allCountries.filter((el)=>el.Activities.find((activity)=>activity.duration===selectValue) || selectValue==="") }
      if (selectName==="difficulty") return {...state,countries:state.allCountries.filter((el)=>el.Activities.find((activity)=>activity.difficulty===selectValue) || selectValue==="") }
      if (selectName==="season") return {...state,countries:state.allCountries.filter((el)=>el.Activities.find((activity)=>activity.season===selectValue) || selectValue==="") }
      if (selectName==="activity") return {...state,countries:state.allCountries.filter((el)=>el.Activities.find((activity)=>activity.name===selectValue) || selectValue==="") }
      if (selectName==="searchTerm") return {...state,countries:state.allCountries.filter((el)=>el.name.toLowerCase()===selectValue.toLowerCase() || el.name.toLowerCase().includes(selectValue.toLowerCase()) || selectValue==="")}
   
      break;




    default:
      return state;
  }
};

export default reducer;
