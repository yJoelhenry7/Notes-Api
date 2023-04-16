const { Notes, Sequelize } = require("../models");
let data = {};

// Creating a new Node
data.create = async (req, res) => {
  if (!req.body.title || !req.body.details) {
    return res.status(400).send({
      success: false,
      message: "Content can not be Empty!",
    });
  }
  try {
    const newNotes = {
      title: req.body.title,
      details: req.body.details,
    };
    let notesData = await Notes.create(newNotes);
    return res.status(201).json({
      notesData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Retrieve All existing notes
data.getAll = async (req, res) => {
  try {
    let notesData = await Notes.findAll({});
    return res.status(201).json({
      notesData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Retrieve Particular Notes Based of ID of the Row
data.get = async (req, res) => {
  const id = req.params.id;
  try {
    let notesData = await Notes.findByPk(id);
    if (notesData) {
      return res.status(200).json({
        notesData,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "No such Notes present",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Update an existing Notes based on ID of the Row
data.update = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    const notesData = await Notes.update(body, {
      where: {
        id: id,
      },
    });
    if (notesData[0] === 0) {
      return res.status(200).json({
        success: false,
        error: `No Notes found with this ${id}`,
      });
    }
    return res.status(200).json({
      success: true,
      "number of rows changed": notesData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};

// Delete an Existing Notes with Id of the Row
data.delete = async (req, res) => {
  try {
    let id = req.params.id;
    let notesData = await Notes.destroy({
      where: {
        id: id,
      },
    });
    if (notesData === 1) {
      return res.status(200).json({
        success: true,
        message: `Notes with id=${id} deleted`,
      });
    }
    return res.status(200).json({
      success: false,
      message: `Notes with id =${id} is not present.`,
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      error: error,
    });
  }
};

module.exports = data;
