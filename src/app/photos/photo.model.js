const mongoose = require("mongoose");
const UserModel = require("../auth/user.model");
const Schema = mongoose.Schema;
UserModel

const likeSchema = new Schema({
  username: { type: String, required: true },
});
const CommentSchema = new Schema({
  username: { type: String, required: true },

  comment: { type: String, required: true },
});

const PhotoSchema = new Schema(
  {
    userDocId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    imageSrc: {
      type: String,
      required: true,
      unique: true,
    },
    caption: {
      type: String,
    },
    likes: [ { type: Schema.Types.ObjectId, ref: 'Like' }],
   

    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },

  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);





const CommentModel = mongoose.model('Comment', CommentSchema);
const LikeModel = mongoose.model('Like', likeSchema);
const PhotoModel = mongoose.model("Photo", PhotoSchema);
module.exports = {
  PhotoModel: PhotoModel,
  LikeModel: LikeModel,
  CommentModel: CommentModel
};
