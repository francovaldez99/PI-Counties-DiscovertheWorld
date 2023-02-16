const { Router } = require("express");
const {
  countrieshandler,
  countryidhandler,countryfilterhandler
} = require("../handlers/countrieshandlers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countriesRouter = Router();

countriesRouter.get("/", countrieshandler);
countriesRouter.get("/search", countryfilterhandler);
countriesRouter.get("/:id", countryidhandler);


/**[ ] GET /countries:
En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
Obtener un listado de los paises.
[ ] GET /countries/{idPais}:
Obtener el detalle de un país en particular
Debe traer solo los datos pedidos en la ruta de detalle de país
Incluir los datos de las actividades turísticas correspondientes
[ ] GET /countries?name="...":
Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
Si no existe ningún país mostrar un mensaje adecuado
[ ] POST /activities:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
Crea una actividad turística en la base de datos, relacionada con los países correspondientes */

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = countriesRouter;
