import Transport from '../models/Transport.js';

export const getTransports = async (req, res) => {
  try {
    const transports = await Transport.find();
    res.status(200).json(transports);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTransport = async (req, res) => {
  const transport = req.body;
  const newTransport = new Transport(transport);
  try {
    await newTransport.save();
    res.status(201).json(newTransport);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
