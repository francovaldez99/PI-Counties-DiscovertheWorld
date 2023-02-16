import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams,useNavigate } from 'react-router-dom'
import {getCountryDetail,getAllCountries} from "../redux/actions/actions"
import styles from "./CardDetail.module.css"
import imgtachas from "../imgs/Black_Animated_2023_Loading_New_Year_Instagram_Post-removebg-preview.png"


export const CardDetail= (props) => {
const{countryId}=useParams()
const navigate = useNavigate();

  useEffect(()=>{
    props.getCountryDetail(countryId)
  },[])

  const handleBtnBack=()=>{
    setTimeout(()=>{
      navigate("/")
      
    },1000)
  }
  return (
    <div className={styles.DetailContenedor}>
      <button onClick={handleBtnBack} className={styles.BtnBack}><span class="material-symbols-outlined">
arrow_back
</span></button>

      <div className={styles.ImgDetailContainer}>
      <img src={imgtachas} alt="" srcset="" width="40px" className={styles.tachadebandera}/>

        <img src={props.detail.flagImage} alt={props.detail.name} width="350px" className={styles.ImgDetail}/>
        </div>

      
      <div className={styles.DetailCountry}>
        <div className={styles.DetailCountryInside}>
        <img src={imgtachas} alt="" srcset="" width="40px"/>

          <h5>{props.detail.name}</h5>
          <h5>Continent:<b>{props.detail.continent}</b></h5>
          <h5>Capital:{props.detail.capital?<b>{props.detail.capital}</b>:"Sin Capital"}</h5>
          <h5>Area:<b>{props.detail.area}</b></h5>
          <h5>population:<b>{props.detail.population}</b></h5>
        </div>
      </div>
      
      <div className={styles.Activities}>
          {props.detail.Activities?.map(activity=>(
          <div >
            <div className={styles.ContainerAct}>
              <div className={styles.ContainerActinside}>
                <img src={imgtachas} alt="" srcset="" width="40px" className={styles.tacha}/>
                <p>{activity.name}</p>
                <p>{activity.difficulty}</p>
                <p>{activity.duration}</p>
                <p>{activity.season}</p>
              </div>
            </div>
          </div>))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
    detail:state.detail
});

const mapDispatchToProps = (dispatch)=>{
  return {
    getCountryDetail:(id)=>dispatch(getCountryDetail(id)),
    getAllCountries: () => dispatch(getAllCountries()),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetail)