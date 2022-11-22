import User from "./../models/user.model.js";
import jwt from "jsonwebtoken";

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "secret Key", async (error, decodedToken) => {
      if (error) {
        res.send({ status: false });
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) res.send({ status: true, user: user.email });
        else res.send({ status: false });
        next();
      }
    });
  } else {
    res.send({ status: false });
    next();
  }
};