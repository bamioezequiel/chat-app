import jwt from "jsonwebtoken";
import User from "./../models/user.model.js";

const maxTime = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "secret Key", {
    expiresIn: maxTime,
  });
};

const handleErrors = (error) => {
  const errors = { username: "", email: "", password: "" };
  const { code, message } = error;

  if (message === "Email already used")
    errors.email = "That email already used";
  if (message === "Username already used")
    errors.username = "That username already used";
  if (message === "Incorrect username")
    errors.username = "Incorrect Username or Password";
  if (message === "Incorrect password")
    errors.password = "Incorrect Username or Password";

  if (message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      httpOnly: false,
      maxAge: maxTime * 1000,
    });

    res.send({ user, status: true });
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.send({ errors, status: false });
  }
};

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.register(username, email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnyl: false,
      maxAge: maxTime * 1000,
    });

    res.status(201).send({ user, create: true });
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.send({ errors, create: false });
  }
};

