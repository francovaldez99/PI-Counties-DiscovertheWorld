import React from 'react'
import styles from "./Paginacion.module.css"



function Paginacion({pagina,setPagina,maximo}) {
  const nextPage=()=>{
        setPagina(pagina+1)
    }
        
    const previousPage=()=>{
        setPagina(pagina-1)
    }
   
  return (
    <div className={styles.Paginacion}>
        <button disabled={pagina===1 || pagina<1} onClick={previousPage} className={styles.BtnPaginacion}>Prev</button>
        <p> {pagina} de {maximo}</p>
        <button disabled={pagina===Math.ceil(maximo) || pagina>Math.ceil(maximo)} onClick={nextPage} className={styles.BtnPaginacion}>Next</button>
    </div>
        
  )
}




export default Paginacion
