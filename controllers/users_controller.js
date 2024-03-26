const Users = require("../models/users_db");
// signup
module.exports.signup = async (req, res, next) => {
  console.log(req.body);
  try {
    const {
      firstName,
      lastName,
      mobile,
      email,
      gender,
      dob,
      address,
      password
    } = req.body;

    const user = await Users.create({
      firstName,
      lastName,
      mobile,
      email,
      gender,
      dob,
      address,
      password,
    });
    // delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    console.log("Could Not Signup");
    console.log(error);
  }
};

// login
module.exports.login = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;
    const user = await Users.findOne({ mobile });
    console.log(user);
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    if (user.password !== password) {
      return res.json({ msg: "Incorrect Username or Password", status: false });
    }

    // login success
    delete user.password;
    return res.json({
      status: true,
      User: `${user.firstName} ${user.lastName}`,
    });
  } catch (ex) {
    next(ex);
  }
};