const Model = require('../models/recipemodel');

const addLike = async (req, res) => {
  try {
    const data = new Model({
      title: req.body.title,
      author_name: req.body.author_name,
      author_surname: req.body.author_surname,
      favorite: req.body.favorite
    });

    const saveData = await data.save();
    res.status(201).json(saveData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getLikes = async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    addLike, 
    getLikes
};