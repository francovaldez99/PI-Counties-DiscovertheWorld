/* POST /activities:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
Crea una actividad turística en la base de datos, relacionada con los países correspondientes */

const { Router } = require("express");
const {
    activitieshandler,activitieshandlerget
} = require("../handlers/Activitieshandlers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const ActivitiesRouter = Router();

ActivitiesRouter.post("/", activitieshandler);
ActivitiesRouter.get("/", activitieshandlerget);




module.exports = ActivitiesRouter;
