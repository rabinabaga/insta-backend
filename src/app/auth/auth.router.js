const router = require("express").Router();
const checkAuthentication = require("../../middlewares/auth.middleware");
const ValidateRequest = require("../../middlewares/auth.request");
const authCtrl = require("./auth.controller");
const { loginSchema } = require("./auth.validator");


router.post("/sign-up",  authCtrl.signUp);

router.post("/login",ValidateRequest(loginSchema), authCtrl.login);
router.get(
  "/suggested-profiles",
  checkAuthentication,
  authCtrl.getSuggestedProfiles
);

router.put(
  "/updateLoggedInUserFollowing",
  checkAuthentication,
  authCtrl.updateLoggedInUserFollowing
);

router.put(
  "/updateFollowedUserFollowers",
  checkAuthentication,
  authCtrl.updateFollowedUserFollowers
);

module.exports = router;
