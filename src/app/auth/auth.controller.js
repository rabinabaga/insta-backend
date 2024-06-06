const UserModel = require("./user.model");
const generateToken = require("./helpers");
const nodemailer = require("nodemailer");

class AuthController {
  async signUp(req, res, next) {
    const createdUser = await UserModel.create(req.body);
    res.status(200).json(createdUser);
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    // const transporter = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,

    //   auth: {
    //     user: "253dcedc975b38",
    //     pass: "465ed957b7cb68",
    //   },
    // });

    // const info = await transporter.sendMail({
    //   from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
    //   to: "tarinaresi50@gmail.com", // list of receivers
    //   subject: "Hello ✔", // Subject line
    //   text: "Hello world?", // plain text body
    //   html: "<b>Hello world?</b>", // html body
    // });
    // console.log("Message sent: %s", info.messageId);
    if (user && (await user.matchPassword(password))) {
      const { accessToken, refreshToken } = generateToken(user._id);
      console.log("user", user);
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        username: user.username,
        pic: user.pic,
        accessToken: accessToken,
        refreshToken: refreshToken,
        followers: user.followers,
        following: user.following,
        success: true,
      });
    } else {
      res.status(401);
      next({
        message: "invalid email or password",
      });
    }
  }

  async getSuggestedProfiles(req, res, next) {
    const user = await UserModel.find({ _id: req.user._id });
    const { following } = user[0];

    let result = [];
    result = await UserModel.find({
      _id: { $nin: [req.user._id, ...following] },
    }).limit(10);
    if (result) {
      res.status(200).json({
        data: result,
        msg: "suggested profiles fetched successfully",
      });
    }
  }

  async updateLoggedInUserFollowing(req, res, next) {
    const result = await UserModel.findOneAndUpdate(
      { _id: req.user._id },
      { $push: { following: req.body.profileDocId } },
      {
        new: true,
      }
    );

    if (result) {
      res.status(200).json({
        data: result,
        msg: "following array updated successfully",
      });
    }
  }

  async updateFollowedUserFollowers(req, res, next) {
    const result = await UserModel.findOneAndUpdate(
      { _id: req.body.profileDocId },
      { $push: { followers: req.user._id } },
      {
        new: true,
      }
    );
    if (result) {
      res.status(200).json({
        data: result,
        msg: "following array updated successfully",
      });
    }
  }
}

const authCtrl = new AuthController();
module.exports = authCtrl;
