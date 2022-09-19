'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

//Carrega as rotas da aplicação
const indexRoutes = require('./routes/indexRoutes');

const routesGenero = require('./routes/routesGenero');
const routesNivelAutismo = require('./routes/routesNivelAutismo');
const routesResponsavel = require('./routes/routesResponsavel');
const routesCrianca = require('./routes/child_route');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json());

app.use('/', indexRoutes);
app.use('/genero', routesGenero);
app.use('/responsavel', routesResponsavel);
<<<<<<< Updated upstream
app.use('/children', childRoute);
app.use('/nivelAutismo', routesNivelAutismo);
=======
app.use('/crianca', routesCrianca);
>>>>>>> Stashed changes

module.exports = app;