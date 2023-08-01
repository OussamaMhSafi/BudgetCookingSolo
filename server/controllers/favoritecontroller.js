const Model = require('../models/favouritemodel');

const addFav = async (req, res) => {
  try {
    const data = new Model({
        idMeal: req.body.idMeal
    });

    const saveData = await data.save();
    res.status(201).json(saveData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFavs = async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFav = async (req, res) => {
  try {
    const { idMeal } = req.body;
    const deletedFav = await Model.findOneAndDelete({ idMeal});
    if (!deletedFav) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json(deletedFav);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
    addFav, 
    getFavs,
    deleteFav
};