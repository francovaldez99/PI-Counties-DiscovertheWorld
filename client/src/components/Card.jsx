import React from "react";
import style from "./Card.module.css";
import {useNavigate} from "react-router-dom"
import { useState ,useEffect} from "react";
import { connect } from 'react-redux'
import { getAllCountries } from "../redux/actions/actions";



function Card(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
const handleBtn=()=>{
  props.getAllCountries()
  navigate(`/${props.id}`)
}
  return (
  
     <div className={style.CardContenedor}>
       <div className={style.Card}>
        {!isLoading ?
        <>
           <img src={props.flag} alt={props.name}  className={style.cardImage} />
           {props.name.length>=21?<h5 style={{fontSize:"14px"}} onClick={handleBtn}>{props.name}</h5>:<h5 onClick={handleBtn}>{props.name}</h5>}
         </>:<div className={style.isLoading}>Loading...</div>} 
         
       
       </div>
       
     </div>

    
  );
}

const mapDispatchToProps=dispatch=>{
  return{
    getAllCountries: () => dispatch(getAllCountries()),
  }
}

export default connect(null, mapDispatchToProps)(Card)
