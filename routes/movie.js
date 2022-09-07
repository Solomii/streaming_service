const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie)
  } catch (error) {
    res.status(500).json(error);
  }
})

router.post('/', verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (error) {
      console.log(error);
      res.status(500).json({
      status: "error",
      message: "Server error",
    });
    }
  } else {
    res.status(403).json("You are not allowed!")
 }
});

router.put('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
  try {
    const updateMovie = await Movie.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, { new: true });

    res.status(200).json(updateMovie);
    
  } catch (error) {
    res.status(500).json(error);
  }
  } else {
    res.status(403).json("You are not allowed!")
 }
});

router.delete('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
  try {
   await Movie.findByIdAndDelete(req.params.id), 
   res.status(200).json("The movie deleted");
    
  } catch (error) {
    res.status(500).json(error);
  }
  } else {
    res.status(403).json("you are not allowed! ")
 }
});

module.exports = router;