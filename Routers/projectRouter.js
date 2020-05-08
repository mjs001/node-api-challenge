const express = require("express");
const router = express.Router();
const Project = require("../data/helpers/projectModel");
const server = express();
router.get("/", (req, res) => {
  Project.get()
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ errorMessage: "there was a error retrieving the projects" });
    });
});

router.post("/:id/new-project", (req, res) => {
  const newProject = req.body;
  const id = req.params.id;
  Project.insert(newProject, id).then((project) => {
    if (project.id != id) {
      res.status(404).json({
        errorMessage: "the specified id does not match any known projects",
      });
    } else res.status(201).json(project);
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const editedProject = req.body;
  Project.update(id, {
    name: editedProject.name,
    description: editedProject.description,
  }).then((project) => {
    if (
      editedProject.name === "" ||
      editedProject.name === null ||
      editedProject.description === null ||
      editedProject.description === ""
    ) {
      res
        .status(400)
        .json({ message: "Please provide a name and description" });
    } else res.status(200).json(project);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Project.remove(id)
    .then((project) => {
      res
        .status(200)
        .json({ message: "The action has been successfully deleted" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ errorMessage: "Issues deleting project" });
    });
});

router.get("/:id/actions", (req, res) => {
  const id = req.params.id;
  Project.getProjectActions(id)
    .then((project) => {
      if (project.id != id) {
        res.status(404).json({
          errorMessage: "the specified id does not match any known projects",
        });
      } else res.status(200).json(project);
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({
          errorMessage:
            "there was a error retrieving the actions for the project",
        });
    });
});

module.exports = router;
