const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const jwt = require('jsonwebtoken');
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Access denied, Please login to continue',
    });
  }
  // decode this token
  try {
    const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);ss
    console.log(decodeTokenInfo);
    req.userInfo = decodeTokenInfo;
    next();
  } catch (err) {
    return res.status(500).json({
      message: 'Access denied, Please login to continue',
    });
  }

  next();
};
module.exports = authMiddleware;
