const express = require("express");
const router = express.Router();
const Project = require("../data/helpers/projectModel");

router.get("/", (req, res) => {
  Project.get().then((project) => {
    res.status(200).json(project);
  });
});

router.post("/:id/new-project", (req, res) => {
  const newProject = req.body;
  const id = req.params.id;
  Project.insert(newProject, id).then((project) => {
    res.status(201).json(project);
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const editedProject = req.body;
  Project.update(id, {
    name: editedProject.name,
    description: editedProject.description,
  }).then((project) => {
    res.status(200).json(project);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Project.remove(id).then((project) => {
    res
      .status(200)
      .json({ message: "The action has been successfully deleted" });
  });
});

router.get("/:id/actions", (req, res) => {
  const id = req.params.id;
  Project.getProjectActions(id).then((project) => {
    res.status(200).json(project);
  });
});

module.exports = router;
