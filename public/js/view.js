$(document).ready(function() {

  var newItemInput = $("input.new-item");

  var burgerContainer = $(".burger-container");

  $(document).on("click", "button.delete", deleteBurger);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".burger-item", editBurger);
  $(document).on("keyup", ".burger-item", finishEdit);
  $(document).on("blur", ".burger-item", cancelEdit);
  $(document).on("submit", "#burger-form", insertBurger);

  var burgers;

  getBurgers();


  function initializeRows() {
    //empty the container of pre-existing info
    burgerContainer.empty();
    //determine how many objects to add with an array
    var rowsToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
    //add data from array
      rowsToAdd.push(createNewRow(burgers[i]));
    }
    burgerContainer.prepend(rowsToAdd);
  }


  function getBurgers() {
    //url pathing for get 
    $.get("/api/burgers", function(data) {
      // console.log("burgers", data);
      burgers = data;
      initializeRows();
    });
  }

  // This function deletes a todo when the user clicks the delete button
  function deleteBurger() {
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/burgers/" + id
    })
    .done(function() {
      getBurgers();
    });//problematic
  }

  function toggleComplete() {
    var burger = $(this)
      .parent()
      .data("burger");
    burger.eaten = !burger.eaten;
    updateBurger(burger);
  }

  function editBurger() {
    var currentBurger = $(this).data("burger");
    $(this)
      .children()
      .hide();
    $(this)
      .children("input.edit")
      .val(currentBurger.name);
    $(this)
      .children("input.edit")
      .show();
    $(this)
      .children("input.edit")
      .focus();
  }

  function finishEdit(event) {
    var updatedBurger;
    if (event.key === "Enter") {
      updatedBurger = {
        id: $(this)
          .data("burger")
          .id,
        name: $(this)
          .children("input")
          .val()
          .trim()
      };
      $(this).blur();
      updateBurger(updatedBurger);
    }
  }

  function updateBurger(burger) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burger
    })
    .done(function() {
      getBurgers();
    });
  }

  function cancelEdit() {
    var currentBurger = $(this).data("burger");
    $(this)
      .children()
      .hide();
    $(this)
      .children("input.edit")
      .val(currentBurger.name);
    $(this)
      .children("span")
      .show();
    $(this)
      .children("button")
      .show();
  }

  // This function constructs a todo-item row
  function createNewRow(burger) {
    var newInputRow = $("<li>");
    newInputRow.addClass("list-group-item burger-item");
    var newBurgerSpan = $("<span>");
    newBurgerSpan.text(burger.name);
    newInputRow.append(newBurgerSpan);
    var newBurgerInput = $("<input>");
    newBurgerInput.attr("type", "text");
    newBurgerInput.addClass("edit");
    newBurgerInput.css("display", "none");
    newInputRow.append(newBurgerInput);
    var newDeleteBtn = $("<button>");
    newDeleteBtn.addClass("delete btn btn-danger");
    newDeleteBtn.text("x");
    newDeleteBtn.data("id", burger.id);
    var newCompleteBtn = $("<button>");
    newCompleteBtn.addClass("complete btn btn-default");
    newCompleteBtn.text("eat the burger");
    newInputRow.append(newDeleteBtn);
    newInputRow.append(newCompleteBtn);
    newInputRow.data("burger", burger);
    if (burger.eaten) {
      newBurgerSpan.css("text-decoration", "line-through");
    }
    return newInputRow;
  }

  function insertBurger(event) {
    event.preventDefault();
    var burger = {
      name: newItemInput
        .val()
        .trim(),
      eaten: false
    };
    
    $.post("/api/burgers", burger, function() {
      getBurgers();
    });
    newItemInput.val("");
  }

});
