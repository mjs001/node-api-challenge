const express = require("express");
const router = express.Router();
const Action = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  Action.get()
    .then((action) => {
      res.status(200).json(action);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ errorMessage: "there was a error retrieving the actions" });
    });
});

router.post("/:id/new-action", (req, res) => {
  const newAction = req.body;
  const id = req.params.id;
  Action.insert(newAction, id).then((action) => {
    if (action.id != id) {
      res.status(404).json({
        errorMessage: "the specified id does not match any known actions",
      });
    } else res.status(201).json(action);
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const editedAction = req.body;
  Action.update(id, {
    description: editedAction.description,
    notes: editedAction.notes,
  }).then((action) => {
    if (
      editedAction.description === null ||
      editedAction.notes === null ||
      editedAction.description === "" ||
      editedAction.notes === ""
    ) {
      res
        .status(400)
        .json({ message: "Please provide a name and description" });
    } else res.status(200).json(action);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Action.remove(id).then((action) => {
    if (action.id != id) {
      res.status(404).json({
        errorMessage: "the specified id does not match any known actions",
      });
    } else
      res
        .status(200)
        .json({ message: "The action has been successfully deleted" });
  });
});

//middleware

module.exports = router;
