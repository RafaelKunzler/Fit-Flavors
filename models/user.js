import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Esse email já esta cadastrado!'],
    required: [true, 'Insira um email!']
  },
  username: {
    type: String,
    required: [true, 'Insira um nome de usuario!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Nome de usuário deve conter de 8-20 letras ou números, e ser único"]
  },
  image: {
    type: String,
  }
})

const User = models.User || model("User", UserSchema)

export default User