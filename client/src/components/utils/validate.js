const validate = (form,setErrors) => {
    let obj={}

     if (/^[a-zA-Z0-9\s]{2,100}$/.test(form.name)){obj.name=""}
    else{
      obj.name="El nombre de la actividad no es valida"
    }
     if (form.CountryId.length === 0){obj.CountryId="Debes Seleccionar al menos un pais" 
    }else{
      obj.CountryId=""
    }
    
   if(form.difficulty===""){obj.difficulty= "Seleccione una dificultad" 
  }else{
    obj.difficulty=""
   
  }
  if (form.duration==="") { obj.duration="Seleccione una duracion" 
}else{
  
    obj.duration=""
  
}
  
    if (form.season===""){obj.season="Seleccione una estacion" 
  }else{
    
      obj.season=""
   
  }
setErrors({...obj})
 
    
  };
  export default validate;