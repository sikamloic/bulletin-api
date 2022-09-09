const db = require('../models');
const Model = db.model;

exports.addmodel = (req, res) =>{
  Model.findOne({nom: req.body.nom})
  .exec((err, data) =>{
    if(err){
      return res.status(500).send({message: err});
    }
    if(data){
      return res.status(400).send({message: "ce bulletin existe déjà !!!"})
    }
    if(!data){
      try{
        const model = new Model({
          nom: req.body.nom,
        });
        model.save((err, data) =>{
          if(err){
            return res.status(500).send({message: err});
          };
          data.save(async (err)=>{
            if(err){
              return res.status(500).send({message: err});
            }
            res.send(
              {
                message: "Enregistrement reussie",
                result: data._id
              }
            )
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
  })
}

exports.addMatieres = (req, res) =>{
  userData = req.body.matieres
  try
  {
    Model.findById(req.body.id)
    .exec((err, result) =>{
      if(err){
        return res.status(500).send({message: err})
      }
      if(!result) return res.status(400).send({messege: "Identifiant incorrect"})
      if(result){
        if(result.matieres.length == 0){
          Model.updateOne({_id: req.body.id},{$push: {matieres: req.body.matieres}})
          .exec((err, result) =>{
            if(err){
              return res.status(500).send({message: err})
            }
            res.status(200).send({
              message: "Modification reussie",
              data: result
            })
          })
        }
        else{
          var tab = result.matieres
          tab.forEach((item) => {
            if(userData[0].nom != item.nom){
              Model.updateOne({_id: req.body.id},{$push: {matieres: req.body.matieres}})
              .exec((err, result) =>{
                if(err){
                  return res.status(500).send({message: err})
                }
                res.status(200).send({
                  message: "Modification reussie",
                  data: result
                })
              })
            }
            else{
              return res.status(400).send({message: "Cette matière existe déjà"})
            }
          })
       }
      }
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

exports.deleteMatiere = (req, res) =>{
  Model.findOne({nom: req.body.nom})
  .exec((err, data) =>{
    if(err){
      return res.status(500).send({message: err});
    };
    if(!data){
      return res.status(404).send({message: "Les identifiants ne sont pas correstes !!!"})
    }
    if(data){
      var tab = data.matieres;
      tab.forEach(item =>{
        if(req.body.id == item._id){
          Model.updateOne({}, {$pull: {matieres: item}})
          .exec((err, result) =>{
            if(err){
              return res.status(500).send({message: err});
            };
            res.status(200).send({
              message: "Modification reussie",
              data: result
            })
          });
        }
      })
    }
  })
}

exports.getAllModel = (req, res) =>{
  Model.find()
  .sort({nom: -1})
  .exec((err, data) =>{
    if(err){
      res.status(500).send({message: err})
    }
    if (!data){
      return res.status(404).send({message: "Aucune information pour l'identifiant fourni"})
    }
    res.status(200).json(data)
  })
}

exports.checkModelByNom = (req, res) =>{
  try{
    Model.find({nom: req.params.id})
    .select("matieres")
    .exec((err, data) =>{
      if(err){
        return res.status(500).send({message: err});
      };
      return res.status(200).json(data);
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