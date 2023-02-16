import './App.css';
import Cards from './components/Cards';
import  Navbar2  from './components/Navbar2';
import { Route,useLocation, Routes } from "react-router-dom";
import CardDetail from './components/CardDetail';
import Form from './components/Form';
import { useState } from 'react';

function App() {
  const location = useLocation();
  const [porPagina, SetPorPagina] = useState(10);
  const [pagina,setPagina]=useState(1);



  return (
    
    <div className="App">
           
            {location.pathname === "/" && (<Navbar2 SetPorPagina={SetPorPagina} pagina={pagina} setPagina={setPagina}/>)}
      
      <Routes>
     

        <Route path="/" element={<Cards porPagina={porPagina} SetPorPagina={SetPorPagina} pagina={pagina} setPagina={setPagina}/>}/>
        <Route path="/:countryId" element={<CardDetail/>}/>
        <Route path="/form" element={<Form/>}/>
       

       

      </Routes>
    </div>
  );
}

export default App;
