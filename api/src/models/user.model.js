import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    min: 8,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImg: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return await this.findOne({ username }).select('username email isAvatarImageSet avatarImg _id');
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect username");
};

userSchema.statics.register = async function (username, email, password) {
  
  const usernameCheck = await this.findOne({ username });
  if (usernameCheck) throw Error("Username already used");
  const emailCheck = await this.findOne({ email });
  if (emailCheck) throw Error("Email already used");

  await this.create({ username, email, password });
  return await this.findOne({ username }).select('username email isAvatarImageSet avatarImg _id');
};

export default mongoose.model("Users", userSchema);
