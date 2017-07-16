var db = require("../models");

module.exports = function(app) {
  app.get("/api/burgers", function(req, res) {
    db.Burger.findAll({}).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  app.post("/api/burgers", function(req, res) {
    db.Burger.create({
      name: req.body.name,
      eaten: req.body.eaten
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

  app.delete("/api/burgers/:id", function(req, res) {
    //console.log(req.params.id);
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });

  });
//***************************************************************
  app.put("/api/burgers", function(req, res) {
    db.Burger.update({
      name: req.body.text,
      eaten: req.body.eaten
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });
  });

};
