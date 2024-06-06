const router = require("express").Router();

const photosRoutes = require("../app/photos/photos.router.js");
const authRoutes = require("../app/auth/auth.router.js");
router.use("/auth", authRoutes);

router.use("/photos", photosRoutes);
module.exports = router;
