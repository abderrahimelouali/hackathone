import MapLocation from '../models/MapLocation.js';

export const getMapLocations = async (req, res) => {
  try {
    const locations = await MapLocation.find();
    res.status(200).json(locations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createMapLocation = async (req, res) => {
  const location = req.body;
  const newLocation = new MapLocation(location);
  try {
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteMapLocation = async (req, res) => {
  const { id } = req.params;
  try {
    await MapLocation.findByIdAndDelete(id);
    res.status(200).json({ message: "Location deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
