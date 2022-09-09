const controller = require('../controllers/model.controller');

module.exports = function (app){
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/model/register', controller.addmodel);
  app.put('/matieres/add', controller.addMatieres);
  app.get('/matieres/:id', controller.checkModelByNom);
  app.get('/model', controller.getAllModel);
  // app.put('/matieres/update', controller.updateMatiere)
  app.put('/matieres/delete', controller.deleteMatiere)
}