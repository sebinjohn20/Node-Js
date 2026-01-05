const isAdminUser = (req, res, next) => {
  if (req.userInfo.role !== "admin") {
    return res.status(403).json({
      succes: false,
      message: "Access denied ! Admin rights required.",
    });
  }
  next();
};

module.exports = isAdminUser;
