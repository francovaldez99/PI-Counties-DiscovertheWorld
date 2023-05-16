import React from "react";
import styles from "./Cards.module.css";
import Card from "./Card";
import Paginacion from "./Paginacion";
import { connect } from "react-redux";
import {  getCountriesFilter,getAllCountries } from "../redux/actions/actions";
import { useState,useEffect } from "react";

export const Cards = (props) => {
  const [state, setState] = useState({
    sortOrder: "none"
  });
 
  useEffect(() => {
    props.getAllCountries()
    
}, []);

  const handleSortOrderChange = (event) => {
    setState({ ...state, sortOrder: event.target.value });
  };
  const sortCountries = () => {
    if (state.sortOrder === "asc") {
      return [...props.countries].sort((a, b) => a.name.localeCompare(b.name));
    } else if (state.sortOrder === "desc") {
      return [...props.countries].sort((a, b) => b.name.localeCompare(a.name));
    } else if (state.sortOrder === "population_asc") {
      return [...props.countries].sort((a, b) => a.population - b.population);
    } else if (state.sortOrder === "population_desc") {
      return [...props.countries].sort((a, b) => b.population - a.population);
    } else {
      return [...props.countries];
    }
  };
  const maximo=Math.ceil((sortCountries().length)/props.porPagina)


  return (
    <>
      <div className={styles.sortContainer}>
      <input
            type="radio"
            name="sort-order"
            value="none"
            id="notSort"
            checked={state.sortOrder === "none"}
            onChange={handleSortOrderChange}
          />
<label for="notSort">not Sort</label>
              <input
            type="radio"
            name="sort-order"
            value="asc"
            id="sortAZ"
            checked={state.sortOrder === "asc"}
            onChange={handleSortOrderChange}
          />
<label for="sortAZ"> Sort A-Z</label>
             <input
            type="radio"
            name="sort-order"
            value="desc"
            id="sortZA"
            checked={state.sortOrder === "desc"}
            onChange={handleSortOrderChange}
          />
  <label for="sortZA">Sort Z-A</label>
           <input
            type="radio"
            name="sort-order"
            value="population_asc"
            id="sortpopulation_asc"
            checked={state.sortOrder === "population_asc"}
            onChange={handleSortOrderChange}
          />
<label for="sortpopulation_asc">Sort by Decreasing Population</label>
               <input
            type="radio"
            name="sort-order"
            value="population_desc"
            id="sortpopulation_desc"
            checked={state.sortOrder === "population_desc"}
            onChange={handleSortOrderChange}
          />
        <label for="sortpopulation_desc">Sort by Increasing Population</label>
        
        
        
        

      </div>
   
     

      <div className={styles.cardsContainer}>
        {sortCountries().length
          ? sortCountries().
          slice((props.pagina-1)*(props.pagina===1?9:(props.porPagina))
          ,(props.pagina-1)*(props.pagina===1?9:(props.porPagina))+(props.pagina===1?9:(props.porPagina))).map((pais, index) => {
              return (
                <Card
                  id={pais.id}
                  key={index}
                  flag={pais.flagImage}
                  name={pais.name}
                  population={pais.population}
                  region={pais.continent}
                  capital={pais.capital}
                />
              );
            })
          : <div>
          </div>}
      </div>
        <Paginacion pagina={props.pagina} setPagina={props.setPagina}  maximo={maximo} SetPorPagina={props.SetPorPagina} />
    </>
  );
};

const mapStateToProps = (state) => ({
  countries: state.countries,
  continents: state.continents,
  currentPage:state.currentPage

});

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCountries: () => dispatch(getAllCountries()),
    getCountriesFilter: (value) => dispatch(getCountriesFilter(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
