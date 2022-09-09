const controller = require('../controllers/bulletin.controller');

module.exports = function (app){
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post('/bulletin', controller.generateBulletin);
  app.get('/bulletin/:id', controller.checkBulletinByNom);
  app.get('/bulletin', controller.getAllBulletin);
  app.put('/bulletin/add', controller.addMatieres);
  app.put('/bulletin/delete', controller.deleteMatiere);
  // app.put('/bulletin', controller.updateMatiere)
}