import Hotel from "../models/hotels.model.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res) => {
  try {
    const updateHotel = await Hotel.findOneAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteHotel);
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  // const failed = true
  //   if(failed) return next(errorMessage('401', 'Not authenticated'))
  try {
    const getHotel = await Hotel.findById(req.params.id);
    res.status(200).send("hotelList");
  } catch (error) {
    next(error);
  }
};
export const getAllHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");

  try {
    const lists = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city }, { limit: 20 });
      })
    );
    res.status(200).json(lists);
  } catch (error) {
    next(error);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount =  await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      {type:"hotel", count:hotelCount},
      {type:"apartments", count:apartmentCount},
      {type:"resorts", count:resortCount},
      {type:"villas", count:villaCount},
      {type:"cabins", count:cabinCount},
    ]);
  } catch (error) {
    next(error);
  }
};
