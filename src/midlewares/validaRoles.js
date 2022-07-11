//por implementar
const authRoles = (permisos) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    if (permisos.includes(userRole)) {
      next();
    } else {
      return res.json("no tienes permisos suficientes " + userRole);
    }
  };
};

module.exports = {
  authRoles,
};
