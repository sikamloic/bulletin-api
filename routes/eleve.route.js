const controller = require('../controllers/eleve.controller');

module.exports = function (app){
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/eleve/register', controller.addEleve);
  app.get('/eleve/:id', controller.getEleveById);
  app.get('/eleve', controller.getAllEleve);
  app.put('/eleve/update', controller.updateEleve)
}