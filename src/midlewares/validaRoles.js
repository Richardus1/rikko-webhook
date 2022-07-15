//por implementar
const jwt = require("jsonwebtoken");

validaRoles = (permisos) => {
  return (req, res, next) => {
    const userRole = req.urole;
    //console.log(userRole);
    if (permisos.includes(userRole)) {
      next();
    } else {
      return res.json("no tienes permisos suficientes " + userRole);
    }
  };
};

module.exports = {
  validaRoles,
};
