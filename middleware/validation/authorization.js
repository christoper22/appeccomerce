const roleValidation = (role) => (req, res, next) => {
  try {
    if (role !== req.role) {
      throw { code: 401, message: 'your role dont have acces' };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = roleValidation;
