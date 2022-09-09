const db = require('../models');
const Eleve = db.eleve;

exports.addEleve = (req, res) =>{
  try{
    const eleve = new Eleve({
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        classe: req.body.classe
    });
    eleve.save((err, data) =>{
      if(err){
        return res.status(500).send({message: err});
      };
      data.save(async (err)=>{
        if(err){
          return res.status(500).send({message: err});
        }
        res.send({message: "Enregistrement reussie"})
      });
    });
  }
  catch (err) {
    console.log(err)
    res.status(500).send(
      {
        message : "une erreur est survenue sur le serveur",
        error: err
      });
  }
}

exports.getAllEleve = (req, res) =>{
  try {
      Eleve.find()
      .sort({nom: 1})
      .select("nom prenom age classe")
      .exec((err,result)=>{
          if(err){
              return res.status(500).send({message: err});
          };
          return res.status(200).json(result);
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          message: "une erreur sur le serveur",
          err: error
      });
  }
}

exports.getEleveById = (req, res) =>{
  try {
    Eleve.find({nom: req.params.id})
    .select("nom prenom age classe")
    .exec((err, resultat) =>{
        if(err){
          return res.status(500).send({message: err});
        };
        return res.status(200).json(resultat);
    })
  } 
  catch (error) {
    console.log(error);
    res.status(500).send({
        message: "une erreur sur le serveur",
        err: error
    });  
  }
}

exports.updateEleve = (req, res) => {
  var userData = {};

  if (req.body.nom) userData.nom = req.body.nom;
  if (req.body.prenom) userData.prenom = req.body.prenom;
  if (req.body.age) userData.numero = req.body.age;
  if (req.body.classe) userData.ville = req.body.classe;

  try {
    Eleve.updateOne({ $set: userData })
    .exec((err, resultat) =>{
        if(err){
          res.status(500).send({message: err})
        }
        if (!resultat){
          return res.status(404).send({message: "Aucune information pour l'identifiant fourni"})
        }
        res.status(200).send({
          message: "Modification reussie",
          data: resultat
        })
    })
  } 
  catch (error) {
      console.log(error);
      res.status(500).send({
        message: "une erreur sur le serveur",
        err: error
      });
  }
};

exports.deleteEleve = (req, res) =>{
  const id = req.params.id;
  if(id.length != 24){
      res.status(400).send("ideantifiant invalide")
  };
  try {
      Eleve.remove({_id: id}).exec((err, resultat) =>{
          if(err){
              return res.status(500).send({message: err});
          };
          res.status(200).json({message: "suppression réussie"})
      });
  } catch (error) {
      console.log(error);
      res.status(500).send({
          message: "une erreur sur le serveur",
          err: error
      });
  }
};