const { Roles } = require('../../db/models');

const whoAmI = (roless) => async (req, res, next) => {
  try {
    const userFromPassport = req.user;
    const role = await Roles.findOne({
      where: { id: userFromPassport.roleId },
      attributes: ['name'],
    });
    console.log(role);
    if (role.name !== roless) {
      throw { code: 402, message: 'dont have access' };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
module.exports = whoAmI;
