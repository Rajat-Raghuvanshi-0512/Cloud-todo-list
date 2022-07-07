const express = require("express");
const router = express.Router();
const { signup, login, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getUserPhoto } = require("../Controller/userController");
const { isAuthenticated } = require('../Middleware/auth');

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/photo/:id").get(getUserPhoto);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

// User's profile routes
router.route("/aboutme").get(isAuthenticated, getUserDetails);
router.route("/password/update").put(isAuthenticated, updatePassword);
router.route("/me/update").put(isAuthenticated, updateProfile);

module.exports = router;