const db = require('../models');
const Bulletin = db.bulletin;
const Eleve = db.eleve;
const Model = db.model;

exports.generateBulletin = async (req, res) =>{
  Eleve.find()
  .exec((err, result) =>{
    if(err) return res.status(500).send({message: err})
    result.map(item =>{
      Bulletin.findOne({eleve: item._id})
      .exec((err, result) =>{
        if(err) return res.status(500).send({message: err})
        if(result != null) return console.log("Bulletin existant")
        if(result == null){
          try
          {
            const bulletin = new Bulletin({
              eleve: item._id
            })
            bulletin.save((err, data) =>{
              if(err){
                return res.status(500).send({message: err});
              };
              data.save(async (err)=>{
                if(err){
                  return res.status(500).send({message: err});
                }
                // console.log({message: "Enregistrement reussie"})
              });
            });
          }
          catch{
            console.log(err)
            res.status(500).send(
              {
                message : "une erreur est survenue sur le serveur",
                error: err
              });
          }
        }
      })
    })
  })
}

exports.addMatieres = (req, res) =>{
  userData = req.body.matieres
  try
  {
    Bulletin.findById(req.body.id)
    .exec((err, result) =>{
      if(err){
        return res.status(500).send({message: err})
      }
      if(!result) return res.status(400).send({messege: "Identifiant incorrect"})
      if(result){
        if(result.matieres.length == 0){
          Bulletin.updateOne({_id: req.body.id},{$push: {matieres: req.body.matieres}})
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
              Bulletin.updateOne({_id: req.body.id},{$push: {matieres: req.body.matieres}})
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
  Bulletin.findOne({_id: req.body.nom})
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
          console.log(typeof(item._id))
          Bulletin.updateOne({$pull: {matieres: item}})
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

exports.getAllBulletin = (req, res) =>{
  Bulletin.find()
  .populate(
    {
      path: "eleve",
      select: "id nom prenom age classe"
    }
  )
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

exports.checkBulletinByNom = (req, res) =>{
  try{
    Bulletin.find({_id: req.params.id})
    .populate(
      {
        path: "eleve",
        select: "id nom prenom age classe"
      }
    )
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

exports.modifyNote = (req, res) =>{
  Bulletin.findOne({_id: req.body.nom})
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
          Bulletin.updateOne({}, {$pull: {matieres: item}})
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