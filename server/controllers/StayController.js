import Stay from '../models/Stay.js';

export const getStays = async (req, res) => {
  try {
    const stays = await Stay.find();
    res.status(200).json(stays);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStay = async (req, res) => {
  const stay = req.body;
  const newStay = new Stay(stay);
  try {
    await newStay.save();
    res.status(201).json(newStay);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
