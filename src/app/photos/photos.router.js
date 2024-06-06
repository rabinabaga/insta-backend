const router = require("express").Router();
const photosCtrl = require("./photos.controller");
const checkAuthentication = require("../../middlewares/auth.middleware");
const upload = require("../../upload");

router.post("/insert-photos",upload.single("imageSrc"), checkAuthentication, photosCtrl.insertPhotos);

router.get("/get-photos", checkAuthentication, photosCtrl.getPhotos);

router.get("/get-my-photos", checkAuthentication, photosCtrl.getMyPhotos);

router.post("/update-photo-like", checkAuthentication, photosCtrl.updatePhotoLike);

router.post("/update-photo-comment", checkAuthentication, photosCtrl.updatePhotoComment);



module.exports = router;
