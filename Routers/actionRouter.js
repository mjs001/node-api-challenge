const express = require("express");
const router = express.Router();
const Action = require("../data/helpers/actionModel");

router.get("/", (req, res) => {
  Action.get().then((action) => {
    res.status(200).json(action);
  });
});

router.post("/:id/new-action", (req, res) => {
  const newAction = req.body;
  const id = req.params.id;
  Action.insert(newAction, id).then((action) => {
    res.status(201).json(action);
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const editedAction = req.body;
  Action.update(id, {
    description: editedAction.description,
    notes: editedAction.notes,
  }).then((action) => {
    res.status(200).json(action);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Action.remove(id).then((action) => {
    res
      .status(200)
      .json({ message: "The action has been successfully deleted" });
  });
});
module.exports = router;
