import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, "secret Key", async (error, decodedToken) => {
        if (error) {
          res.send({ status: false });
        } else {
          const user = await User.findById(decodedToken.id).select('username email isAvatarImageSet avatarImg _id');;
          if (user) res.send(user);
          else res.send({ status: false });
        }
      });
    } else {
      res.send({ status: false });
    }
  } catch (error) {
    console.log(error);
  }
};
