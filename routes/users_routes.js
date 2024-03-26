const express = require("express");

const Router = express.Router();

const { signup, login } = require("../controllers/users_controller");

// Signup route
Router.route("/signup").post(signup);

// Login route
Router.route("/login").post(login);

module.exports = Router;
