const User = require("../models/UserModels");

module.exports.addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const isMovieLiked = likedMovies.find(({ id }) => id === data.id);
      if (!isMovieLiked) {
        await User.findByIdAndUpdate(
          user._id,
          { likedMovies: [...user.likedMovies, data] },
          { new: true }
        );
      } else return res.json({ error: "Movie already liked" });
    } else await User.create({ email, likedMovies: [data] });
    return res.json({ message: "Movie added to liked movies successfully" });
  } catch (err) {
    return res.json({ error: err.message });
  }
};
module.exports.getLikedMovies = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email });
        if (user) {
            res.json({msg: "User found", likedMovies: user.likedMovies})
        } else {
          return res.json({msg: "User not found with this email"})
        }
    } catch (error) { 
        return res.json({error: error.message})
    }}


module.exports.deleteLikedMovie = async (req, res) => {
try {
  const { email, movieId, data } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const { likedMovies } = user;
    const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
    if(!movieIndex) res.status(400).send({error: "Movie not found"})
    
    likedMovies.splice(movieIndex, 1);
    
      await User.findByIdAndUpdate(
        user._id,
        { likedMovies: [...user.likedMovies, data] },
        { new: true }
      );
    } 
    return res.json({ message: "Movie deleted from liked movies successfully" });
  } catch (err) {
    return res.json({ error: err.message });
  }
};



