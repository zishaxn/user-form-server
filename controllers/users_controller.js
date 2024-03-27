const Users = require("../models/users_db");

module.exports.login = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;
    const user = await Users.findOne({ mobile });

    console.log(user);

    if (!user)
      return res.json({
        msg: "Incorrect Mobile Number or Password",
        status: false,
      });

    if (user.password !== parseInt(password)) {
      return res.json({
        msg: "Incorrect Mobile Number or Password",
        status: false,
      });
    }

    
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).json({ msg: "Login failed", status: false });
  }
};


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
      password,
    } = req.body;

    const existingUser = await Users.findOne({ mobile });
    if (existingUser) {
      return res.json({
        msg: "Mobile number already registered",
        status: false,
        user,
      });
    }

    const user = await Users.create({
      firstName,
      lastName,
      mobile,
      email,
      gender,
      dob,
      address,
      password: parseInt(password), // Convert password to number
    });

    // Ensure not to send the password back to the client
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    console.error("Signup failed:", error);
    return res.status(500).json({ msg: "Signup failed", status: false });
  }
};
