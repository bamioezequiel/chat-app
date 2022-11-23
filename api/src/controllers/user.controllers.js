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
          const user = await User.findById(decodedToken.id).select(
            "username email isAvatarImageSet avatarImg _id"
          );
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

export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImg = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImg,
      },
      { new: true }
    );
    return res.send({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImg,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const id = req.params.id;
    const users = await User.find({ _id: { $ne: id } }).select(
      "username email _id avatarImage"
    );
    res.send(users);
  } catch (error) {
    next(error)
  }
};
