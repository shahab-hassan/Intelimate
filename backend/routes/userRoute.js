const express = require("express");
const passport = require("passport");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  resetPasswordRequest,
  resetPassword
} = require("../controllers/userCtrl");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// Reset Password Routes
router.post("/resetPasswordRequest", resetPasswordRequest);
router.post("/resetPassword/:token", resetPassword);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('http://localhost:3000/?login=success');
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('http://localhost:3000/?login=success');
});

module.exports = router;
