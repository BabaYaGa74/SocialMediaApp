const jwt = require("jsonwebtoken");

const generateToken = (res, userId, username, picture, uname) => {
  const token = jwt.sign(
    { userId, username, picture, uname },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

module.exports = generateToken;
