const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//  register controller
const registerUser = async (req, res) => {
  try {
    //   extract user infor from reqbody
    const { username, email, password, role } = req.body;
    // check if user already exists in db
    const checkExistingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          'Existing user with either the same username or email! Please try with a different username or password',
      });
    }
    //   hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user and save in db
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });
    await newlyCreatedUser.save();
    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: 'User registerd successfully',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'unable to register user, please try again',
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: 'Some error occured! Please try again',
    });
  }
};

// logincontroller
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    //   find if the user already exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist',
      });
    }
    //   check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    //   create user token
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '20m',
      }
    );
    res.status(200).json({
      success: true,
      mesage: 'logged in successful',
      accessToken,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: 'Some error occured! Please try again',
    });
  }
};

module.exports = { loginUser, registerUser };
