import mongoose, { Schema, model, models } from "mongoose"

const RecipeSchema = new Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  recipe: {
    type: Object,
    required: [true, 'Complete a receita.'],
  }
});

const Recipe = models.Recipe || model('Recipe', RecipeSchema)

export default Recipe