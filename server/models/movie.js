import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  genre: String,
  directorId: { type: mongoose.Schema.Types.ObjectId, ref: "Director" },
});

export default mongoose.model("Movie", movieSchema);
