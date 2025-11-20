// middlewares/userHeader.js
module.exports = function attachUserId(req, res, next) {
  const userId = req.header('user-id'); // we expect client to send 'user-id' header

  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID header is required' });
  }

  req.userId = userId; // attach it to request object
  next();
};
