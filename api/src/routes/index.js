const countriesRouter = require("./countriesRouter");
const ActivitiesRouter = require("./ActivitiesRouter");

const { Router } = require("express");
const mainRouter = Router();

mainRouter.use("/countries", countriesRouter);
mainRouter.use("/activities", ActivitiesRouter);

module.exports = mainRouter;
