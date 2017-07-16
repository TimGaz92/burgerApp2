
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET 
  app.get("/api/burgers", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Burger.findAll({}).then(function(dbBurger) {
      // We have access to the todos as an argument inside of the callback function
      res.json(dbBurger);
    });
  });

  // POST route for saving a new todo
  app.post("/api/burgers", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Burger.create({
      name: req.body.name,
      eaten: req.body.eaten
    }).then(function(dbBurger) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbBurger);
    });
  });

  // DELETE route for deleting todos. We can get the id of the todo to be deleted from
  // req.params.id
  app.delete("/api/burgers/:id", function(req, res) {
    // We just have to specify which todo we want to destroy with "where"
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbBurger) {
      res.json(dbBurger);
    });

  });
//***************************************************************88
  // PUT
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
